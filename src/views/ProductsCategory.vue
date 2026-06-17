<template>
  <div class="products-category">
    <v-container>
      <h1 class="text-center py-8 category-title">{{ currentCategoryTitle }}</h1>
      
      <!-- Loading indicator -->
      <div v-if="isLoading" class="loading-container">
        <LoadingSpinner text="Loading products..." />
      </div>
      
      <!-- Products grid -->
      <div v-else class="products-grid">
        <div 
          v-for="product in paginatedProducts" 
          :key="product.id" 
          class="product-card"
        >
          <div class="product-image-container">
            <div v-if="product.discountPercentage" class="discount-badge">
              -{{ Math.round(product.discountPercentage) }}%
            </div>
            <div class="product-overlay"></div>
            <div class="quick-actions">
              <button class="quick-action-btn" title="Quick View" @click.stop="openQuickView(product)">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                <span class="quick-action-text">Quick View</span>
              </button>
            </div>
            <img :src="shownImages[product.id] || product.thumbnail" class="product-image" :alt="product.title">
          </div>
          <div class="product-content">
            <router-link :to="{ name: 'product_details', params: { id: product.id } }" class="product-title-link" style="text-decoration: none;">
              <h3 class="product-title">{{ product.title }}</h3>
            </router-link>
            <div class="rating-container">
              <div class="stars">
                <span v-for="i in 5" :key="i" :class="['star', i <= Math.floor(product.rating) ? 'filled' : '']">★</span>
              </div>
              <span class="rating-count">({{ product.rating }})</span>
            </div>
            <div class="prices">
              <del v-if="product.discountPercentage" class="old-price">${{ product.price }}</del>
              <span class="new-price">${{ discountedPrice(product) }}</span>
            </div>
            <div class="image-selector">
              <button 
                v-for="(img, index) in product.images.slice(0, 4)" 
                :key="index" 
                :class="['image-btn', { active: shownImages[product.id] === img }]"
                @click.stop="shownImages[product.id] = img"
              >
                <img :src="img" :alt="`Product ${index + 1}`">
              </button>
            </div>
            <button class="add-to-cart-btn" @click.stop="goToProductDetails(product)">
              Choose options
            </button>
          </div>
        </div>
      </div>
      
      <!-- Pagination -->
      <div v-if="!isLoading && totalPages > 1" class="pagination">
        <button 
          :disabled="currentPage === 1" 
          @click="changePage(currentPage - 1)"
          class="page-btn prev-btn"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <button 
          v-for="page in totalPages" 
          :key="page" 
          :class="['page-btn', { active: currentPage === page }]"
          @click="changePage(page)"
        >
          {{ page }}
        </button>
        <button 
          :disabled="currentPage === totalPages" 
          @click="changePage(currentPage + 1)"
          class="page-btn next-btn"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </v-container>
  </div>
</template>

<script setup>
// Import Vue composition functions
import { ref, computed, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
// Import products store
import { productsModule } from "@/stores/products";
import LoadingSpinner from "@/components/global/LoadingSpinner.vue";

// Get route and router
const route = useRoute();
const router = useRouter();

// Initialize store
const store = productsModule();

// Reactive state
const currentPage = ref(1);
const itemsPerPage = 4;
const shownImages = ref({});
const isLoading = ref(false);

// Categories data
const categories = [
  { title: "Smart Phones", route: "smartphones" },
  { title: "Laptops", route: "laptops" },
  { title: "Furniture", route: "furniture" },
  { title: "Men's Shoes", route: "mens-shoes" },
  { title: "Men's Watches", route: "mens-watches" },
  { title: "Women's Bags", route: "womens-bags" },
  { title: "Motorcycle", route: "motorcycle" }
];

// Computed properties
const categoryProducts = computed(() => store.categoryProducts);

const currentCategoryTitle = computed(() => {
  const category = categories.find(cat => cat.route === route.params.category);
  return category ? category.title : "Category";
});

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return categoryProducts.value.slice(start, start + itemsPerPage);
});

const totalPages = computed(() => {
  return Math.ceil(categoryProducts.value.length / itemsPerPage);
});

// Methods
const discountedPrice = (product) => {
  if (!product.discountPercentage) {
    return product.price;
  }
  return Math.ceil(product.price - product.price * (product.discountPercentage / 100));
};
const openQuickView = (product) => {
  store.openQuickView(product);
};
const goToProductDetails = (product) => {
  router.push({ name: 'product_details', params: { id: product.id } });
};
const changePage = async (page) => {
  isLoading.value = true;
  // Add a small delay to show the loading effect
  await new Promise(resolve => setTimeout(resolve, 300));
  currentPage.value = page;
  isLoading.value = false;
};
const loadCategory = async () => {
  isLoading.value = true;
  await store.getProductsByCategory(route.params.category);
  isLoading.value = false;
};

// Watch for route changes
watch(
  () => route.params.category,
  () => {
    currentPage.value = 1;
    shownImages.value = {};
    loadCategory();
  }
);

// On mounted
onMounted(async () => {
  await loadCategory();
});
</script>

<style scoped>
.products-category {
  padding-top: 0;
}

.category-title {
  font-size: 32px;
  font-weight: 700;
  color: #1a1a2e;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 48px;
}

.product-card {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border-radius: 16px;
  overflow: hidden;
  background: white;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  position: relative;
  text-decoration: none;
  color: inherit;
}

.product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
}

.product-content {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-image-container {
  position: relative;
  overflow: hidden;
  padding: 24px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  min-height: 220px;
}

.product-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
}

.product-card:hover .product-overlay {
  opacity: 1;
}

.product-image {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: 0;
}

.product-card:hover .product-image {
  transform: scale(1.1);
}

.discount-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  color: white;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 700;
  z-index: 2;
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
}

.quick-actions {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) translateY(10px);
  display: flex;
  flex-direction: row;
  gap: 12px;
  z-index: 2;
  opacity: 0;
  transition: all 0.3s ease;
}

.product-card:hover .quick-actions {
  opacity: 1;
  transform: translate(-50%, -50%) translateY(0);
}

.quick-action-btn {
  padding: 12px 24px;
  border-radius: 50px;
  background: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #1f2937;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.quick-action-btn:hover {
  background: linear-gradient(135deg, #1f2937 0%, #000000 100%);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
}

.quick-action-text {
  white-space: nowrap;
}

.product-title {
  font-size: 15px;
  color: #1a1a2e;
  margin: 0 0 12px 0;
  font-weight: 600;
  line-height: 1.5;
  min-height: 45px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.rating-container {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
}

.stars {
  display: flex;
  gap: 3px;
}

.star {
  color: #ddd;
  font-size: 13px;
}

.star.filled {
  color: #ffc107;
}

.rating-count {
  font-size: 13px;
  color: #888;
}

.prices {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
  flex-wrap: wrap;
}

.old-price {
  color: #aaa;
  font-size: 14px;
  text-decoration: line-through;
}

.new-price {
  color: #dc2626;
  font-size: 22px;
  font-weight: 800;
}

.image-selector {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.image-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid #e5e7eb;
  background: #f9fafb;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-btn img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.image-btn:hover {
  border-color: #999;
  transform: scale(1.1);
}

.image-btn.active {
  border-color: #dc2626;
  background: white;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.add-to-cart-btn {
  width: 100%;
  padding: 14px 20px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
  color: white;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.add-to-cart-btn:hover {
  background: linear-gradient(135deg, #111827 0%, #000 100%);
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 24px;
}

.page-btn {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  border: 2px solid #e5e7eb;
  background: white;
  color: #374151;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-btn:hover:not(:disabled) {
  border-color: #dc2626;
  color: #dc2626;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.2);
}

.page-btn.active {
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  color: white;
  border-color: #dc2626;
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
}

.page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

@media (max-width: 1200px) {
  .products-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 992px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .products-grid {
    grid-template-columns: 1fr;
  }

  .category-title {
    font-size: 24px;
  }
}
</style>
