<template>
  <div class="loading-container">
    <div class="loading-spinner">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
      <div class="circle circle-3"></div>
      <div class="circle circle-4"></div>
    </div>
    <p class="loading-text" v-if="text">{{ text }}</p>
  </div>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    default: "Loading..."
  }
});
</script>

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  gap: 16px;
}

.loading-spinner {
  width: 80px;
  height: 80px;
  position: relative;
  animation: rotate 1.5s linear infinite;
}

.circle {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  box-sizing: border-box;
}

.circle-1 {
  border: 4px solid transparent;
  border-top-color: #3a2bd8;
  animation: pulse 1.2s ease-in-out infinite;
}

.circle-2 {
  border: 4px solid transparent;
  border-right-color: #7a29d5;
  animation: pulse 1.2s ease-in-out infinite;
  animation-delay: 0.15s;
}

.circle-3 {
  border: 4px solid transparent;
  border-bottom-color: #ffb547;
  animation: pulse 1.2s ease-in-out infinite;
  animation-delay: 0.3s;
}

.circle-4 {
  border: 4px solid transparent;
  border-left-color: #00b4d8;
  animation: pulse 1.2s ease-in-out infinite;
  animation-delay: 0.45s;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}

.loading-text {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: #374151;
}
</style>