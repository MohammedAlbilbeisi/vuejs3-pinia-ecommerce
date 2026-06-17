<template>
  <div class="flash-deals pt-16">
    <v-container fluid class="pt-9">
      <!-- Section Title -->
      <h2 class="section-title mb-8" style="color: #dc2626; font-size: 28px; font-weight: bold;">
        Flash Deals
      </h2>

      <v-row>
        <v-col cols="12" sm="6" md="4" lg="3" v-for="item in products" :key="item.id">
          <v-card elevation="4" class="product-card rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">
            <!-- Product Image -->
            <div class="product-image-container">
              <img
                :src="shownItem[item.title] ? shownItem[item.title] : item.thumbnail"
                class="product-image"
                :alt="item.title"
              />
              <!-- Image Gradient Effect -->
              <div class="image-overlay"></div>
            </div>

            <!-- Card Content -->
            <v-card-text class="px-4 py-4">
              <!-- Product Title -->
              <h3 class="product-title font-semibold text-lg mb-1 text-gray-800 truncate">
                {{ item.title }}
              </h3>

              <!-- Product Description -->
              <p class="product-description text-gray-500 text-sm mb-2 line-clamp-2">
                {{
                  item.description.split(" ").length <= 8
                    ? item.description
                    : item.description.split(" ").slice(0, 8).join(" ") + " ..."
                }}
              </p>

              <!-- Rating -->
              <v-rating
                v-model="item.rating"
                half-increments
                readonly
                color="yellow-darken-2"
                size="small"
                density="compact"
                class="mb-3"
              ></v-rating>

              <!-- Prices -->
              <div class="prices flex items-center gap-2 mb-4">
                <del class="old-price text-gray-400 text-sm">${{ item.price }}</del>
                <span class="new-price text-red-600 text-xl font-bold">
                  ${{
                    Math.ceil(
                      item.price - item.price * (item.discountPercentage / 100)
                    )
                  }}
                </span>
              </div>

              <!-- Image Selector Buttons -->
              <div class="image-selector mb-4 flex gap-2">
                <button
                  v-for="(pic, i) in item.images"
                  :key="i"
                  @click="shownItem[item.title] = pic"
                  :class="['image-btn', { active: shownItem[item.title] === pic }]"
                >
                  <img
                    :src="pic"
                    :alt="`Image ${i + 1}`"
                    width="50"
                    height="50"
                    class="rounded-full object-cover"
                  />
                </button>
              </div>

              <!-- Choose Options Button -->
              <router-link
                :to="`/product/${item.id}`"
                class="choose-btn"
              >
                Choose Options
              </router-link>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  products: {
    type: Array,
  },
});

const shownItem = ref({});
</script>

<style scoped>
.section-title {
  font-family: 'Arial', sans-serif;
}

.product-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-8px);
}

.product-image-container {
  position: relative;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 220px;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.1) 100%);
  pointer-events: none;
}

.image-selector {
  flex-wrap: wrap;
}

.image-btn {
  border: 2px solid #e5e7eb;
  border-radius: 50%;
  padding: 0;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
}

.image-btn:hover {
  border-color: #dc2626;
  transform: scale(1.15);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.image-btn.active {
  border-color: #dc2626;
  box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.2);
}

.image-btn img {
  display: block;
}

.choose-btn {
  display: block;
  width: 100%;
  text-align: center;
  padding: 12px 24px;
  border-radius: 12px;
  text-decoration: none;
  text-transform: none;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  color: white;
}

.choose-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(220, 38, 38, 0.4);
  background: linear-gradient(135deg, #b91c1c 0%, #991b1b 100%);
  color: white;
}

.choose-btn:active {
  transform: translateY(0);
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
}
</style>