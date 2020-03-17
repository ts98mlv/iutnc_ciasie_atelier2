import Vue from 'vue'
import App from './App.vue'
import VueRouteur from 'vue-router'

import Partie from './components/Partie.vue';
import Serie from './components/Serie.vue';

Vue.use(VueRouteur)

const router = new VueRouteur ({
  mode: 'history',
  routes: [
    {path: '/', component:Serie},
    {path: '/partie/:pseudo/:id', component:Partie},
    {path: '*',redirect:'/'}
  ]
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
