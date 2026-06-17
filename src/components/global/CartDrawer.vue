<template>
  <div class="drawer">
    <v-navigation-drawer location="right" v-model="drawer" temporary scrim width="400">
      <div class="cart-header">
        <h2 class="cart-title">Shopping Cart</h2>
        <button class="close-btn" @click="closeCart">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div v-if="cartItems.length === 0" class="empty-cart">
        <svg class="empty-cart-icon" xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <p class="empty-cart-text">Your cart is empty</p>
        <button class="continue-shopping-btn" @click="closeCart">
          Continue Shopping
        </button>
      </div>

      <div v-else class="cart-content">
        <p class="item-count">{{ cartItems.length }} item{{ cartItems.length > 1 ? 's' : '' }}</p>
        <div class="cart-items">
          <div v-for="item in cartItems" :key="item.id" class="cart-item">
            <div class="item-image-wrapper">
              <img :src="item.thumbnail" :alt="item.title" class="item-image">
            </div>
            <div class="item-details">
              <h4 class="item-title">{{ item.title }}</h4>
              <p class="item-price">${{ (item.discountPercentage ? Math.ceil(item.price - item.price * (item.discountPercentage / 100)) : item.price).toFixed(2) }}</p>
              <div class="quantity-control">
                <button class="qty-btn" @click="decreaseQty(item)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </button>
                <span class="qty-value">{{ item.quantity }}</span>
                <button class="qty-btn" @click="increaseQty(item)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </button>
              </div>
            </div>
            <button class="remove-item-btn" @click="removeItem(item.id)">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
        <div class="cart-divider"></div>
        <div class="cart-summary">
          <div class="summary-row total">
            <span class="summary-label">Total:</span>
            <span class="summary-value">${{ subtotal.toFixed(2) }}</span>
          </div>
        </div>
        <router-link to="/cart" class="view-cart-btn" @click.native="closeCart">
                View Cart
              </router-link>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script setup>
import { ref, computed, inject, onMounted } from 'vue';
import { productsModule } from "@/stores/products";

const Emitter = inject("Emitter");
const store = productsModule();
const drawer = ref(false);

const cartItems = computed(() => store.cartItems);
const subtotal = computed(() => {
  return cartItems.value.reduce((sum, item) => {
    const price = item.discountPercentage  ? Math.ceil(item.price - item.price * (item.discountPercentage / 100)) : item.price;
    return sum + price * item.quantity;
  }, 0);
});

const closeCart = () => {
  drawer.value = false;
};

const increaseQty = (item) => {
  store.updateCartQuantity(item.id, item.quantity + 1);
};

const decreaseQty = (item) => {
  if (item.quantity > 1) {
    // If quantity is greater than 1, just decrease the quantity
    store.updateCartQuantity(item.id, item.quantity - 1);
  } else {
    // If quantity is 1, clicking "decrease" means remove
    store.removeFromCart(item.id);
  }
};


const removeItem = (productId) => {
  store.removeFromCart(productId);
};

onMounted(() => {
  Emitter.on("openCart", () => {
    drawer.value = !drawer.value;
  });
});
</script>

<style scoped>
.drawer {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

:deep(.v-navigation-drawer__content) {
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  height: 100vh;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid #e5e7eb;
  flex-shrink: 0;
}

.cart-title {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  color: #1f2937;
}

.close-btn {
  border: none;
  background: transparent;
  cursor: pointer;
  color: #1f2937;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
}

.close-btn:hover {
  color: #6b7280;
}

.empty-cart {
  padding: 48px 32px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  flex: 1;
}

.empty-cart-icon {
  color: #d1d5db;
  margin: 24px 0;
}

.empty-cart-text {
  font-size: 16px;
  color: #6b7280;
  margin: 0;
}

.continue-shopping-btn {
  width: 100%;
  padding: 14px 24px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  background: white;
  color: #1f2937;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.continue-shopping-btn:hover {
  background: #f9fafb;
  border-color: #d1d5db;
}

.cart-content {
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
}

.item-count {
  margin: 0 0 16px 0;
  font-size: 14px;
  color: #6b7280;
  flex-shrink: 0;
}

.cart-items {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 0;
}

.cart-items::-webkit-scrollbar {
  width: 8px;
}

.cart-items::-webkit-scrollbar-track {
  background: #f3f4f6;
  border-radius: 4px;
}

.cart-items::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 4px;
  transition: background 0.2s ease;
}

.cart-items::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

.cart-item {
  display: flex;
  gap: 16px;
}

.item-image-wrapper {
  width: 80px;
  height: 80px;
  border-radius: 12px;
  overflow: hidden;
  background: #f3f4f6;
  flex-shrink: 0;
}

.item-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
 
.item-title {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  line-height: 1.4;
  
   display: -webkit-box;
  -webkit-box-orient: vertical;
  
   -webkit-line-clamp: 2;  
  line-clamp: 2;        
  
  overflow: hidden;
}

.item-price {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: #1f2937;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 50px;
  padding: 6px 12px;
  width: fit-content;
}

.qty-btn {
  border: none;
  background: transparent;
  cursor: pointer;
  color: #1f2937;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
}

.qty-btn:hover {
  color: #dc2626;
}

.qty-value {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  min-width: 20px;
  text-align: center;
}

.remove-item-btn {
  border: none;
  background: transparent;
  cursor: pointer;
  color: #6b7280;
  padding: 0;
  display: flex;
  align-items: flex-start;
  transition: color 0.2s ease;
}

.remove-item-btn:hover {
  color: #dc2626;
}

.cart-divider {
  height: 1px;
  background: #e5e7eb;
  margin: 16px 0;
  flex-shrink: 0;
}

.cart-summary {
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex-shrink: 0;
}

.summary-row.total .summary-label {
  color: #1f2937;
  font-weight: 700;
}

.summary-row.total .summary-value {
  font-size: 20px;
  font-weight: 800;
}

.view-cart-btn {
  width: 100%;
  padding: 14px 24px;
  border: 2px solid #e5e7eb;
  border-radius: 50px;
  background: white;
  color: #1f2937;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  text-align: center;
  display: inline-block;
  box-sizing: border-box;
  flex-shrink: 0;
}

.view-cart-btn:hover {
  background: #f9fafb;
  border-color: #d1d5db;
}
</style>