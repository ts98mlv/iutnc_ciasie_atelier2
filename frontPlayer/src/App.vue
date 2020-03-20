<template>
  <div id="app">
    <img src="./assets/logo2.jpg" />
    <h1>{{ msg }}</h1>
    <router-view></router-view>
    <!-- <Serie :selected="selected" ></Serie> -->
  </div>
</template>

<script>
import Serie from "./components/Serie";

export default {
  name: "app",
  components: {
    Serie
  },
  data() {
    return {
      msg: "Geoquizz Game",
      pseudo: "",
      selected: ""
    };
  },
  methods: {
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
