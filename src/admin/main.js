import Vue from 'vue';
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import VueSimpleValidator from 'simple-vue-validator'
import store from "./store"
import $axios from './requests'

Vue.use(VueRouter);


store.$axios = $axios;

new Vue({
  el: "#app-root",
  store,
  render: h => h(App),
  router
});