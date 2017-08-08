// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import axios from 'axios'
// import router from './router'
import routes from './router/routes'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'font-awesome/css/font-awesome.min.css'
import qs from 'qs'



Vue.use(ElementUI)
Vue.use(VueRouter)

Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;

Vue.config.productionTip = false;

const router = new VueRouter({
  routes
})

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   template: '<App/>',
//   components: { App }
// })

new Vue({
  el: '#app',
  template: '<App/>',
  router,
  components: { App }
  //render: h => h(App)
}).$mount('#app')