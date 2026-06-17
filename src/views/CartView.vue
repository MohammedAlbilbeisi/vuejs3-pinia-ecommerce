<template>
  <div class="cart-view">
    <v-container>
      <div class="cart-header">
        <h1 class="page-title">Shopping Cart</h1>
        <router-link to="/" class="continue-shopping-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Continue Shopping
        </router-link>
      </div>

      <div v-if="cartItems.length === 0" class="empty-cart">
        <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <h2 class="empty-cart-title">Your cart is empty</h2>
        <p class="empty-cart-text">Looks like you haven't added anything to your cart yet</p>
        <router-link to="/" class="shop-now-btn">
          Shop Now
        </router-link>
      </div>

      <div v-else class="cart-content">
        <div class="cart-items-section">
          <div v-for="item in cartItems" :key="item.id" class="cart-item">
            <div class="item-image-wrapper">
              <img :src="item.thumbnail" :alt="item.title" class="item-image">
            </div>
            <div class="item-details">
              <router-link :to="`/product/${item.id}`" class="item-title-link">
                <h3 class="item-title">{{ item.title }}</h3>
              </router-link>
              <p class="item-category">{{ item.category }}</p>
              <p class="item-price">${{ itemPrice(item) }}</p>
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
            <div class="item-total">
              <p class="item-total-price">${{ itemTotal(item) }}</p>
              <button class="remove-btn" @click="removeItem(item.id)">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div class="cart-summary-section">
          <div class="summary-card">
            <h3 class="summary-title">Order Summary</h3>
            
            <div class="summary-row">
              <span class="summary-label">Subtotal</span>
              <span class="summary-value">${{ subtotal.toFixed(2) }}</span>
            </div>
            
            <div class="summary-row shipping">
              <span class="summary-label">Shipping</span>
              <span class="summary-value">{{ subtotal >= 800 ? 'Free' : '$9.99' }}</span>
            </div>
            
            <div class="summary-divider"></div>
            
            <div class="summary-row total">
              <span class="summary-label">Total</span>
              <span class="summary-value">${{ total.toFixed(2) }}</span>
            </div>

            <div class="terms-checkbox">
              <input type="checkbox" id="terms" v-model="termsAgreed">
              <label for="terms">I agree with Terms & Conditions</label>
            </div>

            <router-link to="/checkout" class="checkout-btn" :disabled="!termsAgreed" v-bind:class="{ 'disabled': !termsAgreed }">
              Proceed to Checkout
            </router-link>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { productsModule } from "@/stores/products";

// Initialize store
const store = productsModule();

// Reactive state
const termsAgreed = ref(false);

// Computed properties
const cartItems = computed(() => store.cartItems);

const subtotal = computed(() => {
  return cartItems.value.reduce((sum, item) => {
    const price = itemPrice(item);
    return sum + price * item.quantity;
  }, 0);
});

const total = computed(() => {
  return subtotal.value + (subtotal.value >= 800 ? 0 : 9.99);
});

// Methods
const itemPrice = (item) => {
  const price = item.discountPercentage  ? Math.ceil(item.price - item.price * (item.discountPercentage / 100))  : item.price;
  return price.toFixed(2);
};
const itemTotal = (item) => {
  const price = item.discountPercentage 
    ? Math.ceil(item.price - item.price * (item.discountPercentage / 100)) 
    : item.price;
  return (price * item.quantity).toFixed(2);
};
const increaseQty = (item) => {
  store.updateCartQuantity(item.id, item.quantity + 1);
};
const decreaseQty = (item) => {
  if (item.quantity > 1) {
    store.updateCartQuantity(item.id, item.quantity - 1);
  }
};
const removeItem = (productId) => {
  store.removeFromCart(productId);
};
</script>

<style scoped>
.cart-view {
  padding: 40px 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.page-title {
  font-size: 28px;
  font-weight: 800;
  color: #1f2937;
  margin: 0;
}

.continue-shopping-link {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #3b82f6;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
}

.continue-shopping-link:hover {
  color: #2563eb;
  transform: translateX(-4px);
}

.empty-cart {
  text-align: center;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.empty-cart svg {
  color: #d1d5db;
  width: 80px;
  height: 80px;
}

.empty-cart-title {
  font-size: 24px;
  font-weight: 800;
  color: #1f2937;
  margin: 0;
}

.empty-cart-text {
  font-size: 15px;
  color: #6b7280;
  margin: 0;
}

.shop-now-btn {
  padding: 12px 28px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  font-size: 15px;
  font-weight: 700;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.shop-now-btn:hover {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3);
}

.cart-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
}

.cart-items-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cart-item {
  display: grid;
  grid-template-columns: 100px 1fr auto;
  gap: 20px;
  padding: 18px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.cart-item:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.item-image-wrapper {
  width: 100px;
  height: 100px;
  border-radius: 10px;
  overflow: hidden;
  background: #f3f4f6;
}

.item-image {
  width: 100%;
  height: 100px;
  object-fit: cover;
}

.item-details {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.item-title-link {
  text-decoration: none;
}

.item-title {
  font-size: 16px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
  transition: color 0.2s ease;
}

.item-title-link:hover .item-title {
  color: #3b82f6;
}

.item-category {
  font-size: 13px;
  color: #6b7280;
  text-transform: capitalize;
  margin: 0;
}

.item-price {
  font-size: 18px;
  font-weight: 800;
  color: #dc2626;
  margin: 0;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid #e5e7eb;
  border-radius: 50px;
  padding: 4px 12px;
  width: fit-content;
  margin-top: 4px;
}

.qty-btn {
  border: none;
  background: transparent;
  cursor: pointer;
  color: #1f2937;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.qty-btn:hover {
  color: #3b82f6;
}

.qty-value {
  font-size: 15px;
  font-weight: 700;
  color: #1f2937;
  min-width: 20px;
  text-align: center;
}

.item-total {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
}

.item-total-price {
  font-size: 20px;
  font-weight: 900;
  color: #1f2937;
  margin: 0;
}

.remove-btn {
  border: none;
  background: #fee2e2;
  color: #dc2626;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
}

.remove-btn:hover {
  background: #fecaca;
}

.cart-summary-section {
  position: sticky;
  top: 100px;
  height: fit-content;
}

.summary-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.06);
}

.summary-title {
  font-size: 20px;
  font-weight: 800;
  color: #1f2937;
  margin: 0 0 20px 0;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.summary-row.shipping {
  margin-bottom: 16px;
}

.summary-label {
  font-size: 14px;
  color: #6b7280;
}

.summary-value {
  font-size: 15px;
  font-weight: 700;
  color: #1f2937;
}

.summary-row.total .summary-label {
  color: #1f2937;
  font-weight: 800;
  font-size: 16px;
}

.summary-row.total .summary-value {
  font-size: 22px;
  color: #dc2626;
}

.summary-divider {
  height: 1px;
  background: #e5e7eb;
  margin: 12px 0;
}

.terms-checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 20px 0;
  font-size: 13px;
  color: #374151;
}

.terms-checkbox input {
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: #3b82f6;
}

.checkout-btn {
  width: 100%;
  padding: 14px 24px;
  border: none;
  border-radius: 50px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  text-align: center;
  box-sizing: border-box;
  display: inline-block;
}

.checkout-btn:hover:not(.disabled) {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3);
}

.checkout-btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

@media (max-width: 1024px) {
  .cart-content {
    grid-template-columns: 1fr;
  }
  
  .cart-summary-section {
    position: static;
  }
}

@media (max-width: 640px) {
  .cart-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .cart-item {
    grid-template-columns: 1fr;
  }
  
  .item-image-wrapper {
    width: 100%;
    height: 180px;
  }
  
  .item-total {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
