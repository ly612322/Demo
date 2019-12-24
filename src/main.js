import Vue from 'vue';
import ElementUI from 'element-ui';
import router from './router/index'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import './assets/style.css'
import store from './store/index'
import qs from 'qs'
import axios from 'axios'
import './mock'
Vue.prototype.$qs = qs
Vue.prototype.$http = axios     
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
