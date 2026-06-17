<template>
  <div class="checkout-view">
    <SuccessPopup :show="showPopup" @close="handlePopupClose" />
    <div class="store-name">new-ella-demo</div>
    <v-container>
      <div class="breadcrumb">
        <router-link to="/cart" class="breadcrumb-link">Cart</router-link>
        <span class="breadcrumb-separator">›</span>
        <span class="breadcrumb-current">Information</span>
      </div>
      <div class="checkout-header">
        <!-- Removed page title and back button to match the image -->
      </div>

      <div v-if="cartItems.length === 0" class="empty-checkout">
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <h2 class="empty-title">Your cart is empty</h2>
        <p class="empty-text">Add some items to your cart before checking out</p>
        <router-link to="/" class="shop-now-btn">
          Shop Now
        </router-link>
      </div>

      <div v-else class="checkout-content">
        <div class="checkout-forms">
          <div class="form-section">
            <h3 class="form-title">Shipping Addresses</h3>
            <div class="form-grid">
              <div class="form-group">
                <label for="firstName" class="form-label">First Name</label>
                <input type="text" id="firstName" v-model="shipping.firstName" class="form-input" placeholder="John">
              </div>
              <div class="form-group">
                <label for="lastName" class="form-label">Last Name</label>
                <input type="text" id="lastName" v-model="shipping.lastName" class="form-input" placeholder="Doe">
              </div>
              <div class="form-group">
                <label for="email" class="form-label">Email</label>
                <input type="email" id="email" v-model="shipping.email" class="form-input" placeholder="john@example.com">
              </div>
              <div class="form-group">
                <label for="phone" class="form-label">Phone</label>
                <input type="tel" id="phone" v-model="shipping.phone" class="form-input" placeholder="+1 (555) 000-0000">
              </div>
              <div class="form-group full-width">
                <label for="address" class="form-label">Address</label>
                <input type="text" id="address" v-model="shipping.address" class="form-input" placeholder="123 Main St">
              </div>
              <div class="form-group">
                <label for="city" class="form-label">City</label>
                <input type="text" id="city" v-model="shipping.city" class="form-input" placeholder="New York">
              </div>
              <div class="form-group">
                <label for="zipCode" class="form-label">ZIP Code</label>
                <input type="text" id="zipCode" v-model="shipping.zipCode" class="form-input" placeholder="10001">
              </div>
              <div class="form-group">
                <label for="country" class="form-label">Country</label>
                <input type="text" id="country" v-model="shipping.country" class="form-input" placeholder="United States">
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3 class="form-title">Payment</h3>
            <div class="payment-methods">
              <button class="payment-btn shop-pay-btn">
                <svg class="shop-pay-logo" viewBox="0 0 128 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="128" height="40" rx="4" fill="#5A31F4"/>
                  <path d="M41 12h6c4 0 7 3 7 7s-3 7-7 7h-3v4h-4V12h4zm3 11h3c2 0 4-2 4-4s-2-4-4-4h-3v8zm14-11h5c2 0 4 1 4 3s-2 3-4 3h-2v2h3c3 0 5 1 5 4s-2 4-5 4h-6V12h1zm2 6h3c1 0 2-1 2-2s-1-2-2-2h-3v4zm0 8h3c1 0 2-1 2-2s-1-2-2-2h-3v4zm17-6c0 3 1 5 4 5 2 0 3-1 4-2l2 2c-2 3-5 5-10 5-6 0-10-4-10-10s4-10 10-10c5 0 8 2 10 5l-2 2c-1-1-2-2-4-2-3 0-4 2-4 5zm17 3c0 6-3 10-10 10s-10-4-10-10 4-10 10-10c3 0 6 1 8 4l-3 2c-1-2-3-3-5-3-4 0-7 3-7 7s3 7 7 7c2 0 4-1 5-3l3 2c-2 3-5 4-8 4z" fill="white"/>
                  <circle cx="24" cy="20" r="12" fill="white"/>
                  <path d="M27 17l-5 5-2-2-2 2 7 7 7-7-2-2z" fill="#5A31F4"/>
                </svg>
              </button>
              <button class="payment-btn google-pay-btn">
                <svg class="google-pay-logo" viewBox="0 0 128 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="128" height="40" rx="4" fill="#000"/>
                  <g fill="white" transform="translate(20 8)">
                    <path d="M28 12.8h4.6v14.4H28V12.8zM17.2 12.8h4.4c5 0 7.3 3 7.3 7.2 0 4.2-2.3 7.2-7.3 7.2h-4.4V12.8zm4.4 12.1c1.7 0 2.8-1.2 2.8-4.9s-1.1-4.9-2.8-4.9h-0.2v9.8h0.2zM50.5 12.8l-2.6 5.7-2.5-5.7h-4.7l6.2 10.7v3.7h4.3v-3.7l6.2-10.7h-4.7zM63.7 12.8h4.3v14.4h-4.3V12.8z"/>
                    <path d="M78 20c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8-8-3.6-8-8zm12.7 0c0-2.6-2.1-4.7-4.7-4.7s-4.7 2.1-4.7 4.7 2.1 4.7 4.7 4.7 4.7-2.1 4.7-4.7z"/>
                  </g>
                </svg>
              </button>
            </div>
            <div class="or-divider">
              <span class="or-text">or</span>
            </div>
            <h4 class="form-subtitle">Credit Card</h4>
            <div class="form-grid">
              <div class="form-group full-width">
                <label for="cardNumber" class="form-label">Card Number</label>
                <input type="text" id="cardNumber" v-model="payment.cardNumber" class="form-input" placeholder="1234 5678 9012 3456">
              </div>
              <div class="form-group">
                <label for="expiry" class="form-label">Expiry Date</label>
                <input type="text" id="expiry" v-model="payment.expiry" class="form-input" placeholder="MM/YY">
              </div>
              <div class="form-group">
                <label for="cvc" class="form-label">CVC</label>
                <input type="text" id="cvc" v-model="payment.cvc" class="form-input" placeholder="123">
              </div>
              <div class="form-group full-width">
                <label for="cardName" class="form-label">Name on Card</label>
                <input type="text" id="cardName" v-model="payment.cardName" class="form-input" placeholder="John Doe">
              </div>
            </div>
          </div>
        </div>

        <div class="checkout-summary">
          <div class="summary-card">
            <h3 class="summary-title">Order Summary</h3>

            <div class="cart-items-mini">
              <div v-for="item in cartItems" :key="item.id" class="cart-item-mini">
                <div class="item-image-mini">
                  <img :src="item.thumbnail" :alt="item.title">
                </div>
                <div class="item-details-mini">
                  <p class="item-name-mini">{{ item.title }}</p>
                  <p class="item-qty-mini">Qty: {{ item.quantity }}</p>
                </div>
                <p class="item-price-mini">${{ itemPrice(item) }}</p>
              </div>
            </div>

            <div class="summary-divider"></div>

            <div class="summary-row">
              <span class="summary-label">Subtotal</span>
              <span class="summary-value">${{ subtotal.toFixed(2) }}</span>
            </div>
            <div class="summary-row">
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

            <button class="place-order-btn" @click="placeOrder" :disabled="!termsAgreed || isProcessing">
              <svg v-if="isProcessing" class="spinner" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" stroke-dasharray="60" stroke-dashoffset="10"></circle>
              </svg>
              {{ isProcessing ? 'Processing...' : 'SUBMIT' }}
            </button>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { productsModule } from "@/stores/products";
import SuccessPopup from "@/components/global/SuccessPopup.vue";

const router = useRouter();
const store = productsModule();

const isProcessing = ref(false);
const termsAgreed = ref(false);
const showPopup = ref(false);
const shipping = ref({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  zipCode: "",
  country: "Egypt"
});
const payment = ref({
  cardNumber: "",
  expiry: "",
  cvc: "",
  cardName: ""
});

const cartItems = computed(() => store.cartItems);
const subtotal = computed(() => {
  return cartItems.value.reduce((sum, item) => {
    const price = item.discountPercentage 
      ? Math.ceil(item.price - item.price * (item.discountPercentage / 100)) 
      : item.price;
    return sum + price * item.quantity;
  }, 0);
});
const total = computed(() => {
  return subtotal.value + (subtotal.value >= 800 ? 0 : 9.99);
});

const itemPrice = (item) => {
  const price = item.discountPercentage 
    ? Math.ceil(item.price - item.price * (item.discountPercentage / 100)) 
    : item.price;
  return (price * item.quantity).toFixed(2);
};
const placeOrder = async () => {
  isProcessing.value = true;
  await new Promise(resolve => setTimeout(resolve, 2000));
  store.cartItems = [];
  localStorage.removeItem('ecommerce-cart-items');
  isProcessing.value = false;
  showPopup.value = true;
};
const handlePopupClose = () => {
  showPopup.value = false;
  router.push("/");
};
</script>

<style scoped>
.checkout-view {
  padding: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #fff;
  min-height: 100vh;
}

.store-name {
  text-align: left;
  padding: 24px 24px 0;
  font-size: 18px;
  font-weight: 500;
  color: #1f2937;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  font-size: 14px;
  color: #6b7280;
  text-align: left;
}

.breadcrumb-link {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.breadcrumb-link:hover {
  color: #2563eb;
  text-decoration: underline;
}

.breadcrumb-separator {
  color: #9ca3af;
}

.breadcrumb-current {
  color: #6b7280;
  font-weight: 500;
}

.checkout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.page-title {
  font-size: 28px;
  font-weight: 800;
  color: #1f2937;
  margin: 0;
}

.back-to-cart {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #3b82f6;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
}

.back-to-cart:hover {
  color: #2563eb;
  transform: translateX(-4px);
}

.empty-checkout {
  text-align: center;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.empty-checkout svg {
  color: #d1d5db;
}

.empty-title {
  font-size: 24px;
  font-weight: 800;
  color: #1f2937;
  margin: 0;
}

.empty-text {
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

.checkout-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
}

.checkout-forms {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-section {
  background: transparent;
  padding: 0;
  border-radius: 0;
  box-shadow: none;
}

.form-title {
  font-size: 20px;
  font-weight: 800;
  color: #1f2937;
  margin: 0 0 20px 0;
}

.form-subtitle {
  font-size: 16px;
  font-weight: 700;
  color: #374151;
  margin: 0 0 16px 0;
}

.payment-methods {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
}

.payment-btn {
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  padding: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.payment-btn:hover {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.shop-pay-btn {
  background: #5a31f4;
  border-color: #5a31f4;
}

.shop-pay-btn:hover {
  background: #4c29d1;
  border-color: #4c29d1;
}

.google-pay-btn {
  background: #000;
  border-color: #000;
}

.google-pay-btn:hover {
  background: #333;
  border-color: #333;
}

.shop-pay-logo, .google-pay-logo {
  width: 100%;
  height: 32px;
  display: block;
}

.or-divider {
  display: flex;
  align-items: center;
  margin: 24px 0;
}

.or-divider::before, .or-divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #e5e7eb;
}

.or-text {
  padding: 0 16px;
  font-size: 14px;
  font-weight: 600;
  color: #6b7280;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 15px;
  color: #1f2937;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.checkout-summary {
  position: sticky;
  top: 100px;
  height: fit-content;
}

.summary-card {
  background: rgba(243, 244, 246, 0.5);
  padding: 24px;
  border-radius: 0;
  box-shadow: none;
  height: 100%;
}

.summary-title {
  font-size: 20px;
  font-weight: 800;
  color: #1f2937;
  margin: 0 0 20px 0;
}

.cart-items-mini {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 16px;
}

.cart-item-mini {
  display: flex;
  gap: 12px;
  align-items: center;
}

.item-image-mini {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  background: #f3f4f6;
  flex-shrink: 0;
}

.item-image-mini img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details-mini {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.item-name-mini {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.item-qty-mini {
  font-size: 13px;
  color: #6b7280;
  margin: 0;
}

.item-price-mini {
  font-size: 15px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.summary-divider {
  height: 1px;
  background: #e5e7eb;
  margin: 16px 0;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
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

.place-order-btn {
  width: fit-content;
  padding: 14px 48px;
  border: none;
  border-radius: 4px;
  background: linear-gradient(180deg, #4a90e2 0%, #2a71c2 100%);
  color: white;
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 0 auto;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.place-order-btn:hover:not(:disabled) {
  background: linear-gradient(180deg, #3a80d2 0%, #1a61b2 100%);
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
}

.place-order-btn:disabled {
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

@media (max-width: 1024px) {
  .checkout-content {
    grid-template-columns: 1fr;
  }
  
  .checkout-summary {
    position: static;
  }
}

@media (max-width: 640px) {
  .checkout-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>