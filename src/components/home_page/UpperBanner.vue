<template>
  <div class="banner">
    <div class="parent">
      <div class="cont">
        <h2><span>New Collection</span> for Girls</h2>
        <p class="hint">Up to 50% off on all fashion items*</p>
        <button class="shop-btn">
          Shop Now
        </button>
      </div>
      <div class="fashion-image">
        <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800" alt="Shopping Girl" />
      </div>
    </div>
  </div>
</template>

<script setup>
// No logic needed for this component
</script>

<style scoped>
.banner {
  width: 100%;
}

.parent {
  min-height: 390px;
  background: linear-gradient(90deg, #3a2bd8 0%, #7a29d5 100%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px 80px;
  flex-wrap: wrap;
}

.cont {
  color: white;
  flex: 1;
  padding-right: 40px;
  min-width: 300px;
}

.cont h2 {
  font-size: 58px;
  font-weight: 800;
  line-height: 1.1;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
}

.cont h2 span {
  color: #fff5ee;
  display: inline;
}

.cont .hint {
  margin: 25px 0 35px;
  font-size: 20px;
  color: rgba(255,255,255,0.95);
  text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
}

.shop-btn {
  background-color: transparent;
  color: white;
  border: 2px solid white;
  border-radius: 30px;
  padding: 15px 45px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.shop-btn:hover {
  background-color: white;
  color: #3a2bd8;
}

.fashion-image {
  width: 50%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  min-width: 300px;
}

.fashion-image img {
  width: 100%;
  max-height: 350px;
  border-radius: 10px;
  box-shadow: 0 25px 50px rgba(0,0,0,0.2);
  object-fit: cover;
}

@media (max-width: 1024px) {
  .parent {
    padding: 30px 40px;
  }
  .cont h2 {
    font-size: 42px;
  }
  .cont .hint {
    font-size: 18px;
  }
}

@media (max-width: 768px) {
  .parent {
    flex-direction: column;
    padding: 30px 20px;
    text-align: center;
  }
  .cont {
    padding-right: 0;
    margin-bottom: 30px;
  }
  .cont h2 {
    font-size: 36px;
  }
  .fashion-image {
    width: 100%;
    justify-content: center;
  }
  .fashion-image img {
    max-height: 300px;
  }
}

@media (max-width: 480px) {
  .cont h2 {
    font-size: 28px;
  }
  .cont .hint {
    font-size: 16px;
  }
  .shop-btn {
    padding: 12px 35px;
    font-size: 16px;
  }
}
</style>