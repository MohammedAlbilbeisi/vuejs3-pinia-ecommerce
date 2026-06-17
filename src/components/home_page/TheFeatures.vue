<template>
  <div class="the-features">
    <v-container fluid>
      <v-row align="center" justify="center" no-gutters class="features">
        <v-col cols="12" md="4" class="text-center feature-item">
          <div class="parent d-flex align-center justify-center">
            <font-awesome-icon :icon="['fas', 'truck']" class="feature-icon" />
            <span class="feature-text">Free Shipping & Returns</span>
          </div>
        </v-col>
        <v-col cols="12" md="4" class="text-center feature-item second">
          <div class="parent d-flex align-center justify-center">
            <font-awesome-icon :icon="['fas', 'award']" class="feature-icon"   />
            <span class="feature-text">Lowest Price Guarantee</span>
          </div>
        </v-col>
        <v-col cols="12" md="4" class="text-center feature-item">
          <div class="parent d-flex align-center justify-center">
            <font-awesome-icon :icon="['fas', 'trophy']" class="feature-icon" />
            <span class="feature-text">Longest Warranties Offer</span>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
// No logic needed for this component
</script>

<style lang="scss">
.the-features {
  background-color: white;
  padding: 24px 0;
}
.features {
  align-items: stretch;
}
.feature-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.second {
  position: relative;
  
  &::before {
    content: "";
    position: absolute;
    background-color: rgb(99, 99, 99);
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 1px;
    height: 70%;
  }
  
  &::after {
    content: "";
    position: absolute;
    background-color: rgb(99, 99, 99);
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 1px;
    height: 70%;
  }
}
.parent {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  font-size: 15px;
  color: #1a1a2e;
}
.feature-icon {
  font-size: 22px;
}
.feature-text {
  font-weight: 500;
}

/* Responsive adjustments for small screens */
@media (max-width: 640px) {
  .the-features {
    padding: 16px 0;
  }
  
  .feature-item {
    margin-bottom: 20px;
  }
  
  .feature-item:last-child {
    margin-bottom: 0;
  }
  
  .parent {
    gap: 8px;
    font-size: 13px;
  }
  
  .feature-icon {
    font-size: 18px;
  }
  
  .second::before,
  .second::after {
    display: none;
  }
}
</style>