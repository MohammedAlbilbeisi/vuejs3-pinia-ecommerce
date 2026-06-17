<template>
  <div v-if="store.isQuickViewOpen" class="quick-view-overlay" @click.self="store.closeQuickView">
    <div class="quick-view-modal">
      <button class="close-btn" @click="store.closeQuickView">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <div v-if="product" class="quick-view-content">
        <div class="quick-view-image">
          <img :src="mainImage" :alt="product.title" />
          <div v-if="product.discountPercentage" class="discount-badge">-{{ Math.round(product.discountPercentage) }}%</div>
        </div>

        <div class="quick-view-details">
          <h2 class="product-title">{{ product.title }}</h2>

          <div class="rating-section">
            <div class="stars">
              <span v-for="i in 5" :key="i" :class="['star', i <= Math.floor(product.rating) ? 'filled' : '']">★</span>
            </div>
            <span class="rating-score">({{ product.rating }})</span>
          </div>

          <div class="price-section">
            <span class="new-price">${{ discountedPrice }}</span>
            <del v-if="product.discountPercentage" class="old-price">${{ product.price }}</del>
          </div>

          <p class="product-description">{{ product.description }}</p>

          <div class="product-info">
            <div class="info-item">
              <span class="label">Category:</span>
              <span class="value">{{ product.category }}</span>
            </div>
            <div class="info-item">
              <span class="label">Brand:</span>
              <span class="value">{{ product.brand || 'Generic' }}</span>
            </div>
          </div>

          <div class="images-grid">
            <button 
              v-for="(image, index) in product.images" 
              :key="index" 
              :class="['image-item', { active: mainImage === image }]" 
              @click="mainImage = image"
            >
              <img :src="image" :alt="`View ${index + 1}`" />
            </button>
          </div>

          <div class="actions">
            <button class="view-details-btn" @click="addToCart" :disabled="isAdding">
              <svg v-if="!isAdding" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <svg v-else class="loading-spinner" viewBox="0 0 50 50">
                <circle class="loading-circle" cx="25" cy="25" r="20" fill="none" stroke-width="4"></circle>
              </svg>
              {{ isAdding ? 'Adding...' : 'Add to Cart' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, inject } from 'vue';
import { productsModule } from '@/stores/products';

const store = productsModule();
const Emitter = inject("Emitter");

const mainImage = ref("");
const isAdding = ref(false);

const product = computed(() => {
  if (store.quickViewProduct) {
    if (!mainImage.value || mainImage.value === "") {
      mainImage.value = store.quickViewProduct.thumbnail;
    }
    return store.quickViewProduct;
  }
  return null;
});

const discountedPrice = computed(() => {
  if (!product.value) return 0;
  if (!product.value.discountPercentage) {
    return product.value.price;
  }
  return Math.ceil(product.value.price - product.value.price * (product.value.discountPercentage / 100));
});

const addToCart = () => {
  isAdding.value = true;
  // Simulate async operation
  setTimeout(() => {
    store.addToCart(product.value);
    store.closeQuickView();
    Emitter.emit("openCart");
    isAdding.value = false;
  }, 800);
};

watch(() => store.isQuickViewOpen, (newVal) => {
  if (newVal && product.value) {
    mainImage.value = product.value.thumbnail;
  }
});
</script>

<style scoped>
.quick-view-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
  animation: fadeIn 0.2s ease;
}

.quick-view-modal {
  background: white;
  border-radius: 20px;
  max-width: 1000px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: slideUp 0.3s ease;
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 44px;
  height: 44px;
  border: none;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  z-index: 10;
}

.close-btn:hover {
  background: #1f2937;
  color: white;
  transform: rotate(90deg);
}

.quick-view-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  padding: 40px;
}

.quick-view-image {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 16px;
  padding: 40px;
  min-height: 400px;
}

.quick-view-image img {
  max-width: 100%;
  max-height: 350px;
  object-fit: contain;
}

.discount-badge {
  position: absolute;
  top: 20px;
  left: 20px;
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  color: white;
  padding: 8px 16px;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 800;
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
}

.quick-view-details {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.product-title {
  font-size: 28px;
  font-weight: 800;
  color: #1f2937;
  margin: 0;
  line-height: 1.3;
}

.rating-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

.stars {
  display: flex;
  gap: 4px;
}

.star {
  color: #e5e7eb;
  font-size: 18px;
}

.star.filled {
  color: #fbbf24;
}

.rating-score {
  font-size: 14px;
  color: #6b7280;
}

.price-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.new-price {
  font-size: 32px;
  font-weight: 800;
  color: #1f2937;
}

.old-price {
  font-size: 22px;
  color: #9ca3af;
  text-decoration: line-through;
  font-weight: 600;
}

.product-description {
  font-size: 15px;
  line-height: 1.7;
  color: #4b5563;
  margin: 0;
}

.product-info {
  display: flex;
  gap: 24px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.label {
  font-size: 13px;
  font-weight: 700;
  color: #6b7280;
  text-transform: uppercase;
}

.value {
  font-size: 15px;
  font-weight: 600;
  color: #1f2937;
}

.images-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.image-item {
  width: 100%;
  padding: 12px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.image-item img {
  width: 100%;
  height: 70px;
  object-fit: contain;
}

.image-item:hover {
  border-color: #9ca3af;
  transform: translateY(-2px);
}

.image-item.active {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.actions {
  display: flex;
  gap: 12px;
  margin-top: 10px;
}

.view-details-btn {
  flex: 1;
  padding: 14px 32px;
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

.view-details-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #111827 0%, #000 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.view-details-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

.loading-circle {
  stroke: white;
  stroke-linecap: round;
  stroke-dasharray: 100;
  stroke-dashoffset: 50;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@media (max-width: 900px) {
  .quick-view-content {
    grid-template-columns: 1fr;
  }

  .quick-view-image {
    min-height: 300px;
  }
}

@media (max-width: 600px) {
  .quick-view-content {
    padding: 24px;
  }

  .product-title {
    font-size: 22px;
  }

  .images-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>