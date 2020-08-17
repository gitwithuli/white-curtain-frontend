import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import Axios from 'axios';
import Notifications from 'vue-notification'
import { ValidationProvider } from 'vee-validate';

Vue.component('ValidationProvider', ValidationProvider);

Vue.config.productionTip = false

Axios.defaults.baseURL = process.env.VUE_APP_API_URL

if (localStorage.getItem("jwt")) {
  Axios.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${localStorage.getItem("jwt")})`
    return config
  })
}

Vue.use(Notifications)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
