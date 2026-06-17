// Import Vue Router functions
import { createRouter, createWebHistory } from 'vue-router'

// Define all application routes
const routes = [
  // Home page route
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  // Products by category route
  {
    path: '/products/:category',
    name: 'products_category',
    component: () => import('../views/ProductsCategory.vue')
  },
  // Single product details route
  {
    path: '/product/:id',
    name: 'product_details',
    component: () => import('../views/ProductDetails.vue')
  },
  // Shopping cart route
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/CartView.vue')
  },
  // Checkout page route
  {
    path: '/checkout',
    name: 'checkout',
    component: () => import('../views/CheckoutView.vue')
  }
]

// Create router instance
const router = createRouter({
  // Use HTML5 history mode
  history: createWebHistory(import.meta.env.BASE_URL),
  // Apply the routes defined above
  routes,
  // Scroll to top of page when navigating between routes
  scrollBehavior(to, from, savedPosition) {
    return { top: 0, left: 0, behavior: 'smooth' }
  }
})

export default router
