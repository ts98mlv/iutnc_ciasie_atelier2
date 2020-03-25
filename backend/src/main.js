// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Router from 'vue-router'
import Vue from 'vue'

import Home from './components/Home.vue'
import App from './App.vue'
import AddPic from './components/AddPicture.vue'
import AllPic from './components/AllPic.vue'
import AllSeries from './components/AllSeries.vue'
import DetailPic from './components/DetailPic.vue'
import DetailSerie from './components/DetailSerie.vue'
import Auth from './components/Authentification.vue'

require('../vendor/bootstrap/css/bootstrap.min.css');
require('./assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css');
require('./assets/fonts/iconic/css/material-design-iconic-font.min.css');
require('../vendor/animate/animate.css');
require('../vendor/css-hamburgers/hamburgers.min.css');
require('../vendor/select2/select2.min.css');
require('../vendor/daterangepicker/daterangepicker.css');
require('./assets/css/util.css');
require('./assets/css/main.css');

Vue.use(Router)

const router = new Router({
  mode: 'history',

  routes: [
    { path: '/', component: Home },
    { path: '/addPictures', component: AddPic },
    { path: '/photos', component: AllPic },
    { path: '/series', component: AllSeries },
    { path: '/photos/:id', component: DetailPic },
    { path: '/series/:id', component: DetailSerie },
    { path: '/auth', component: Auth },
    { path: '*', redirect: '/' }
  ]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
