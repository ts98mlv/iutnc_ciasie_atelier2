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
import Register from './components/Register.vue'
import PicNonLoc from './components/AllPicNonLoc.vue'
import AddLocPic from './components/AddLocalisationPic.vue'
import createSerie from './components/CreateSerie'

require('../fontawesome/css/all.css');

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
    { path: '/inscription', component: Register },
    { path: '/photos-nonLoc', component: PicNonLoc },
    { path: '/photos-nonLoc/:id', component: AddLocPic },
    { path: '/create-serie', component: createSerie },
    { path: '*', redirect: '/' }
  ]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
