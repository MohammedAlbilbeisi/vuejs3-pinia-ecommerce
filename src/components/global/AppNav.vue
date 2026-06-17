<template>
  <div class="nav-bar">
    <!-- Spacer div that holds the space! Always static! -->
    <div class="nav-spacer"></div>

    <!-- Navbar - always fixed! -->
    <div class="nav-fixed">
      <!-- Top Banner (only when not scrolled) -->
      <div class="top-banner" v-show="!isScrolled">
        <div class="banner-content">
          <v-icon size="16" class="banner-icon">mdi-flash</v-icon>
          <span class="banner-text">SPECIAL OFFER: ENJOY 3 MONTHS OF SHOPIFY FOR $1/MONTH</span>
          <v-icon size="16" class="banner-icon">mdi-flash</v-icon>
          <span class="banner-text">SPECIAL OFFER: ENJOY 3 MONTHS OF SHOPIFY FOR $1/MONTH</span>
          <v-icon size="16" class="banner-icon">mdi-flash</v-icon>
          <v-icon size="16" class="banner-icon">mdi-flash</v-icon>
          <span class="banner-text">SPECIAL OFFER: ENJOY 3 MONTHS OF SHOPIFY FOR $1/MONTH</span>
          <v-icon size="16" class="banner-icon">mdi-flash</v-icon>
          <span class="banner-text">SPECIAL OFFER: ENJOY 3 MONTHS OF SHOPIFY FOR $1/MONTH</span>
          <v-icon size="16" class="banner-icon">mdi-flash</v-icon>
        </div>
      </div>
      
      <!-- When NOT scrolled: show everything -->
      <div v-if="!isScrolled" class="nav-full">
        <!-- Upper Nav -->
        <div class="upper-nav">
          <div class="upper-nav-content d-flex align-center justify-between">
            
            <!-- LEFT SECTION: Logo & Mobile Hamburger -->
            <div class="left-section">
              <button class="hamburger-btn" @click="toggleMobileMenu">
                <v-icon size="32" color="#fff">mdi-menu</v-icon>
              </button>
              <router-link :to="{ name: 'home' }" class="logo" style="text-decoration: none;">
                <span class="logo-text">ella</span><span class="logo-plus">mart+</span>
              </router-link>
            </div>

            <!-- CENTER SECTION: Search Bar -->
            <div class="center-section">
              <div class="search-wrapper">
                <input type="text" class="search-input" placeholder="Search the store" />
                <v-icon class="search-icon" size="28">mdi-magnify</v-icon>
              </div>
            </div>

            <!-- RIGHT SECTION: Icons -->
            <div class="right-section d-flex align-center">
              <div class="icons-group d-flex align-center">
                <div class="nav-item">
                  <v-icon size="34" color="#ffb547">mdi-heart</v-icon>
                  <span class="nav-item-text">Wish Lists</span>
                </div>

                <div class="nav-item">
                  <v-icon size="34" color="#ffb547">mdi-account</v-icon>
                  <span class="nav-item-text">Sign In</span>
                </div>

                <div class="nav-item cart-item" style="text-decoration: none; cursor: pointer;" @click="openCart">
                  <v-badge v-if="cartCount > 0" location="right top" :content="cartCount" color="#205dc2" :offsetX="-14">
                    <v-icon size="34" color="#ffb547">mdi-cart</v-icon>
                  </v-badge>
                  <v-icon v-else size="34" color="#ffb547">mdi-cart</v-icon>
                  <span class="nav-item-text">Cart</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Lower Nav -->
        <div class="lower-nav">
          <div class="lower-nav-content d-flex align-center justify-space-between">
            <div class="nav-links d-flex align-center">
              <router-link 
              v-for="(category, index) in categories" 
              :key="index"
              :to="{ name: 'products_category', params: { category: category.route } }"
              class="nav-link" 
              :class="{ active: activeLink === category.title }" 
              @click="setActiveLink(category.title)"
            >
              <span>{{ category.title }}</span>
            </router-link>
            </div>

            <div class="lower-right d-flex align-center">
              <div class="lower-link">
                <v-icon size="24" color="#205dc2">mdi-help-circle</v-icon>
                <span>Help</span>
              </div>
              <div class="lower-link dropdown-container" @click="toggleDropdown">
                <svg v-if="currentLang === 'EN'" class="flag-icon" viewBox="0 0 60 30" width="24" height="12">
                  <clipPath id="t1">
                    <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/>
                  </clipPath>
                  <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
                  <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/>
                  <path d="M0,0 L60,30 M60,0 L0,30" clip-path="url(#t1)" stroke="#C8102E" stroke-width="4"/>
                  <path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10"/>
                  <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6"/>
                </svg>
                <svg v-else class="flag-icon" viewBox="0 0 36 24" width="24" height="16">
                  <rect width="36" height="8" fill="#000"/>
                  <rect width="36" height="8" y="8" fill="#d00"/>
                  <rect width="36" height="8" y="16" fill="#ffce00"/>
                </svg>
                <span class="lang-currency-text">{{ currentLang }} / <strong class="currency">{{ currentCurrency }}</strong></span>
                <v-icon size="16">mdi-chevron-down</v-icon>
                <div v-if="dropdownOpen" class="dropdown-menu">
                  <div 
                    v-for="(option, index) in languageOptions" 
                    :key="index"
                    class="dropdown-item" 
                    @click="selectOption(option.lang, option.currency)"
                  >
                    <svg v-if="option.flag === 'uk'" class="flag-icon" viewBox="0 0 60 30" width="24" height="12">
                      <clipPath :id="'t' + index">
                        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/>
                      </clipPath>
                      <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
                      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/>
                      <path d="M0,0 L60,30 M60,0 L0,30" clip-path="'url(#t' + index + ')'" stroke="#C8102E" stroke-width="4"/>
                      <path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10"/>
                      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6"/>
                    </svg>
                    <svg v-else class="flag-icon" viewBox="0 0 36 24" width="24" height="16">
                      <rect width="36" height="8" fill="#000"/>
                      <rect width="36" height="8" y="8" fill="#d00"/>
                      <rect width="36" height="8" y="16" fill="#ffce00"/>
                    </svg>
                    <span>{{ option.lang }} / {{ option.currency }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- When scrolled: show only Logo, Nav Links, Search, Cart -->
      <div v-else class="nav-mini">
        <div class="nav-mini-content d-flex align-center justify-between">
          <button class="hamburger-btn" @click="toggleMobileMenu">
            <v-icon size="28" color="#fff">mdi-menu</v-icon>
          </button>
          <router-link :to="{ name: 'home' }" class="logo-mini" style="text-decoration: none;">
            <span class="logo-text-mini">ella</span><span class="logo-plus-mini">mart+</span>
          </router-link>

          <div class="nav-links-mini d-flex align-center">
            <router-link 
              v-for="(category, index) in categories" 
              :key="index"
              :to="{ name: 'products_category', params: { category: category.route } }"
              class="nav-link-mini" 
              :class="{ active: activeLink === category.title }" 
              @click="setActiveLink(category.title)"
            >
              <span>{{ category.title }}</span>
            </router-link>
          </div>

          <div class="right-mini d-flex align-center">
            <v-icon class="search-icon-mini" size="26" color="#fff" @click="() => {}">mdi-magnify</v-icon>
            <div class="cart-item" style="text-decoration: none; cursor: pointer;" @click="openCart">
              <v-badge v-if="cartCount > 0" location="right top" :content="cartCount" color="#205dc2" :offsetX="-8">
                <v-icon size="26" color="#ffb547">mdi-cart</v-icon>
              </v-badge>
              <v-icon v-else size="26" color="#ffb547">mdi-cart</v-icon>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <div v-if="mobileMenuOpen" class="mobile-menu-overlay" @click="toggleMobileMenu"></div>
    <div v-if="mobileMenuOpen" class="mobile-menu">
      <div class="mobile-menu-header">
        <span class="mobile-menu-title">Menu</span>
        <button class="mobile-menu-close" @click="toggleMobileMenu">
          <v-icon size="28" color="#333">mdi-close</v-icon>
        </button>
      </div>
      <div class="mobile-menu-content">
        <div class="mobile-nav-links">
          <router-link 
            v-for="(category, index) in categories" 
            :key="index"
            :to="{ name: 'products_category', params: { category: category.route } }"
            class="mobile-nav-link" 
            :class="{ active: activeLink === category.title }" 
            @click="setActiveLink(category.title); toggleMobileMenu()"
          >
            <span>{{ category.title }}</span>
          </router-link>
        </div>
        <div class="mobile-menu-section">
          <h4 class="mobile-section-title">Account</h4>
          <div class="mobile-menu-item">
            <v-icon size="24" color="#205dc2">mdi-heart</v-icon>
            <span>Wish Lists</span>
          </div>
          <div class="mobile-menu-item">
            <v-icon size="24" color="#205dc2">mdi-account</v-icon>
            <span>Sign In</span>
          </div>
        </div>
        <div class="mobile-menu-section">
          <h4 class="mobile-section-title">Help & Settings</h4>
          <div class="mobile-menu-item">
            <v-icon size="24" color="#205dc2">mdi-help-circle</v-icon>
            <span>Help</span>
          </div>
          <div class="mobile-menu-item">
            <svg v-if="currentLang === 'EN'" class="flag-icon" viewBox="0 0 60 30" width="24" height="12">
              <clipPath id="t1">
                <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/>
              </clipPath>
              <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
              <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/>
              <path d="M0,0 L60,30 M60,0 L0,30" clip-path="url(#t1)" stroke="#C8102E" stroke-width="4"/>
              <path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10"/>
              <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6"/>
            </svg>
            <svg v-else class="flag-icon" viewBox="0 0 36 24" width="24" height="16">
              <rect width="36" height="8" fill="#000"/>
              <rect width="36" height="8" y="8" fill="#d00"/>
              <rect width="36" height="8" y="16" fill="#ffce00"/>
            </svg>
            <span>{{ currentLang }} / {{ currentCurrency }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, inject, onMounted, onUnmounted } from 'vue';
import { productsModule } from "@/stores/products";

const Emitter = inject("Emitter");
const store = productsModule();

const activeLink = ref(null); // No active link initially
const dropdownOpen = ref(false);
const currentLang = ref("EN");
const currentCurrency = ref("USD");
const isScrolled = ref(false);
const mobileMenuOpen = ref(false);
const languageOptions = ref([
  { lang: "EN", currency: "USD", flag: "uk" },
  { lang: "DE", currency: "EURO", flag: "de" }
]);
let dropdownContainer = null;

const cartCount = computed(() => {
  return store.cartItems.reduce((sum, item) => sum + item.quantity, 0);
});

const categories = computed(() => {
  // Only show these specific categories as in your image
  return [
    { title: "Smart Phones", route: "smartphones" },
    { title: "Laptops", route: "laptops" },
    { title: "Furniture", route: "furniture" },
    { title: "Men's Shoes", route: "mens-shoes" },
    { title: "Men's Watches", route: "mens-watches" },
    { title: "Women's Bags", route: "womens-bags" },
    { title: "Motorcycle", route: "motorcycle" }
  ];
});

const openCart = () => {
  Emitter.emit("openCart");
};

const setActiveLink = (linkName) => {
  activeLink.value = linkName;
};

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const selectOption = (lang, currency) => {
  currentLang.value = lang;
  currentCurrency.value = currency;
  dropdownOpen.value = false;
};

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const handleOutsideClick = (event) => {
  if (dropdownContainer && !dropdownContainer.contains(event.target)) {
    dropdownOpen.value = false;
  }
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

onMounted(() => {
  document.addEventListener('click', handleOutsideClick);
  window.addEventListener('scroll', handleScroll);
  dropdownContainer = document.querySelector('.dropdown-container');
});

onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick);
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.nav-bar {
  width: 100%;
  display: flex;
  flex-direction: column;
}

/* Spacer - always holds the full original navbar height! */
.nav-spacer {
  height: 190px; 
  width: 100%;
  background: linear-gradient(90deg, #3a2bd8 0%, #7a29d5 100%);
}

/* Navbar is ALWAYS fixed! */
.nav-fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 999;
  background-color: #02218f;
  transition: all 0.3s ease;
}

/* Nav full (not scrolled) */
.nav-full {
  width: 100%;
}

/* Nav mini (scrolled) */
.nav-mini {
  width: 100%;
  background-color: #02218f;
  padding: 12px 50px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
}

.nav-mini-content {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Mini logo */
.logo-mini {
  flex-shrink: 0;
}

.logo-text-mini {
  font-size: 20px;
  font-weight: 800;
  color: white;
  border-bottom: 2px solid #ffb547;
  padding-bottom: 2px;
  letter-spacing: 0.3px;
}

.logo-plus-mini {
  color: #ffb547;
  font-size: 20px;
  font-weight: 800;
  letter-spacing: 0.3px;
}

/* Mini nav links */
.nav-links-mini {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  gap: 25px;
}

.nav-link-mini {
  color: white;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-weight: 500;
  transition: color 0.2s ease;
  text-decoration: none;
}

.nav-link-mini:hover {
  color: #ffb547;
}

.nav-link-mini.active {
  border-bottom: 2px solid #ffb547;
  font-weight: 700;
  color: #ffb547;
  padding-bottom: 2px;
}

/* Mini right side */
.right-mini {
  flex-shrink: 0;
  display: flex;
  gap: 20px;
}

.search-icon-mini {
  cursor: pointer;
}

.search-icon-mini:hover {
  color: #ffb547;
}

/* Top Banner */
.top-banner {
  width: 100%;
  background: linear-gradient(90deg, #00b4d8, #00b4d8, #90e0ef, #00b4d8, #00b4d8);
  padding: 5px 0;
  overflow: hidden;
  transition: all 0.3s ease;
}

.banner-content {
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: center;
  white-space: nowrap;
  animation: scroll 20s linear infinite;
}

@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.banner-icon {
  color: #ff6b6b;
}

.banner-text {
  color: white;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.3px;
}

/* Upper Nav */
.upper-nav {
  background-color: #02218f;
  padding: 15px 0 25px 0;
  width: 100%;
  transition: all 0.3s ease;
}

.upper-nav-scrolled {
  padding: 8px 0;
}

.upper-nav-content {
  width: 100%;
  padding: 0 50px;
}

/* LEFT SECTION */
.left-section {
  flex-shrink: 0; /* Don't shrink logo */
  display: flex;
  align-items: center;
  gap: 15px;
}

.hamburger-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 5px;
  display: none;
}

.logo-text {
  font-size: 28px;
  font-weight: 800;
  color: white;
  border-bottom: 4px solid #ffb547;
  padding-bottom: 2px;
  letter-spacing: 0.3px;
  transition: all 0.3s ease;
}

.logo-plus {
  color: #ffb547;
  font-size: 28px;
  font-weight: 800;
  letter-spacing: 0.3px;
  transition: all 0.3s ease;
}

.logo-scrolled .logo-text,
.logo-scrolled .logo-plus {
  font-size: 20px;
}

.logo-scrolled .logo-text {
  border-bottom: 2px solid #ffb547;
}

/* CENTER SECTION */
.center-section {
  flex-grow: 1; /* Take available space between left and right */
  display: flex;
  justify-content: center; /* Center the search bar */
  padding: 0 80px; /* Add space between left/right sections */
  transition: all 0.3s ease;
}

.center-section-scrolled {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  padding: 0 30px;
}

.search-wrapper {
  width: 100%;
  max-width: 440px; /* Max width for search bar */
  position: relative;
}

.search-wrapper-scrolled {
  width: 100%;
  max-width: 300px;
  position: relative;
}

.search-input {
  width: 100%;
  height: 50px;
  border-radius: 25px;
  border: 2px solid #e5e5e5;
  outline: none;
  padding: 0 60px 0 26px;
  font-size: 15px;
  background-color: white;
  transition: all 0.2s ease;
}

.search-input:focus {
  border-color: #ffb547;
  box-shadow: 0 0 0 3px rgba(255, 181, 71, 0.15);
}

.search-input-scrolled {
  width: 100%;
  height: 36px;
  border-radius: 18px;
  border: 2px solid #e5e5e5;
  outline: none;
  padding: 0 45px 0 16px;
  font-size: 13px;
  background-color: white;
  transition: all 0.2s ease;
}

.search-input-scrolled:focus {
  border-color: #ffb547;
  box-shadow: 0 0 0 3px rgba(255, 181, 71, 0.15);
}

.search-icon {
  position: absolute;
  right: 22px;
  top: 50%;
  transform: translateY(-50%);
  color: #777;
}

.search-icon-scrolled {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #777;
}

/* RIGHT SECTION */
.right-section {
  gap: 35px;
  flex-shrink: 0; /* Don't shrink right section */
}

.right-section-scrolled {
  flex-shrink: 0;
}

.icons-group {
  gap: 35px;
}

.icons-group-scrolled {
  gap: 25px;
}

.phone-section {
  display: flex;
  flex-direction: column;
  text-align: right;
  color: white;
}

.phone-label {
  font-size: 13px;
  opacity: 0.9;
  font-weight: 500;
  margin-bottom: 2px;
}

.phone-number {
  font-size: 16px;
  font-weight: 700;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  font-size: 13px;
  cursor: pointer;
  gap: 4px;
  transition: transform 0.2s ease;
}

.nav-item:hover {
  transform: translateY(-2px);
}

.nav-item-text {
  display: block;
}

.nav-item-scrolled {
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.nav-item-scrolled:hover {
  transform: translateY(-2px);
}

.cart-item {
  cursor: pointer;
}

/* Lower Nav */
.lower-nav {
  background-color: #02218f;
  padding-top: 10px;
  padding-bottom: 5px;
  width: 100%;
  transition: all 0.3s ease;
}

.lower-nav-scrolled {
  padding-top: 5px;
  padding-bottom: 5px;
}

.lower-nav-content {
  height: auto;
  padding: 0 50px;
}

.nav-links {
  gap: 20px;
}

.nav-link {
  color: white;
  font-size: 14px;
  cursor: pointer;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
  transition: color 0.2s ease;
  position: relative;
  text-decoration: none;
}

.nav-link:hover {
  color: #ffb547;
}

.nav-link.active {
  border-bottom: 3px solid #ffb547;
  font-weight: 700;
  color: #ffb547;
}

.badge {
  font-size: 9px;
  font-weight: 800;
  padding: 2px 8px;
  border-radius: 4px;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  position: absolute;
  top: -18px;
  left: 50%;
  transform: translateX(-50%);
  line-height: 1.2;
}

.badge::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 6px solid;
}

.new-badge {
  background-color: #38d9a9;
  color: white;
}

.new-badge::after {
  border-top-color: #38d9a9;
}

.hot-badge {
  background-color: #ffd43b;
  color: #333;
}

.hot-badge::after {
  border-top-color: #ffd43b;
}

.lower-right {
  gap: 25px;
}

.lower-link {
  display: flex;
  align-items: center;
  gap: 5px;
  color: white;
  font-size: 14px;
  cursor: pointer;
  font-weight: 500;
  transition: color 0.2s ease;
  position: relative;
}

.lower-link:hover {
  color: #ffb547;
}

.dropdown-container {
  position: relative;
}

.flag-icon {
  border-radius: 2px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  margin-top: 5px;
  min-width: 150px;
  z-index: 100;
  overflow: hidden;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 15px;
  cursor: pointer;
  color: #333;
  font-size: 14px;
  transition: background-color 0.2s ease;
}

.dropdown-item:hover {
  background-color: #f8f9fa;
}

.lang-currency-text {
  color: white;
}

.currency {
  color: white;
  font-weight: 700;
}

/* Mobile Menu */
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 300px;
  max-width: 85%;
  background: white;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
  transform: translateX(-100%);
  animation: slideIn 0.3s ease forwards;
}

@keyframes slideIn {
  to {
    transform: translateX(0);
  }
}

.mobile-menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.mobile-menu-title {
  font-size: 20px;
  font-weight: 700;
  color: #333;
}

.mobile-menu-close {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 5px;
}

.mobile-menu-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.mobile-nav-links {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 30px;
}

.mobile-nav-link {
  padding: 15px;
  color: #333;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}

.mobile-nav-link:hover,
.mobile-nav-link.active {
  background-color: #f5f5f5;
  color: #205dc2;
}

.mobile-menu-section {
  margin-bottom: 30px;
}

.mobile-section-title {
  font-size: 14px;
  font-weight: 700;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 15px;
}

.mobile-menu-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px 0;
  color: #333;
  font-size: 15px;
  cursor: pointer;
  transition: color 0.2s ease;
}

.mobile-menu-item:hover {
  color: #205dc2;
}

/* Responsive Styles */
@media (max-width: 1200px) {
  .upper-nav-content {
    padding: 0 30px;
  }
  .lower-nav-content {
    padding: 0 30px;
  }
  .nav-mini {
    padding: 12px 30px;
  }
  .nav-links {
    gap: 15px;
  }
  .nav-links-mini {
    gap: 15px;
  }
}

@media (max-width: 1024px) {
  .center-section {
    padding: 0 40px;
  }
  .nav-links {
    gap: 12px;
  }
  .nav-link {
    font-size: 13px;
  }
  .nav-item-text {
    display: none;
  }
  .icons-group {
    gap: 20px;
  }
  .nav-links-mini {
    display: none;
  }
}

@media (max-width: 768px) {
  .nav-spacer {
    height: 160px;
  }
  .upper-nav-content {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 15px;
    padding: 0 20px;
  }
  .left-section {
    width: auto;
  }
  .hamburger-btn {
    display: block;
  }
  .center-section {
    width: 100%;
    padding: 0;
    order: 3;
  }
  .search-wrapper {
    max-width: 100%;
  }
  .right-section {
    width: auto;
    justify-content: flex-end;
  }
  .lower-nav {
    display: none;
  }
  .nav-mini {
    padding: 12px 20px;
  }
  .banner-content {
    gap: 10px;
  }
  .banner-text {
    font-size: 11px;
  }
  .logo-text {
    font-size: 24px;
  }
  .logo-plus {
    font-size: 24px;
  }
}

@media (max-width: 480px) {
  .nav-spacer {
    height: 150px;
  }
  .upper-nav {
    padding: 10px 0 15px 0;
  }
  .search-input {
    height: 44px;
    font-size: 14px;
  }
  .nav-item {
    padding: 0 5px;
  }
  .logo-text {
    font-size: 22px;
  }
  .logo-plus {
    font-size: 22px;
  }
  .logo-text-mini {
    font-size: 18px;
  }
  .logo-plus-mini {
    font-size: 18px;
  }
  .nav-mini {
    padding: 10px 15px;
  }
}
</style>
