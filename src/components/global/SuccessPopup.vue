<template>
  <TransitionRoot appear :show="show">
    <div class="popup-overlay" @click="close">
      <TransitionChild
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="popup-backdrop"></div>
      </TransitionChild>
      <div class="popup-container">
        <TransitionChild
          enter="ease-out duration-300"
          enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 scale-100"
          leave-to="opacity-0 scale-95"
        >
          <div class="popup-card" @click.stop>
            <div class="decorative-top"></div>
            <div class="success-icon-container">
              <svg class="success-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h2 class="popup-title">Order Placed Successfully!</h2>
            <p class="popup-message">Thank you for shopping with us! We'll send you a confirmation email shortly.</p>
            
            <!-- Progress Bar -->
            <div class="progress-container">
              <div class="progress-bar" :style="{ width: progress + '%' }"></div>
            </div>
            <p class="progress-text">Redirecting to home page...</p>
            
            <button class="popup-button" @click="close">Continue Shopping</button>
          </div>
        </TransitionChild>
      </div>
    </div>
  </TransitionRoot>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue';
import { TransitionRoot, TransitionChild } from '@headlessui/vue';

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['close']);

const progress = ref(0);
let timer = null;

const close = () => {
  clearTimer();
  emit('close');
};

const startProgress = () => {
  clearTimer();
  progress.value = 0;
  const duration = 2000; // 2 seconds (faster!)
  const increment = 100 / (duration / 50);
  
  timer = setInterval(() => {
    progress.value += increment;
    if (progress.value >= 100) {
      close();
    }
  }, 50);
};

const clearTimer = () => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
};

watch(() => props.show, (newVal) => {
  if (newVal) {
    startProgress();
  } else {
    clearTimer();
    progress.value = 0;
  }
});

onUnmounted(() => {
  clearTimer();
});
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup-backdrop {
  position: fixed;
  inset: 0;
  background: linear-gradient(135deg, rgba(58, 43, 216, 0.8) 0%, rgba(122, 41, 213, 0.8) 100%);
  backdrop-filter: blur(8px);
}

.popup-container {
  position: relative;
  z-index: 1;
  max-width: 420px;
  width: 90%;
}

.popup-card {
  background: white;
  border-radius: 24px;
  padding: 0 32px 40px 32px;
  text-align: center;
  box-shadow: 0 25px 70px rgba(0, 0, 0, 0.35);
  animation: popIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  overflow: hidden;
  position: relative;
}

@keyframes popIn {
  from {
    transform: scale(0.75);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.decorative-top {
  height: 8px;
  width: 100%;
  background: linear-gradient(90deg, #3a2bd8 0%, #7a29d5 50%, #ffb547 100%);
  margin: 0 -32px 40px -32px;
}

.success-icon-container {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3a2bd8 0%, #7a29d5 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 28px;
  animation: bounceIn 0.6s ease-out 0.1s backwards;
  box-shadow: 0 12px 35px rgba(58, 43, 216, 0.4);
}

@keyframes bounceIn {
  0% {
    transform: scale(0) rotate(-180deg);
  }
  50% {
    transform: scale(1.15) rotate(10deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
}

.success-icon {
  width: 50px;
  height: 50px;
  color: white;
  stroke-width: 3;
  animation: checkmark 0.4s ease-out 0.5s backwards;
}

@keyframes checkmark {
  from {
    stroke-dashoffset: 100;
    opacity: 0;
  }
  to {
    stroke-dashoffset: 0;
    opacity: 1;
  }
}

.popup-title {
  font-size: 28px;
  font-weight: 900;
  background: linear-gradient(135deg, #3a2bd8 0%, #7a29d5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 14px;
}

.popup-message {
  font-size: 16px;
  color: #4b5563;
  line-height: 1.7;
  margin: 0 0 24px;
}

.progress-container {
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 50px;
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #3a2bd8 0%, #7a29d5 50%, #ffb547 100%);
  transition: width 0.05s linear;
}

.progress-text {
  font-size: 14px;
  color: #6b7280;
  margin: 0 0 32px;
}

.popup-button {
  width: 100%;
  padding: 16px 32px;
  border: none;
  border-radius: 50px;
  background: linear-gradient(135deg, #3a2bd8 0%, #7a29d5 100%);
  color: white;
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 6px 20px rgba(58, 43, 216, 0.5);
}

.popup-button:hover {
  background: linear-gradient(135deg, #2d1fbf 0%, #631faa 100%);
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(58, 43, 216, 0.6);
}

.popup-button:active {
  transform: translateY(0);
  box-shadow: 0 4px 12px rgba(58, 43, 216, 0.4);
}
</style>