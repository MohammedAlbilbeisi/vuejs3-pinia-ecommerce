<template>
  <footer class="app-footer">
    <!-- Newsletter Section (Full Width) -->
    <div class="newsletter-section py-8">
      <v-container class="px-0">
        <v-row justify="center">
          <v-col cols="12" md="8" lg="6" class="text-center">
            <h2 class="newsletter-title">SUBSCRIBE TO OUR NEWSLETTER</h2>
            <p class="newsletter-subtitle">Get the latest updates on new products and upcoming sales</p>
            <form class="newsletter-form" @submit.prevent="subscribe">
              <input
                v-model="email"
                placeholder="enter your email address"
                class="newsletter-input"
                type="email"
              >
              <v-btn type="submit" color="deep-purple-darken-4" class="newsletter-btn" size="large">
                Submit
              </v-btn>
            </form>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- Footer Links Section -->
    <div class="footer-links-section py-8">
      <v-container class="px-0">
        <v-row justify="start">
          <!-- Shop Column -->
          <v-col cols="12" sm="6" md="3" class="text-left">
            <h3 class="footer-column-title">SHOP</h3>
            <ul class="footer-links-list">
              <li v-for="category in categories" :key="category.route">
                <router-link :to="{ name: 'products_category', params: { category: category.route } }"   class="footer-link">
                  {{ category.title }}
                </router-link>
              </li>
            </ul>
          </v-col>

          <!-- Further Info Column -->
          <v-col cols="12" sm="6" md="3" class="text-left">
            <h3 class="footer-column-title">FURTHER INFO.</h3>
            <ul class="footer-links-list">
              <li><a href="#" class="footer-link">About</a></li>
              <li><a href="#" class="footer-link">Customer Service</a></li>
              <li><a href="#" class="footer-link">Reward Program</a></li>
              <li><a href="#" class="footer-link">Shipping & Returns</a></li>
              <li><a href="#" class="footer-link">Privacy Policy</a></li>
              <li><a href="#" class="footer-link">Terms & Conditions</a></li>
              <li><a href="#" class="footer-link">Blog</a></li>
            </ul>
          </v-col>

          <!-- Customer Service Column -->
          <v-col cols="12" sm="6" md="3" class="text-left">
            <h3 class="footer-column-title">CUSTOMER SERVICE</h3>
            <ul class="footer-links-list">
              <li><a href="#" class="footer-link">Search Terms</a></li>
              <li><a href="#" class="footer-link">Advanced Search</a></li>
              <li><a href="#" class="footer-link">Orders And Returns</a></li>
              <li><a href="#" class="footer-link">Contact Us</a></li>
              <li><a href="#" class="footer-link">Theme FAQs</a></li>
              <li><a href="#" class="footer-link">Consultant</a></li>
              <li><a href="#" class="footer-link">Store Locations</a></li>
            </ul>
          </v-col>

          <!-- Contact & Social Column -->
          <v-col cols="12" sm="6" md="3" class="text-left">
            <router-link :to="{ name: 'home' }" class="brand-logo" style="text-decoration: none;">ellamart+</router-link>
            <ul class="contact-list">
              <li class="contact-item">
                <font-awesome-icon icon="fa-solid fa-map-marker-alt" style="color: #999;"/>
                <span>685 Market Street<br>San Francisco, CA 94105, US</span>
              </li>
              <li class="contact-item">
                <font-awesome-icon icon="fa-solid fa-phone" style="color: #999;"/>
                <span>Call us at <a href="tel:+14155555555" class="contact-link">(415) 555-5555</a></span>
              </li>
              <li class="contact-item">
                <font-awesome-icon icon="fa-solid fa-envelope" style="color: #999;"/>
                <span><a href="mailto:example@domain.com" class="contact-link">example@domain.com</a></span>
              </li>
            </ul>

            <div class="social-icons-container">
              <a href="#" class="social-icon facebook">
                <font-awesome-icon icon="fa-brands fa-facebook" />
              </a>
              <a href="#" class="social-icon instagram">
                <font-awesome-icon icon="fa-brands fa-instagram" />
              </a>
              <a href="#" class="social-icon pinterest">
                <font-awesome-icon icon="fa-brands fa-pinterest" />
              </a>
              <a href="#" class="social-icon whatsapp">
                <font-awesome-icon icon="fa-brands fa-whatsapp" />
              </a>
              <a href="#" class="social-icon twitter">
                <font-awesome-icon icon="fa-brands fa-twitter" />
              </a>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- Payment Logos Section (Full Width Background) -->
    <div class="payment-logos-section py-4">
      <v-container class="px-0">
        <v-row justify="center">
          <v-col cols="auto" class="d-flex align-items-center gap-8 flex-wrap justify-center">
            <div class="payment-icon-container">
              <font-awesome-icon icon="fa-brands fa-cc-visa" class="payment-icon" />
            </div>
            <div class="payment-icon-container">
              <font-awesome-icon icon="fa-brands fa-cc-mastercard" class="payment-icon" />
            </div>
            <div class="payment-icon-container">
              <font-awesome-icon icon="fa-brands fa-paypal" class="payment-icon" />
            </div>
            <div class="payment-icon-container">
              <font-awesome-icon icon="fa-brands fa-apple-pay" class="payment-icon" />
            </div>
            <div class="payment-icon-container">
              <font-awesome-icon icon="fa-brands fa-cc-amex" class="payment-icon" />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- Copyright Section (Full Width Background) -->
    <div class="copyright-section py-3">
      <v-container class="px-0">
        <v-row justify="center">
          <v-col cols="12" class="text-center">
            <p class="copyright-text">© 2026 Ella Store. All rights reserved.</p>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </footer>
</template>

 <script setup>
import { ref } from 'vue';

const email = ref("");
const errorMessage = ref("");

 const categories = [
  { title: "Smart Phones", route: "smartphones" },
  { title: "Laptops", route: "laptops" },
  { title: "Furniture", route: "furniture" },
  { title: "Men's Shoes", route: "mens-shoes" },
  { title: "Men's Watches", route: "mens-watches" },
  { title: "Women's Bags", route: "womens-bags" },
  { title: "Motorcycle", route: "motorcycle" }
];

const subscribe = () => {
   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email.value) {
    errorMessage.value = "Please enter your email.";
    return;
  }
  
  if (!emailPattern.test(email.value)) {
    errorMessage.value = "Please enter a valid email address.";
    return;
  }

   
  errorMessage.value = "";
  console.log(`Subscribed: ${email.value}`);
  alert("Thank you for subscribing!");
  email.value = "";
};
</script>

<style scoped>
.app-footer {
  background-color: #f5f5f5;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Container Style to match other sections */
.app-footer :deep(.v-container) {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Newsletter Section */
.newsletter-section {
  background-color: #f5f5f5;
}

.newsletter-title {
  font-size: 24px;
  font-weight: 800;
  color: #1a1a2e;
  margin: 0 0 8px 0;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.newsletter-subtitle {
  font-size: 14px;
  color: #666;
  margin: 0 0 25px 0;
}

.newsletter-form {
  display: flex;
  gap: 16px;
  max-width: 600px;
  margin: 0 auto;
  flex-wrap: wrap;
  justify-content: center;
}

.newsletter-input {
  flex: 1;
  min-width: 300px;
  padding: 16px 24px;
  border-radius: 9999px;
  border: 2px solid #e0e0e0;
  background-color: white;
  font-size: 14px;
  outline: none;
  transition: all 0.2s ease;
}

.newsletter-input:focus {
  border-color: #4c1d95;
  box-shadow: 0 0 0 4px rgba(76, 29, 149, 0.15);
}

.newsletter-btn {
  border-radius: 9999px;
  padding: 0 45px;
  font-weight: 600;
  text-transform: uppercase;
  box-shadow: 0 4px 15px rgba(49, 27, 146, 0.3);
  transition: all 0.3s ease;
}

.newsletter-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(49, 27, 146, 0.4);
}

/* Footer Links Section */
.footer-links-section {
  background-color: #f5f5f5;
}

.footer-column-title {
  font-size: 16px;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 20px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.footer-links-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links-list li {
  margin-bottom: 12px;
}

.footer-link {
  color: #666;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: #dc2626;
}

.brand-logo {
  font-size: 32px;
  font-weight: 900;
  color: #1a1a2e;
  margin-bottom: 24px;
  letter-spacing: -1px;
}

.contact-list {
  list-style: none;
  padding: 0;
  margin: 0 0 24px 0;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
  font-size: 14px;
  color: #666;
}

.contact-item span {
  line-height: 1.5;
}

.contact-link {
  color: #666;
  text-decoration: none;
  transition: color 0.2s ease;
}

.contact-link:hover {
  color: #dc2626;
}

.social-icons-container {
  display: flex;
  gap: 12px;
}

.social-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.3s ease;
  color: white;
  font-size: 20px;
}

.social-icon.facebook {
  background-color: #1877f2;
}
.social-icon.instagram {
  background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
}
.social-icon.pinterest {
  background-color: #e60023;
}
.social-icon.whatsapp {
  background-color: #25d366;
}
.social-icon.twitter {
  background-color: #1da1f2;
}

.social-icon:hover {
  opacity: 0.85;
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* Payment Logos Section */
.payment-logos-section {
  background-color: white;
}

.payment-icon-container {
  width: 70px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.payment-icon-container:hover {
  transform: scale(1.1);
}

.payment-icon {
  font-size: 48px;
  color: #333;
}

.payment-icon-container:nth-child(1) .payment-icon {
  color: #1a1f71;
}
.payment-icon-container:nth-child(2) .payment-icon {
  color: #eb001b;
}
.payment-icon-container:nth-child(3) .payment-icon {
  color: #003087;
}
.payment-icon-container:nth-child(4) .payment-icon {
  color: #000;
}
.payment-icon-container:nth-child(5) .payment-icon {
  color: #007bc1;
}
.payment-icon-container:nth-child(6) .payment-icon {
  color: #ff6f00;
}
.payment-icon-container:nth-child(7) .payment-icon {
  color: #0076ce;
}
.payment-icon-container:nth-child(8) .payment-icon {
  color: #0066cc;
}
.payment-icon-container:nth-child(9) .payment-icon {
  color: #4285f4;
}

/* Copyright Section */
.copyright-section {
  background-color: #f5f5f5;
}

.copyright-text {
  font-size: 14px;
  color: #666;
  margin: 0;
}

/* Responsive adjustments for small screens */
@media (max-width: 640px) {
  .footer-column-title,
  .footer-link,
  .contact-item,
  .contact-link,
  .copyright-text,
  .newsletter-title,
  .newsletter-subtitle {
    text-align: center;
  }
  
  .brand-logo {
    display: block;
    text-align: center;
  }
  
  .contact-list,
  .footer-links-list {
    text-align: center;
  }
  
  .contact-item {
    justify-content: center;
  }
  
  .social-icons-container {
    justify-content: center;
  }
  
  .newsletter-form {
    gap: 12px;
  }
  
  .newsletter-input {
    min-width: 100%;
  }
  
  .newsletter-btn {
    width: 100%;
  }
}
</style>