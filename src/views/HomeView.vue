<template>
  <div class="home">
    <!-- Show loading spinner if loading and no existing data -->
    <div v-if="isLoading && !hasExistingData" class="loading-container">
      <LoadingSpinner text="Page is Loading..." />
    </div>

    <!-- Main home page content -->
    <template v-else>
      <!-- Top banner section -->
      <UpperBanner data-aos="fade-down" />
      <!-- Features section (free shipping, etc.) -->
      <TheFeatures data-aos="fade-up" data-aos-delay="100" />
      <!-- Top offers section -->
      <TopOffers data-aos="fade-up" data-aos-delay="300" />
      <!-- Top categories section -->
      <TopCategories data-aos="fade-up" data-aos-delay="200" />

      <!-- Flash deals section -->
      <ProductsSwiper
        :products="flashDeals"
        section-title="Flash Deals"
        title-color="#000000"
        data-aos="zoom-in"
        data-aos-delay="400"
      />

      <!-- New products section with banner -->
      <ProductsSwiper
        :products="newProducts"
        section-title="New Products"
        title-color="#1a1a2e"
        :show-banner="true"
        :use-dots="true"
        banner-image="https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&dpr=1"
        banner-title="Powerful Laptops"
        banner-text="Discover our latest collection of high-performance laptops for work and gaming."
        banner-btn-text="Explore Now"
        data-aos="fade-left"
        data-aos-delay="600"
      />

      <!-- Quality features section -->
      <QualityFeatures data-aos="fade-up" data-aos-delay="700" />

      <!-- Mobile phones section -->
      <ProductsSwiper
        :products="mobilePhones"
        section-title="Top Mobile Phones"
        title-color="#404040"
        data-aos="zoom-out"
        data-aos-delay="800"
      />

      <!-- Fragrances section -->
      <ProductsSwiper
        :products="fragrances"
        section-title="Top Fragrances"
        title-color="#404040"
        data-aos="fade-right"
        data-aos-delay="900"
      />

      <!-- Why shop with us section -->
      <WhyShopWithUs data-aos="zoom-in" data-aos-delay="1000" />

      <!-- Groceries section -->
      <ProductsSwiper
        :products="groceries"
        section-title="Top Groceries"
        title-color="#404040"
        data-aos="fade-up"
        data-aos-delay="1100"
      />

    </template>
  </div>
</template>

<script setup>
// Import Vue composition functions
import { ref, computed, onMounted } from "vue";
// Import home page components
import UpperBanner from "@/components/home_page/UpperBanner.vue";
import TheFeatures from "@/components/home_page/TheFeatures.vue";
import TopCategories from "@/components/home_page/TopCategories.vue";
import TopOffers from "@/components/home_page/TopOffers.vue";
import ProductsSwiper from "@/components/home_page/ProductsSwiper.vue";
import QualityFeatures from "@/components/home_page/QualityFeatures.vue";
import WhyShopWithUs from "@/components/home_page/WhyShopWithUs.vue";
// Import global components
import LoadingSpinner from "@/components/global/LoadingSpinner.vue";
// Import products store
import { productsModule } from "@/stores/products";

// Initialize store
const store = productsModule();

// Reactive state
const isLoading = ref(false);

// Computed properties
const flashDeals = computed(() => store.flashDeals);
const newProducts = computed(() => store.newProducts);
const mobilePhones = computed(() => store.mobilePhones);
const fragrances = computed(() => store.fragrances);
const groceries = computed(() => store.groceries);

const hasExistingData = computed(() => {
  return flashDeals.value.length > 0 || newProducts.value.length > 0;
});

// Load products from store/API
const loadProducts = async () => {
  // Only show loading if we don't have data yet
  if (!store.allProducts || store.allProducts.length === 0) {
    isLoading.value = true;
  }
  await store.getProducts();
  isLoading.value = false;
};

// When component mounts, load products
onMounted(async () => {
  await loadProducts();
  console.log(flashDeals.value);
});
</script>
