<template>
  <div class="product-details">
    <v-container>
      <div v-if="isLoading" class="loading-section">
        <LoadingSpinner text="Loading product details..." />
      </div>

      <div v-else-if="product" class="product-container">
        <!-- Image Section -->
        <div class="image-section">
          <div class="main-image-wrapper">
            <img :src="mainImage" class="main-image" :alt="product.title">
            <div v-if="product.discountPercentage" class="discount-badge">
              -{{ Math.round(product.discountPercentage) }}% OFF
            </div>
          </div>
          <div class="thumbnail-list">
            <button 
              v-for="(img, index) in product.images" 
              :key="index" 
              :class="['thumbnail-item', { active: mainImage === img }]"
              @click="mainImage = img"
            >
              <img :src="img" :alt="`Thumbnail ${index + 1}`">
            </button>
          </div>
        </div>

        <!-- Details Section -->
        <div class="details-section">
          <div class="product-breadcrumb">
            <router-link to="/" class="breadcrumb-link">Home</router-link>
            <span class="breadcrumb-divider">/</span>
            <router-link :to="`/products/${product.category}`" class="breadcrumb-link">{{ product.category }}</router-link>
            <span class="breadcrumb-divider">/</span>
            <span class="breadcrumb-current">{{ product.title }}</span>
          </div>

          <h1 class="product-title">{{ product.title }}</h1>

          <div class="rating-section">
            <div class="stars-container">
              <span v-for="i in 5" :key="i" :class="['star', { filled: i <= Math.floor(product.rating) }]">★</span>
            </div>
            <span class="rating-score">{{ product.rating }}/5</span>
            <span class="rating-divider">|</span>
            <span class="rating-reviews">{{ product.reviews?.length || 0 }} Reviews</span>
          </div>

          <div class="price-section">
            <span class="current-price">${{ discountedPrice }}</span>
            <del v-if="product.discountPercentage" class="original-price">${{ product.price }}</del>
          </div>

          <p class="product-description">{{ product.description }}</p>

          <div class="product-info">
            <div class="info-item">
              <span class="info-label">Brand:</span>
              <span class="info-value">{{ product.brand || 'Generic' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Stock:</span>
              <span :class="['stock-value', { low: product.stock <= 10 }]">
                {{ product.stock > 0 ? `${product.stock} in stock` : 'Out of stock' }}
              </span>
            </div>
            <div class="info-item">
              <span class="info-label">Category:</span>
              <span class="info-value">{{ product.category }}</span>
            </div>
          </div>

          <div class="quantity-section">
            <label class="quantity-label">Quantity:</label>
            <div class="quantity-control">
              <button class="quantity-btn" @click="decreaseQty" :disabled="quantity <= 1">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
              <input type="number" v-model="quantity" min="1" class="quantity-input">
              <button class="quantity-btn" @click="increaseQty">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
            </div>
          </div>

          <div class="action-buttons">
            <button class="add-to-cart-btn" @click="addToCart" :disabled="product.stock <= 0 || isAddingToCart">
              <svg v-if="!isAddingToCart" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <svg v-else class="spinner" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" stroke-dasharray="60" stroke-dashoffset="10"></circle>
              </svg>
              {{ isAddingToCart ? 'Adding...' : 'Add to Cart' }}
            </button>
          </div>

          <div class="features-section">
            <div class="feature-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <div class="feature-text">
                <strong>Free Shipping</strong>
                <span>On orders over $50</span>
              </div>
            </div>
            <div class="feature-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="1 4 1 10 7 10"></polyline>
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
              </svg>
              <div class="feature-text">
                <strong>Easy Returns</strong>
                <span>30 days return policy</span>
              </div>
            </div>
            <div class="feature-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <div class="feature-text">
                <strong>Customer Support</strong>
                <span>24/7 support available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script setup>
// Import Vue composition functions
import { ref, computed, watch, onMounted, inject } from "vue";
import { useRoute } from "vue-router";
// Import products store
import { productsModule } from "@/stores/products";
import LoadingSpinner from "@/components/global/LoadingSpinner.vue";
import axios from "axios";

// Get route
const route = useRoute();

// Get Emitter
const Emitter = inject("Emitter");

// Initialize store
const store = productsModule();

// Reactive state
const product = ref(null);
const mainImage = ref("");
const quantity = ref(1);
const isAddingToCart = ref(false);
const isLoading = ref(false);

// Computed properties
const discountedPrice = computed(() => {
  if (!product.value) return 0;
  if (!product.value.discountPercentage) {
    return product.value.price;
  }
  return Math.ceil(product.value.price - product.value.price * (product.value.discountPercentage / 100));
});

// Methods
const getProductDetails = async (id) => {
  isLoading.value = true;
  try {
    const response = await axios.get(`https://dummyjson.com/products/${id}`);
    product.value = response.data;
    mainImage.value = product.value.thumbnail;
    quantity.value = 1;
  } catch (err) {
    console.error("Error fetching product details:", err);
  } finally {
    isLoading.value = false;
  }
};

const decreaseQty = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

const increaseQty = () => {
  if (product.value && quantity.value < product.value.stock) {
    quantity.value++;
  }
};

const addToCart = async () => {
  isAddingToCart.value = true;
  // Simulate loading
  await new Promise(resolve => setTimeout(resolve, 800));
  store.addToCart(product.value, quantity.value);
  isAddingToCart.value = false;
  Emitter.emit("openCart");
};

// Watch for route changes
watch(
  () => route.params.id,
  () => {
    getProductDetails(route.params.id);
  }
);

// On mounted
onMounted(async () => {
  await getProductDetails(route.params.id);
});
</script>

<style scoped>
.product-details {
  padding: 40px 0 80px;
}

.product-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: start;
}

.image-section {
  position: sticky;
  top: 120px;
}

.main-image-wrapper {
  position: relative;
  background: linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%);
  border-radius: 20px;
  padding: 40px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}

.main-image {
  max-width: 100%;
  max-height: 380px;
  object-fit: contain;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.main-image-wrapper:hover .main-image {
  transform: scale(1.05);
}

.discount-badge {
  position: absolute;
  top: 20px;
  left: 20px;
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  color: white;
  padding: 8px 16px;
  border-radius: 50px;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 16px rgba(220, 38, 38, 0.3);
}

.thumbnail-list {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 6px;
  justify-content: center;
}

.thumbnail-item {
  width: 64px;
  height: 64px;
  border: 2px solid #e5e7eb;
  border-radius: 50%;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  flex-shrink: 0;
  padding: 0;
}

.thumbnail-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnail-item:hover {
  border-color: #9ca3af;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.thumbnail-item.active {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.details-section {
  padding-top: 20px;
}

.product-breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  font-size: 14px;
}

.breadcrumb-link {
  color: #6b7280;
  text-decoration: none;
  transition: color 0.2s ease;
}

.breadcrumb-link:hover {
  color: #3b82f6;
}

.breadcrumb-divider {
  color: #d1d5db;
}

.breadcrumb-current {
  color: #1f2937;
  font-weight: 600;
}

.product-title {
  font-size: 30px;
  font-weight: 900;
  color: #111827;
  margin: 0 0 12px;
  line-height: 1.2;
}

.rating-section {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.stars-container {
  display: flex;
  gap: 3px;
}

.star {
  font-size: 18px;
  color: #e5e7eb;
}

.star.filled {
  color: #fbbf24;
}

.rating-score {
  font-size: 15px;
  font-weight: 700;
  color: #1f2937;
}

.rating-divider {
  color: #d1d5db;
}

.rating-reviews {
  font-size: 14px;
  color: #6b7280;
}

.price-section {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 20px;
}

.current-price {
  font-size: 34px;
  font-weight: 900;
  color: #1f2937;
}

.original-price {
  font-size: 22px;
  color: #9ca3af;
  font-weight: 600;
}

.product-description {
  font-size: 15px;
  line-height: 1.7;
  color: #4b5563;
  margin-bottom: 24px;
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 24px;
  padding: 16px;
  background: #f9fafb;
  border-radius: 14px;
}

.info-item {
  display: flex;
  gap: 8px;
  font-size: 14px;
}

.info-label {
  font-weight: 700;
  color: #374151;
  min-width: 75px;
}

.info-value {
  color: #1f2937;
}

.stock-value {
  font-weight: 700;
}

.stock-value.low {
  color: #dc2626;
}

.quantity-section {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 20px;
}

.quantity-label {
  font-size: 14px;
  font-weight: 700;
  color: #374151;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #f3f4f6;
  padding: 3px;
  border-radius: 10px;
}

.quantity-btn {
  width: 38px;
  height: 38px;
  border: none;
  border-radius: 8px;
  background: white;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity-btn:hover:not(:disabled) {
  background: #e5e7eb;
  color: #1f2937;
}

.quantity-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.quantity-input {
  width: 60px;
  text-align: center;
  border: none;
  background: transparent;
  font-size: 16px;
  font-weight: 700;
  color: #1f2937;
}

.action-buttons {
  margin-bottom: 30px;
}

.add-to-cart-btn {
  width: 100%;
  padding: 14px 28px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
  color: white;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.add-to-cart-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #111827 0%, #000 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.add-to-cart-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.features-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px;
  background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
  border-radius: 16px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 16px;
}

.feature-item svg {
  color: #3b82f6;
  flex-shrink: 0;
}

.feature-text {
  display: flex;
  flex-direction: column;
}

.feature-text strong {
  font-size: 14px;
  color: #1f2937;
}

.feature-text span {
  font-size: 13px;
  color: #6b7280;
}

.loading-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 0;
  gap: 20px;
}

.loading-spinner {
  width: 60px;
  height: 60px;
  border: 4px solid #f3f4f6;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-section p {
  font-size: 18px;
  color: #6b7280;
  margin: 0;
}

@media (max-width: 1024px) {
  .product-container {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .image-section {
    position: static;
  }

  .product-title {
    font-size: 32px;
  }

  .current-price {
    font-size: 38px;
  }
}

@media (max-width: 640px) {
  .product-details {
    padding: 20px 0 60px;
  }

  .main-image-wrapper {
    min-height: 350px;
    padding: 40px 20px;
  }

  .product-title {
    font-size: 26px;
  }

  .current-price {
    font-size: 32px;
  }

  .action-buttons {
    grid-template-columns: 1fr;
  }
}
</style>