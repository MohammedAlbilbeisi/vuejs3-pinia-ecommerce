<template>
  <div class="top-offers bg-grey-lighten-4 pt-9">
    <v-container fluid class="px-4">
      <v-row class="gx-4">
        <!-- First Offer: Smartphones -->
        <v-col cols="12" sm="6" lg="4" class="py-0 pr-0 pr-sm-4 mb-4 mb-lg-0" style="height: 260px">
          <v-hover v-slot="{ isHovering, props }">
            <div
              class="parent"
              v-bind="props"
              style="overflow: hidden; height: 100%; position: relative; border-radius: 12px;"
            >
              <img
                src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=400&fit=crop"
                :style="{
                  width: '100%',
                  height: '100%',
                  cursor: 'pointer',
                  transition: '0.5s all',
                  transform: isHovering ? 'scale(1.05)' : 'scale(1)',
                  objectFit: 'cover'
                }"
                alt="Smartphones"
                @click="goToCategory('smartphones')"
              />
              <div class="offer-badge">30% OFF 📱</div>
              <div class="offer-overlay">
                <h3 class="offer-title">Smartphones Up to 30% Off</h3>
                <p class="offer-text">Get the latest devices at unbeatable prices! Limited stock available.</p>
                <button class="offer-btn" @click="goToCategory('smartphones')">Shop Smartphones</button>
              </div>
            </div>
          </v-hover>
        </v-col>
        
        <!-- Second Offer: Laptops -->
        <v-col cols="12" sm="6" lg="4" class="py-0 pr-0 pr-sm-4 mb-4 mb-lg-0" style="height: 260px">
          <v-hover v-slot="{ isHovering, props }">
            <div
              class="parent"
              v-bind="props"
              style="overflow: hidden; height: 100%; position: relative; border-radius: 12px;"
            >
              <img
                src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=400&fit=crop"
                :style="{
                  width: '100%',
                  height: '100%',
                  cursor: 'pointer',
                  transition: '0.5s all',
                  transform: isHovering ? 'scale(1.05)' : 'scale(1)',
                  objectFit: 'cover'
                }"
                alt="Laptops"
                @click="goToCategory('laptops')"
              />
              <div class="offer-badge">$200 OFF 💻</div>
              <div class="offer-overlay">
                <h3 class="offer-title">Laptops - Save $200 Today</h3>
                <p class="offer-text">Powerful laptops for work and gaming with free shipping included!</p>
                <button class="offer-btn" @click="goToCategory('laptops')">Explore Laptops</button>
              </div>
            </div>
          </v-hover>
        </v-col>
        
        <!-- Third Offer: Audio -->
        <v-col cols="12" sm="6" lg="4" class="py-0 pr-0 pr-sm-0 mb-4 mb-lg-0" style="height: 260px">
          <v-hover v-slot="{ isHovering, props }">
            <div
              class="parent"
              v-bind="props"
              style="overflow: hidden; height: 100%; position: relative; border-radius: 12px;"
            >
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=400&fit=crop"
                :style="{
                  width: '100%',
                  height: '100%',
                  cursor: 'pointer',
                  transition: '0.5s all',
                  transform: isHovering ? 'scale(1.05)' : 'scale(1)',
                  objectFit: 'cover'
                }"
                alt="Audio"
                @click="goToCategory('audio')"
              />
              <div class="offer-badge red">40% OFF 🎧</div>
              <div class="offer-overlay">
                <h3 class="offer-title">Premium Wireless Headphones</h3>
                <p class="offer-text">Experience crystal-clear sound at an amazing price - don't miss out!</p>
                <button class="offer-btn" @click="goToCategory('audio')">Buy Now</button>
              </div>
            </div>
          </v-hover>
        </v-col>
      </v-row>
      
      <v-row class="mt-9 gx-4">
        <!-- Fourth Offer: Furniture -->
        <v-col cols="12" lg="6" class="mt-3 pr-0 pr-lg-4 py-0 mb-4 mb-lg-0">
          <v-hover v-slot="{ isHovering, props }">
            <div
              class="parent"
              v-bind="props"
              style="overflow: hidden; height: 100%; position: relative; border-radius: 12px;"
            >
              <img
                src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&h=400&fit=crop"
                :style="{
                  width: '100%',
                  height: '100%',
                  cursor: 'pointer',
                  transition: '0.5s all',
                  transform: isHovering ? 'scale(1.05)' : 'scale(1)',
                  objectFit: 'cover'
                }"
                alt="Furniture"
                @click="goToCategory('furniture')"
              />
              <div class="offer-badge">50% OFF 🛋️</div>
              <div class="offer-overlay">
                <h3 class="offer-title">Furniture - 50% Off Everything</h3>
                <p class="offer-text">Transform your living space with stylish furniture at half the price!</p>
                <button class="offer-btn" @click="goToCategory('furniture')">Shop Furniture</button>
              </div>
            </div>
          </v-hover>
        </v-col>
        
        <!-- Fifth Offer: Gaming -->
        <v-col cols="12" lg="6" class="mt-3 pl-0 pl-lg-4 py-0">
          <v-hover v-slot="{ isHovering, props }">
            <div
              class="parent"
              v-bind="props"
              style="overflow: hidden; height: 100%; position: relative; border-radius: 12px;"
            >
              <img
                src="https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800&h=400&fit=crop"
                :style="{
                  width: '100%',
                  height: '100%',
                  cursor: 'pointer',
                  transition: '0.5s all',
                  transform: isHovering ? 'scale(1.05)' : 'scale(1)',
                  objectFit: 'cover'
                }"
                alt="Gaming"
                @click="goToCategory('gaming')"
              />
              <div class="offer-badge purple">35% OFF 🎮</div>
              <div class="offer-overlay">
                <h3 class="offer-title">Gaming Gear - 35% Off</h3>
                <p class="offer-text">Level up your gaming experience with premium accessories!</p>
                <button class="offer-btn white" @click="goToCategory('gaming')">Shop Games</button>
              </div>
            </div>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToCategory = (category) => {
  router.push({ name: 'products_category', params: { category } });
};
</script>

<style scoped>
.offer-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px 24px;
  background: linear-gradient(to top, rgba(0,0,0,0.85), transparent);
  color: white;
}

.offer-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  background: linear-gradient(135deg, #3a2bd8 0%, #7a29d5 100%);
  color: white;
  padding: 8px 20px;
  border-radius: 8px;
  font-weight: 800;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
  z-index: 10;
}

.offer-badge.red {
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
}

.offer-badge.purple {
  background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%);
}

.offer-title {
  font-size: 20px;
  font-weight: 800;
  margin: 0 0 6px 0;
  line-height: 1.3;
}

.offer-text {
  font-size: 14px;
  margin: 0 0 12px 0;
  opacity: 0.95;
  line-height: 1.5;
}

.offer-btn {
  background: white;
  color: #1a1a2e;
  border: none;
  padding: 8px 20px;
  border-radius: 50px;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.offer-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.3);
}

.offer-btn.white {
  background: white;
  color: #1a1a2e;
}

.pt-9 {
  padding-top: 2.25rem;
}

.mt-9 {
  margin-top: 2.25rem;
}
</style>