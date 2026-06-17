// Import Pinia store and axios for API requests
import { defineStore } from "pinia";
import axios from "axios";
import {
  isDataValid,
  loadProductsFromStorage,
  saveProductsToStorage,
  loadCategoriesFromStorage,
  saveCategoriesToStorage,
  loadCart,
  saveCart
} from "./storage.js";

// Main products store
export const productsModule = defineStore("productsModule", {
  // State: application data
  state: () => ({
    flashDeals: [], // Products for flash deals section
    newProducts: [], // New products section
    mobilePhones: [], // Mobile phones category
    fragrances: [], // Fragrances category
    groceries: [], // Groceries category
    allProducts: [], // All products from API
    categories: [ // Default categories
      { title: "Smart Phones", route: "smartphones" },
      { title: "Laptops", route: "laptops" },
      { title: "Furniture", route: "furniture" },
      { title: "Men's Shoes", route: "mens-shoes" },
      { title: "Men's Watches", route: "mens-watches" },
      { title: "Women's Bags", route: "womens-bags" },
      { title: "Motorcycle", route: "motorcycle" }
    ],
    categoryProducts: [], // Products for current category page
    quickViewProduct: null, // Current product for quick view modal
    isQuickViewOpen: false, // Controls quick view modal visibility
    cartItems: [] // Shopping cart items
  }),
  // Actions: methods to modify state and handle business logic
  actions: {
    // Fetch all products from API or load from cache
    async getProducts() {
      // Load cart first
      this.cartItems = loadCart();

      // Try to load from localStorage first
      if (isDataValid()) {
        const storedProducts = loadProductsFromStorage();
        if (storedProducts) {
          this.allProducts = storedProducts;
          this.processProducts(storedProducts);
          console.log('Loaded products from localStorage');
          return;
        }
      }

      try {
        // First get total number of products
        const totalRes = await axios.get("https://dummyjson.com/products?limit=0");
        const total = totalRes.data.total;

        // Now get all products
        const allRes = await axios.get(`https://dummyjson.com/products?limit=${total}`);
        const allProducts = allRes.data.products;

        // Save all products to state
        this.allProducts = allProducts;

        console.log('All products from API:', allProducts);

        // Process products into categories
        this.processProducts(allProducts);

        // Save to localStorage for next time
        saveProductsToStorage(allProducts);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    },

    // Fetch categories from API or load from cache
    async getCategories() {
      if (isDataValid()) {
        const storedCategories = loadCategoriesFromStorage();
        if (storedCategories) {
          this.categories = storedCategories;
          console.log('Loaded categories from localStorage');
          return;
        }
      }

      try {
        const res = await axios.get("https://dummyjson.com/products/categories");
        console.log('API categories response:', res.data);
        let categoriesData = Array.isArray(res.data) ? res.data : [];

        // Convert category objects to our format
        const processedCategories = categoriesData.map(category => {
          return {
            title: category.name,
            route: category.slug
          };
        });

        this.categories = processedCategories;
        console.log('Categories:', this.categories);

        // Save to localStorage
        saveCategoriesToStorage(processedCategories);
      } catch (err) {
          console.error('Error fetching categories:', err);
      }
    },

    // Get products for a specific category
    async getProductsByCategory(category) {
      try {
        // If no products loaded yet, fetch them
        if (this.allProducts.length === 0) {
          await this.getProducts();
        }

        // Filter all products by category
        this.categoryProducts = this.allProducts.filter(product => product.category === category);

        console.log(`Products for category ${category}:`, this.categoryProducts);
      } catch (err) {
        console.error('Error fetching products by category:', err);
      }
    },

    // Process all products: filter them into different category arrays
    processProducts(allProducts) {
      this.newProducts = allProducts.filter(
        (el) => el.category === "laptops"
      );
      console.log('New Products (laptops):', this.newProducts);

      this.fragrances = allProducts.filter(
        (el) => el.category === "fragrances"
      );
      console.log('Fragrances:', this.fragrances);

      this.flashDeals = allProducts.filter(product => product.images.length >= 3).slice(0, 8);
      console.log('Flash Deals:', this.flashDeals);

      this.mobilePhones = allProducts.filter(
        (el) => el.category === "smartphones"
      );
      console.log('Mobile Phones:', this.mobilePhones);

      this.groceries = allProducts.filter(
        (el) => el.category === "groceries"
      );
      console.log('Groceries:', this.groceries);
    },

    // Open quick view modal with a product
    openQuickView(product) {
      this.quickViewProduct = product;
      this.isQuickViewOpen = true;
    },

    // Close quick view modal
    closeQuickView() {
      this.quickViewProduct = null;
      this.isQuickViewOpen = false;
    },

    // Add product to cart (or update quantity if already there)
    addToCart(product, quantity = 1) {
      const existingItem = this.cartItems.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.cartItems.push({ ...product, quantity });
      }
      saveCart(this.cartItems);
    },

    // Remove product from cart
    removeFromCart(productId) {
      this.cartItems = this.cartItems.filter(item => item.id !== productId);
      saveCart(this.cartItems);
    },

    // Update quantity of a product in cart
    updateCartQuantity(productId, quantity) {
      const item = this.cartItems.find(item => item.id === productId);
      if (item) {
        item.quantity = Math.max(1, quantity); // Minimum quantity is 1
        saveCart(this.cartItems);
      }
    }
  },
});
