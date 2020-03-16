<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <p>Votre pseudo : <input type="text" v-model="pseudo"></p>
    <button v-on:click="say(pseudo)" >Démarrer une partie</button>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Player Geoquizz',
      pseudo : ""
    }
  },
  methods: {
    say: function (pseudo) {
      alert(pseudo);
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
