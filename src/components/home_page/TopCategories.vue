<template>
  <div class="top_cat pt-13">
    <div class="cyber-banner">
      <div class="geometric-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
        <div class="shape shape-4"></div>
        <div class="shape shape-5"></div>
        <div class="shape shape-6"></div>
        <div class="shape shape-7"></div>
        <div class="shape shape-8"></div>
      </div>
      <div class="banner-content">
        <h2>Discover <span class="highlight">Amazing Products</span></h2>
        <p class="subtitle">Explore our exclusive collection of premium items</p>
        <button class="shop-now-btn" @click="goToAllProducts">Shop Now</button>
      </div>
    </div>
    <div class="categories pt-13">
      <div class="container" style="max-width: 1280px; margin: 0 auto;">
        <div class="section-header mb-8">
          <div class="title-wrapper">
            <div class="title-indicator"></div>
            <h2 class="section-title">
              Top Categories
            </h2>
          </div>
        </div>
        <div class="categories-grid">
          <div 
            class="category-item" 
            v-for="(cat, index) in categories" 
            :key="cat.title"
            :data-aos-delay="index * 50"
            data-aos="zoom-in"
            @click="goToCategory(cat.route)"
          >
            <div class="img-wrapper" @mouseenter="cat.isHovered = true" @mouseleave="cat.isHovered = false">
              <div class="img-container" :class="{ 'hovered': cat.isHovered }">
                <img :src="cat.image" alt="" class="category-img" loading="lazy" />
                <div class="overlay" :class="{ 'hovered': cat.isHovered }"></div>
              </div>
            </div>
            <p class="category-title">{{ cat.title }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const categories = ref([
  {
    title: "Mobile Phones",
    image: "https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1",
    isHovered: false,
    route: "smartphones"
  },
  {
    title: "Laptops & Tablets",
    image: "https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1",
    isHovered: false,
    route: "laptops"
  },
  {
    title: "Televisions",
    image: "https://images.pexels.com/photos/693859/pexels-photo-693859.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1",
    isHovered: false,
    route: "laptops"
  },
  {
    title: "PCs & Accessories",
    image: "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1",
    isHovered: false,
    route: "laptops"
  },
  {
    title: "Audio & Video",
    image: "https://images.pexels.com/photos/3394664/pexels-photo-3394664.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1",
    isHovered: false,
    route: "audio"
  },
  {
    title: "Gaming & Accessories",
    image: "https://images.pexels.com/photos/1174746/pexels-photo-1174746.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1",
    isHovered: false,
    route: "gaming"
  },
  {
    title: "Home Furniture",
    image: "https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1",
    isHovered: false,
    route: "furniture"
  },
  {
    title: "Kitchen Appliances",
    image: "https://images.pexels.com/photos/3951628/pexels-photo-3951628.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1",
    isHovered: false,
    route: "furniture"
  },
  {
    title: "Cameras",
    image: "https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1",
    isHovered: false,
    route: "smartphones"
  },
  {
    title: "Groceries",
    image: "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1",
    isHovered: false,
    route: "groceries"
  },
  {
    title: "Smart Home",
    image: "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1",
    isHovered: false,
    route: "smartphones"
  },
  {
    title: "Accessories",
    image: "https://images.pexels.com/photos/2783869/pexels-photo-2783869.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1",
    isHovered: false,
    route: "laptops"
  }
]);

const goToCategory = (route) => {
  router.push({ name: 'products_category', params: { category: route } });
};

const goToAllProducts = () => {
  router.push({ name: 'products_category', params: { category: 'smartphones' } });
};
</script>

<style scoped>
.top_cat {
  padding-bottom: 40px;
}

.cyber-banner {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  padding: 60px 20px;
  margin-bottom: 40px;
  position: relative;
  overflow: hidden;
}

.geometric-shapes {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.shape {
  position: absolute;
}

.shape-1 {
  top: 20%;
  left: 5%;
  width: 30px;
  height: 30px;
  background: #ff4757;
  border-radius: 50%;
  animation: float 6s ease-in-out infinite;
}

.shape-2 {
  top: 15%;
  left: 15%;
  width: 0;
  height: 0;
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
  border-bottom: 45px solid #3498db;
  transform: rotate(45deg);
  animation: float 7s ease-in-out infinite 0.5s;
}

.shape-3 {
  top: 70%;
  left: 8%;
  width: 60px;
  height: 60px;
  background: linear-gradient(45deg, transparent 50%, #2ed573 50%);
  animation: float 5s ease-in-out infinite 1s;
}

.shape-4 {
  top: 60%;
  left: 90%;
  width: 40px;
  height: 40px;
  background: #ffa502;
  border-radius: 50%;
  animation: float 8s ease-in-out infinite 1.5s;
}

.shape-5 {
  top: 30%;
  left: 85%;
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-bottom: 35px solid #ff6b81;
  transform: rotate(-30deg);
  animation: float 6s ease-in-out infinite 2s;
}

.shape-6 {
  top: 80%;
  left: 25%;
  width: 20px;
  height: 20px;
  background: #7bed9f;
  border-radius: 50%;
  animation: float 5.5s ease-in-out infinite 2.5s;
}

.shape-7 {
  top: 25%;
  left: 70%;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, transparent 50%, #70a1ff 50%);
  animation: float 7.5s ease-in-out infinite 3s;
}

.shape-8 {
  top: 75%;
  left: 75%;
  width: 25px;
  height: 25px;
  background: #dfe4ea;
  border-radius: 50%;
  animation: float 6.5s ease-in-out infinite 3.5s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.8;
  }
  50% {
    transform: translateY(-20px) rotate(10deg);
    opacity: 1;
  }
}

.banner-content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: white;
}

.banner-content h2 {
  font-size: 42px;
  font-weight: 800;
  margin: 0 0 15px 0;
  text-shadow: 0 2px 10px rgba(0,0,0,0.3);
}

.highlight {
  color: #00d2d3;
}

.subtitle {
  font-size: 18px;
  color: rgba(255,255,255,0.9);
  margin-bottom: 25px;
}

.shop-now-btn {
  background: linear-gradient(135deg, #ff4757 0%, #ff6b81 100%);
  color: white;
  border: none;
  padding: 14px 45px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255,71,87,0.4);
}

.shop-now-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(255,71,87,0.5);
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
  padding: 0 20px;
}

.category-item {
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.category-item:hover {
  transform: translateY(-5px);
}

.img-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  cursor: pointer;
}

.img-container {
  position: relative;
  overflow: hidden;
  border-radius: 50%;
  width: 170px;
  height: 170px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.img-container.hovered {
  transform: scale(1.1) rotate(2deg);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2), 0 0 0 4px rgba(220, 38, 38, 0.3);
}

.category-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.img-container.hovered .category-img {
  transform: scale(1.2);
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle, transparent 60%, rgba(220, 38, 38, 0.2) 100%);
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.overlay.hovered {
  opacity: 1;
}

.category-title {
  margin-top: 10px;
  font-size: 14px;
  color: #333;
  font-weight: 500;
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
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
}

.section-title {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 32px;
  font-weight: 800;
  margin: 0;
  letter-spacing: -0.5px;
  color: #1a1a2e;
}

.shop-all-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 15px;
  font-weight: 600;
  background: transparent;
  border: 2px solid #dc2626;
  color: #dc2626;
  padding: 10px 24px;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.shop-all-btn:hover {
  background-color: rgba(220, 38, 38, 0.1);
  color: #1a1a1a;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.shop-all-btn svg {
  transition: transform 0.3s ease;
}

.shop-all-btn:hover svg {
  transform: translateX(4px);
}

.pt-13 {
  padding-top: 13px;
}

@media (max-width: 1200px) {
  .img-container {
    width: 140px;
    height: 140px;
  }
}

@media (max-width: 1024px) {
  .categories-grid {
    grid-template-columns: repeat(4, 1fr);
  }
  .img-container {
    width: 130px;
    height: 130px;
  }
}

@media (max-width: 768px) {
  .categories-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .banner-content h2 {
    font-size: 32px;
  }
  
  .img-container {
    width: 120px;
    height: 120px;
  }
}

@media (max-width: 480px) {
  .categories-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .banner-content h2 {
    font-size: 24px;
  }
  
  .subtitle {
    font-size: 16px;
  }
  
  .shop-now-btn {
    padding: 12px 35px;
    font-size: 15px;
  }
  
  .img-container {
    width: 110px;
    height: 110px;
  }
}
</style>
