import Vue from 'vue'
import App from './App.vue'
import VueRouteur from 'vue-router'

import Partie from './components/Partie.vue';
import Serie from './components/Serie.vue';
import Play from './components/Play.vue';
import Finish from './components/Finish.vue';
import Classement from './components/Classement.vue';
import Carte from './components/Carte.vue';

Vue.use(VueRouteur)

const router = new VueRouteur ({
  mode: 'history',
  routes: [
    {path: '/', component:Serie},
    {path: '/partie/:serid/:id', component:Partie},
    {path: '*',redirect:'/'},
    {path: '/play/:serid/:id', component:Play},
    {path: '/end/:serid/:id/:score/:token/:nbphoto', component:Finish},
    {path: '/score/:serid', component:Classement},
  ]
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
