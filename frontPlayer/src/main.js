import Vue from 'vue'
import App from './App.vue'
import VueRouteur from 'vue-router'

import Play from './components/Play.vue'
import Serie from './components/Serie.vue'

Vue.use(VueRouteur)

const router = new VueRouteur ({
  mode: 'history',
  routes: [
    {path: '/', component:Serie},
    {path: '/partie/:id', component:Play},
    {path: '*',redirect:'/'}
  ]
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
