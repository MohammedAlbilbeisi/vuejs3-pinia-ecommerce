<template>
  <div class="quality-features">
    <div class="container">
      <div class="cards-container">
          <div 
            v-for="(card, index) in cards" 
            :key="index" 
            class="feature-card" 
            @mouseenter="hoverIndex = index" 
            @mouseleave="hoverIndex = -1"
            data-aos="fade-up"
            :data-aos-delay="index * 100"
          >
            <font-awesome-icon :icon="card.icon" class="icon" :class="{ 'hovered': hoverIndex === index }" />
            <h3 class="title">{{ card.title }}</h3>
            <p class="desc">{{ card.desc }}</p>
          </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const hoverIndex = ref(-1);
const cards = ref([
  {
    title: "QUALITY AND SAVING",
    desc: "Comprehensive quality control and affordable prices",
    icon: "medal"
  },
  {
    title: "GLOBAL WAREHOUSE",
    desc: "27 overseas warehouses",
    icon: "warehouse"
  },
  {
    title: "FAST SHIPPING",
    desc: "Fast and convenient door to door delivery",
    icon: "truck-fast"
  },
  {
    title: "PAYMENT SECURITY",
    desc: "More than 10 different secure payment methods",
    icon: "shield-halved"
  },
  {
    title: "HAVE QUESTIONS?",
    desc: "24/7 Customer service - We're here and happy to help",
    icon: "headset"
  }
]);
</script>

<style scoped>
.quality-features {
  background-color: #f0f0f0;
  padding: 32px 0;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
}

.feature-card {
  background-color: white;
  padding: 48px 24px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.feature-card:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  transform: translateY(-4px);
}

.icon {
  font-size: 50px;
  display: inline-block;
  margin-bottom: 24px;
  color: #8e44ad;
  transition: color 0.3s ease;
  flex-shrink: 0;
}

.icon.hovered {
  color: #9b59b6;
}

.title {
  font-family: 'Arial', sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: #2d2d2d;
  text-transform: uppercase;
  margin-bottom: 12px;
  line-height: 1.3;
  flex-shrink: 0;
}

.desc {
  font-family: 'Arial', sans-serif;
  font-size: 16px;
  color: #555;
  line-height: 1.6;
  margin: 0;
  flex-grow: 1;
  display: flex;
  align-items: center;
}

@media (max-width: 1200px) {
  .cards-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .cards-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .cards-container {
    grid-template-columns: 1fr;
  }
}
</style>