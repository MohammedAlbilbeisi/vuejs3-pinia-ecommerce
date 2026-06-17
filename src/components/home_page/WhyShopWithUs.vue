<template>
  <section class="why-shop-section">
    <div class="background-decoration">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
      <div class="blob blob-3"></div>
    </div>
    
    <v-container>
      <v-row justify="center" class="mb-8">
        <v-col cols="12" class="text-center" data-aos="fade-up">
          <h2 class="section-title">
            <span class="highlight">Why</span> shop with us?
          </h2>
          <p class="section-subtitle">Experience shopping like never before</p>
        </v-col>
      </v-row>

      <v-row justify="center" align="stretch" class="feature-cards">
        <v-col
          v-for="(feature, index) in features"
          :key="index"
          cols="12"
          sm="6"
          md="3"
          data-aos="zoom-in"
          :data-aos-delay="index * 150"
        >
          <v-card class="feature-card" elevation="0" hover>
            <div class="card-content">
              <div class="icon-wrapper">
                <div class="icon-container" :style="{ background: feature.iconBg }">
                  <v-icon size="48">
                    {{ feature.icon }}
                  </v-icon>
                </div>
              </div>
              <h3 class="feature-title">{{ feature.title }}</h3>
              <p class="feature-description">{{ feature.description }}</p>
              <div class="divider"></div>
              <v-btn
                variant="text"
                class="learn-more-btn"
              >
                Learn more
                <v-icon size="16" class="ms-1">mdi-arrow-right</v-icon>
              </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const features = ref([
  {
    title: "Free Shipping",
    description: "Get free shipping on your first order and enjoy fast delivery worldwide.",
    icon: "mdi-truck-fast",
    iconBg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    title: "Weekly Flash Sale",
    description: "Don't miss our amazing weekly deals with discounts up to 70% off.",
    icon: "mdi-lightning-bolt",
    iconBg: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    title: "Secure Payment",
    description: "Shop with confidence using our 100% secure payment gateway.",
    icon: "mdi-shield-check",
    iconBg: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
  {
    title: "24/7 Support",
    description: "Our customer support team is always here to help you anytime.",
    icon: "mdi-headset",
    iconBg: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  },
]);
</script>

<style scoped>
.why-shop-section {
  background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
  padding: 100px 20px;
  position: relative;
  overflow: hidden;
}

.background-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
  animation: float 20s infinite ease-in-out;
}

.blob-1 {
  width: 400px;
  height: 400px;
  background: #667eea;
  top: -100px;
  left: -100px;
  animation-delay: 0s;
}

.blob-2 {
  width: 300px;
  height: 300px;
  background: #f5576c;
  bottom: -50px;
  right: 10%;
  animation-delay: 5s;
}

.blob-3 {
  width: 250px;
  height: 250px;
  background: #43e97b;
  top: 50%;
  right: -50px;
  animation-delay: 10s;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -30px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

.section-title {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 48px;
  font-weight: 900;
  color: white;
  margin: 0 0 10px 0;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.highlight {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-subtitle {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 50px 0;
}

.feature-cards {
  margin-top: 20px;
}

.feature-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.feature-card:hover {
  transform: translateY(-10px);
  background: rgba(255, 255, 255, 0.12);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.card-content {
  padding: 40px 25px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.icon-wrapper {
  margin-bottom: 25px;
  display: flex;
  justify-content: center;
  flex-shrink: 0;
}

.icon-container {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.feature-card:hover .icon-container {
  transform: scale(1.1) rotate(5deg);
}

.feature-title {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: white;
  margin: 0 0 15px 0;
  line-height: 1.3;
  flex-shrink: 0;
}

.feature-description {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 15px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 25px 0;
  line-height: 1.7;
  flex-grow: 1;
  display: flex;
  align-items: center;
}

.divider {
  width: 50px;
  height: 3px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  margin: 0 auto 25px;
  border-radius: 3px;
  flex-shrink: 0;
}

.learn-more-btn {
  font-weight: 600;
  text-transform: none;
  color: white;
  padding: 0;
  font-size: 15px;
  transition: all 0.3s ease;
}

.learn-more-btn:hover {
  color: #667eea;
  transform: translateX(5px);
}

@media (max-width: 768px) {
  .why-shop-section {
    padding: 60px 20px;
  }
  
  .section-title {
    font-size: 32px;
  }
  
  .icon-container {
    width: 80px;
    height: 80px;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 24px;
  }
  
  .card-content {
    padding: 30px 20px;
  }
}
</style>