<template>
  <div class="layout">
    <!-- Global loading overlay for page transitions -->
    <div v-if="isLoading" class="loading-overlay">
      <LoadingSpinner text="Loading the page..." />
    </div>

    <!-- Main Vuetify app container -->
    <v-app>
      <!-- Shopping cart drawer (hidden on checkout page) -->
      <CartDrawer v-if="route.name !== 'checkout'" />
      <!-- Navigation bar (hidden on checkout page) -->
      <AppNav v-if="route.name !== 'checkout'" />
      <!-- Main content area where views are rendered -->
      <v-main>
        <slot></slot>
        <!-- Quick view product modal (hidden on checkout page) -->
        <QuickViewModal v-if="route.name !== 'checkout'" />
      </v-main>
      <!-- Footer (hidden on checkout page) -->
      <AppFooter v-if="route.name !== 'checkout'" />
    </v-app>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";
import QuickViewModal from "./QuickViewModal.vue";
import CartDrawer from "./CartDrawer.vue";
import AppNav from "./AppNav.vue";
import AppFooter from "./AppFooter.vue";
import LoadingSpinner from "./LoadingSpinner.vue";
import { productsModule } from "@/stores/products";

const route = useRoute();
const isLoading = ref(false);
const store = productsModule();

onMounted(async () => {
  router.beforeEach((to, from, next) => {
    isLoading.value = true;
    next();
  });

  router.afterEach(() => {
    setTimeout(() => {
      isLoading.value = false;
    }, 300);
  });

  await store.getProducts();
  store.getCategories();
});
</script>

<style>
.loading-overlay, .loading-container {
  position: fixed;
  inset: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.layout {
  min-height: 100vh;
  position: relative;
}
</style>
