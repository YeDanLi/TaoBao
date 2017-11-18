// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import $ from './assets/jquery';
import App from './App'
import Vuex from 'vuex'
import router from './router';
// import store from './store';
import './assets/font-awesome/css/font-awesome.min.css';
import axios from 'axios';
Vue.prototype.axios = axios;
// Vue.use(axios);
Vue.use(Vuex);
FastClick.attach(document.body);

//创建状态
const store = new Vuex.Store({
  state: {
    nickName:'',
    cartCount:0
  },
  mutations: {
    //更新用户信息
    updateUserInfo(state, nickName) {
      state.nickName = nickName;
    },
    updateCartCount(state,cartCount){
      state.cartCount += cartCount;
    }
  }
});


/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 可以通过el属性将vue实例挂载在Dom上
// 也可以通过new vue().$mount('#app'),手动将实例挂载在dom树上
