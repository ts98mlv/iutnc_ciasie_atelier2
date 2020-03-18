// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Router from 'vue-router'
import Vue from 'vue'

import Home from './components/Home.vue'
import App from './App.vue'
import AddPic from './components/AddPicture.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',

  routes: [
    {
      path: '/',
      component: Home
    },

    {
      path: '/addPictures',
      component: AddPic
    }
  ]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
