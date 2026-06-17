// LocalStorage keys
const STORAGE_KEY = 'ecommerce-cart-items';
const PRODUCTS_STORAGE_KEY = 'ecommerce-all-products';
const CATEGORIES_STORAGE_KEY = 'ecommerce-categories';
const DATA_TIMESTAMP_KEY = 'ecommerce-data-timestamp';
const DATA_EXPIRY_HOURS = 24; // Data expires after 24 hours

// Check if cached data is still fresh (not expired)
export function isDataValid() {
  try {
    const timestamp = localStorage.getItem(DATA_TIMESTAMP_KEY);
    if (!timestamp) return false;
    
    const now = new Date().getTime();
    const storedTime = parseInt(timestamp);
    const hoursDiff = (now - storedTime) / (1000 * 60 * 60);
    
    return hoursDiff < DATA_EXPIRY_HOURS;
  } catch (err) {
    console.error('Error checking data validity:', err);
    return false;
  }
}

// Save current time as data timestamp
export function saveDataTimestamp() {
  try {
    localStorage.setItem(DATA_TIMESTAMP_KEY, new Date().getTime().toString());
  } catch (err) {
    console.error('Error saving data timestamp:', err);
  }
}

// Load products from localStorage cache
export function loadProductsFromStorage() {
  try {
    const storedProducts = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (storedProducts) {
      return JSON.parse(storedProducts);
    }
  } catch (err) {
    console.error('Error loading products from localStorage:', err);
  }
  return null;
}

// Save products to localStorage
export function saveProductsToStorage(products) {
  try {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    saveDataTimestamp();
  } catch (err) {
    console.error('Error saving products to localStorage:', err);
  }
}

// Load categories from localStorage cache
export function loadCategoriesFromStorage() {
  try {
    const storedCategories = localStorage.getItem(CATEGORIES_STORAGE_KEY);
    if (storedCategories) {
      return JSON.parse(storedCategories);
    }
  } catch (err) {
    console.error('Error loading categories from localStorage:', err);
  }
  return null;
}

// Save categories to localStorage
export function saveCategoriesToStorage(categories) {
  try {
    localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories));
    saveDataTimestamp();
  } catch (err) {
    console.error('Error saving categories to localStorage:', err);
  }
}

// Load shopping cart from localStorage
export function loadCart() {
  try {
    const storedCart = localStorage.getItem(STORAGE_KEY);
    if (storedCart) {
      return JSON.parse(storedCart);
    }
  } catch (err) {
    console.error('Error loading cart from localStorage:', err);
  }
  return [];
}

// Save shopping cart to localStorage
export function saveCart(cartItems) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  } catch (err) {
    console.error('Error saving cart to localStorage:', err);
  }
}
