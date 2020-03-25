<template>
  <div id="app">
    <div class="header text-center">
      <img src="./assets/logo2.jpg" class="rounded-circle " />
      <h2>{{ msg }}</h2>
    </div>
    
    <router-view></router-view>
    <!-- <Serie :selected="selected" ></Serie> -->
  </div>
</template>

<script>
export default {
  name: "app",

  data() {
    return {
      msg: "Geoquizz Game"
    };
  },
  methods: {}
};
</script>

<style>
@import "./style/css/Header.css";
</style>
