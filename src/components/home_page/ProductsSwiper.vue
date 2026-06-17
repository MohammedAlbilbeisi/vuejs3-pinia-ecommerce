<template>
  <div class="products-swiper pt-16">
    <div class="container">
      <div class="section-header mb-8" data-aos="fade-right">
        <div class="title-wrapper">
          <div class="title-indicator" :style="{ backgroundColor: titleColor }"></div>
          <h2 class="section-title" :style="{ color: titleColor }">
            {{ sectionTitle }}
          </h2>
        </div>
        <button class="shop-all-btn" :style="{ color: titleColor, borderColor: titleColor }">
          Shop All
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </div>

      <div class="swiper-container-wrapper" :class="{ 'with-banner': showBanner }">
        <button v-if="!useDots" class="swiper-nav-btn nav-prev">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        
        <div class="main-content" :class="{ 'with-banner': showBanner }">
          
          <template v-if="showBanner">
            <div class="slider-column">
              <div class="products-wrapper">
                <swiper
                  ref="swiperRef"
                  :slides-per-view="3"
                  :space-between="24"
                  :loop="loop"
                  :modules="[Navigation, Pagination]"
                  :navigation="!useDots ? { nextEl: '.nav-next', prevEl: '.nav-prev' } : false"
                  :pagination="useDots ? { clickable: true, el: '.custom-swiper-pagination' } : false"
                  :breakpoints="{
                    320: {
                      slidesPerView: 1,
                      spaceBetween: 16
                    },
                    640: {
                      slidesPerView: 2,
                      spaceBetween: 20
                    },
                    1024: {
                      slidesPerView: 3,
                      spaceBetween: 24
                    }
                  }"
                  class="products-swiper"
                >
                  <swiper-slide v-for="(item, index) in productsWithDiscount" :key="item.id">
                    <div class="product-card" data-aos="fade-up" :data-aos-delay="index * 100">
                      <div class="product-image-container">
                        <div class="discount-badge">-{{ Math.round(item.discountPercentage) }}%</div>
                        <div class="product-overlay"></div>
                        <div class="quick-actions">
                        <button class="quick-action-btn" title="Quick View" @click.stop="openQuickView(item)">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                          <span class="quick-action-text">Quick View</span>
                        </button>
                      </div>
                        <img
                          :src="shownItem[item.title] ? shownItem[item.title] : item.thumbnail"
                          class="product-image"
                          :alt="item.title"
                        />
                      </div>

                      <div class="product-content">
                        <router-link :to="{ name: 'product_details', params: { id: item.id } }" class="product-title-link" style="text-decoration: none;">
                          <h3 class="product-title">{{ item.title }}</h3>
                        </router-link>

                        <div class="rating-container">
                          <div class="stars">
                            <span v-for="i in 5" :key="i" :class="['star', i <= Math.floor(item.rating) ? 'filled' : '']">★</span>
                          </div>
                          <span class="rating-count">({{ item.rating.toFixed(1) }})</span>
                        </div>

                        <div class="prices">
                          <del class="old-price">${{ item.price }}</del>
                          <span class="new-price">${{ item.discountedPrice }}</span>
                        </div>

                        <div class="image-selector">
                          <button
                            v-for="(pic, i) in item.images.slice(0, 4)"
                            :key="i"
                            @click.stop="shownItem[item.title] = pic"
                            :class="['image-btn', { active: shownItem[item.title] === pic }]"
                          >
                            <img :src="pic" :alt="`Option ${i + 1}`" />
                          </button>
                        </div>

                        <button class="add-to-cart-btn" @click.stop="goToProductDetails(item)">
                          Choose options
                        </button>
                      </div>
                    </div>
                  </swiper-slide>
                </swiper>
              </div>

              <div v-if="useDots" class="dots-nav-container">
                <div class="custom-swiper-pagination"></div>
              </div>
            </div>

            <div class="promo-banner-column" data-aos="fade-left" data-aos-delay="200">
              <div class="promo-banner">
                <img :src="bannerImage" alt="Promotion" class="banner-image" />
                <div class="banner-overlay"></div>
                <div class="banner-content">
                  <span class="banner-subtitle">Limited Offer</span>
                  <h3 class="banner-title">{{ bannerTitle }}</h3>
                  <p class="banner-text">{{ bannerText }}</p>
                  <button class="banner-btn">{{ bannerBtnText }}</button>
                </div>
              </div>
            </div>
          </template>

          <template v-else>
            <div class="products-wrapper">
              <swiper
                ref="swiperRef"
                :slides-per-view="slidesPerView"
                :space-between="24"
                :loop="loop"
                :modules="[Navigation, Pagination]"
                :navigation="!useDots ? { nextEl: '.nav-next', prevEl: '.nav-prev' } : false"
                :pagination="useDots ? { clickable: true, el: '.custom-swiper-pagination-non-banner' } : false"
                :breakpoints="{
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 16
                  },
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 20
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 24
                  },
                  1280: {
                    slidesPerView: 4,
                    spaceBetween: 24
                  }
                }"
                class="products-swiper"
              >
                <swiper-slide v-for="(item, index) in productsWithDiscount" :key="item.id">
                  <div class="product-card" data-aos="fade-up" :data-aos-delay="index * 100">
                    <div class="product-image-container">
                      <div class="discount-badge">-{{ Math.round(item.discountPercentage) }}%</div>
                      <div class="product-overlay"></div>
                      <div class="quick-actions">
                        <button class="quick-action-btn" title="Quick View" @click.stop="openQuickView(item)">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                          <span class="quick-action-text">Quick View</span>
                        </button>
                      </div>
                      <img
                        :src="shownItem[item.title] ? shownItem[item.title] : item.thumbnail"
                        class="product-image"
                        :alt="item.title"
                      />
                    </div>

                    <div class="product-content">
                      <router-link :to="{ name: 'product_details', params: { id: item.id } }" class="product-title-link" style="text-decoration: none;">
                        <h3 class="product-title">{{ item.title }}</h3>
                      </router-link>

                      <div class="rating-container">
                        <div class="stars">
                          <span v-for="i in 5" :key="i" :class="['star', i <= Math.floor(item.rating) ? 'filled' : '']">★</span>
                        </div>
                        <span class="rating-count">({{ item.rating.toFixed(1) }})</span>
                      </div>

                      <div class="prices">
                        <del class="old-price">${{ item.price }}</del>
                        <span class="new-price">${{ item.discountedPrice }}</span>
                      </div>

                      <div class="image-selector">
                        <button
                          v-for="(pic, i) in item.images.slice(0, 4)"
                          :key="i"
                          @click.stop="shownItem[item.title] = pic"
                          :class="['image-btn', { active: shownItem[item.title] === pic }]"
                        >
                          <img :src="pic" :alt="`Option ${i + 1}`" />
                        </button>
                      </div>

                      <button class="add-to-cart-btn" @click.stop="goToProductDetails(item)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <circle cx="9" cy="21" r="1"></circle>
                          <circle cx="20" cy="21" r="1"></circle>
                          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        Choose options
                      </button>
                    </div>
                  </div>
                </swiper-slide>
              </swiper>

              <div v-if="useDots" class="dots-nav-container">
                <div class="custom-swiper-pagination-non-banner"></div>
              </div>
            </div>
          </template>
        </div>

        <button v-if="!useDots" class="swiper-nav-btn nav-next">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, inject } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { productsModule } from "@/stores/products";
import { useRouter } from "vue-router";

// Component Props Definition
const props = defineProps({
  products: {
    type: Array,
    required: true
  },
  sectionTitle: {
    type: String,
    default: "Products"
  },
  titleColor: {
    type: String,
    default: "#dc2626"
  },
  slidesPerView: {
    type: Number,
    default: 4
  },
  loop: {
    type: Boolean,
    default: false
  },
  showBanner: {
    type: Boolean,
    default: false
  },
  bannerImage: {
    type: String,
    default: "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1"
  },
  bannerTitle: {
    type: String,
    default: "WE HAVE VR AT HOME"
  },
  bannerText: {
    type: String,
    default: "Nulla nec pretium ligula."
  },
  bannerBtnText: {
    type: String,
    default: "Shop Now"
  },
  useDots: {
    type: Boolean,
    default: false
  }
});

const Emitter = inject("Emitter");
const store = productsModule();
const router = useRouter();
const swiperRef = ref(null);

const shownItem = ref({});

// Calculate discounted price for each product
const productsWithDiscount = computed(() => {
  return props.products.map(product => ({
    ...product,
    discountedPrice: Math.ceil(product.price - product.price * (product.discountPercentage / 100))
  }));
});

const openQuickView = (product) => {
  store.openQuickView(product);
};

const goToProductDetails = (product) => {
  router.push({ name: 'product_details', params: { id: product.id } });
};

// Reset shown item when products change
watch(() => props.products, () => {
  shownItem.value = {};
}, { deep: true });
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
}

.title-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}

.title-indicator {
  width: 6px;
  height: 32px;
  border-radius: 3px;
}

.section-title {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 32px;
  font-weight: 800;
  margin: 0;
  letter-spacing: -0.5px;
}

.shop-all-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 15px;
  font-weight: 600;
  background: transparent;
  border: 2px solid;
  padding: 10px 24px;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.shop-all-btn:hover {
  background-color: rgba(220, 38, 38, 0.1);
  color: #1a1a1a !important;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.shop-all-btn svg {
  transition: transform 0.3s ease;
}

.shop-all-btn:hover svg {
  transform: translateX(4px);
}

.swiper-container-wrapper {
  position: relative;
  padding: 8px;
}

.main-content {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  padding: 0;
  align-items: stretch;
}

.main-content.with-banner {
  grid-template-columns: 60% 40%;
  gap: 12px;
}

.slider-column {
  display: flex;
  flex-direction: column;
  gap: 32px;
  min-width: 0;
  overflow: hidden;
}

.promo-banner-column {
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 0;
}

.main-content.with-banner .products-wrapper {
  width: 100%;
  padding: 0;
  display: block;
}

.products-wrapper {
  overflow: hidden;
  padding: 0;
  width: 100%;
  position: relative;
  grid-column: 1 / -1;
}

.main-content.with-banner .products-wrapper {
  grid-column: 1 / 2;
}

.products-swiper {
  width: 100%;
  height: auto;
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
  width: 160px;
  height: 160px;
  border-radius: 50%;
  object-fit: contain;
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
  font-weight: 800;
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
  padding: 10px 20px;
  border-radius: 0;
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
  height: 40px;
}

.quick-action-btn:hover {
  background: linear-gradient(135deg, #1f2937 0%, #000000 100%);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
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
  width: 80%;
  margin-inline: auto;
  margin-top: auto;
  padding: 12px 18px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-shrink: 0;
  white-space: nowrap;
}

.add-to-cart-btn:hover {
  background: linear-gradient(135deg, #111827 0%, #000 100%);
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.promo-banner {
  position: relative;
  border-radius: 32px;
  border: 4px solid #dc2626;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: auto;
  height: 100%;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(220, 38, 38, 0.85) 100%);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 70% center;
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(220, 38, 38, 0.85) 100%);
  z-index: 1;
}

.banner-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px;
  text-align: center;
}

.banner-subtitle {
  font-size: 13px;
  font-weight: 600;
  color: #fce7f3;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 12px;
}

.banner-title {
  font-size: 42px;
  font-weight: 800;
  color: white;
  margin: 0 0 16px 0;
  line-height: 1.1;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

.banner-text {
  color: rgba(255, 255, 255, 0.95);
  margin: 0 0 28px 0;
  font-size: 17px;
  line-height: 1.6;
  max-width: 300px;
}

.banner-btn {
  background: white;
  color: #dc2626;
  border: none;
  padding: 14px 32px;
  border-radius: 50px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.banner-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.3);
  background: #fef2f2;
}

.dots-nav-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 0;
  margin-top: 24px;
  margin-bottom: 24px;
}

.dots-nav {
  display: flex;
  justify-content: center;
  gap: 12px;
  width: auto;
  margin: 0;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #e5e7eb;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot:hover {
  background-color: #9ca3af;
  transform: scale(1.2);
}

.dot.active {
  background-color: #2563eb;
  transform: scale(1.4);
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.15);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideFromLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideFromRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.swiper-nav-btn {
  position: absolute;
  top: 45%;
  transform: translateY(-50%);
  z-index: 10;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid #e5e7eb;
  background: white;
  color: #374151;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.swiper-nav-btn:hover:not(:disabled) {
  border-color: #dc2626;
  background: #dc2626;
  color: white;
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 8px 20px rgba(220, 38, 38, 0.3);
}

.swiper-nav-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.nav-prev {
  left: 0;
}

.nav-next {
  right: 0;
}

@media (max-width: 1200px) {
  .main-content.with-banner {
    grid-template-columns: 1fr 1fr;
  }
  .banner-title {
    font-size: 32px;
  }
}

@media (max-width: 1024px) {
  .main-content.with-banner {
    grid-template-columns: 1fr 1fr;
  }
  .banner-title {
    font-size: 28px;
  }
  .section-title {
    font-size: 28px;
  }
}

@media (max-width: 768px) {
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  .section-title {
    font-size: 24px;
  }
  .shop-all-btn {
    font-size: 13px;
    padding: 8px 18px;
  }
  .main-content.with-banner {
    grid-template-columns: 1fr;
  }
  .banner-content {
    padding: 24px;
  }
  .banner-title {
    font-size: 28px;
  }
  .product-image {
    width: 140px;
    height: 140px;
  }
  .product-image-container {
    padding: 16px;
  }
  .promo-banner {
    min-height: 300px;
  }
}

@media (max-width: 480px) {
  .product-image {
    width: 120px;
    height: 120px;
  }
  .product-image-container {
    min-height: 180px;
    padding: 12px;
  }
  .banner-title {
    font-size: 24px;
  }
  .banner-text {
    font-size: 15px;
  }
  .banner-content {
    padding: 16px;
  }
  .container {
    padding: 0 12px;
  }
  .promo-banner {
    border-radius: 24px;
    border-width: 3px;
  }
  .swiper-nav-btn {
    width: 56px;
    height: 56px;
  }
  .product-title {
    font-size: 14px;
    min-height: 40px;
  }
  .product-content {
    padding: 16px;
  }
  .new-price {
    font-size: 20px;
  }
  .old-price {
    font-size: 13px;
  }
  .add-to-cart-btn {
    width: 100%;
    font-size: 13px;
    padding: 10px 16px;
  }
  .image-selector {
    gap: 12px;
  }
  .image-btn {
    width: 44px;
    height: 44px;
  }
  .discount-badge {
    padding: 4px 10px;
    font-size: 12px;
  }
  .swiper-container-wrapper {
    padding: 0 40px;
  }
  .product-card {
    max-width: 280px;
    margin: 0 auto;
  }
}
</style>