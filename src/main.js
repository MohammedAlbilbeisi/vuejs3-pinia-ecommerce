import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTruck, faAward, faTrophy, faEnvelope, faMapMarkerAlt, faPhone, faMedal, faWarehouse, faTruckFast, faShieldHalved, faHeadset } from '@fortawesome/free-solid-svg-icons';
import { 
  faCcVisa, 
  faCcMastercard, 
  faPaypal, 
  faApplePay,
  faCcAmex,
  faCcDiscover,
  faCcDinersClub,
  faCcJcb,
  faGooglePay,
  faFacebook,
  faInstagram,
  faPinterest,
  faWhatsapp,
  faTwitter
} from '@fortawesome/free-brands-svg-icons';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import mitt from 'mitt'
import AOS from 'aos'
import 'aos/dist/aos.css'

library.add(
  faTruck, faAward, faTrophy, faEnvelope, faMapMarkerAlt, faPhone, 
  faMedal, faWarehouse, faTruckFast, faShieldHalved, faHeadset,
  faCcVisa, faCcMastercard, faPaypal, faApplePay, faCcAmex, 
  faCcDiscover, faCcDinersClub, faCcJcb, faGooglePay, 
  faFacebook, faInstagram, faPinterest, faWhatsapp, faTwitter
);

const Emitter = mitt()

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(vuetify)
  .provide("Emitter", Emitter)
  .use(createPinia())
  .use(router)

app.mount("#app")

app.mixin({
  mounted() {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true
    })
    AOS.refresh()
  }
})
