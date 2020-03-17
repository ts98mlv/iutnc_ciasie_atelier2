<template>
  <div>
    <p>
      Votre pseudo :
      <input type="text" v-model="pseudo" />
    </p>
    <p>
      Les séries :
      <select v-model="selected">
        <option disabled value>Choisissez</option>
        <option v-for="serie in listeSerie">{{serie.ville}}</option>
      </select>
    </p>
    <button v-on:click="data()">Démarrer une partie</button>
    <p>
      <router-link v-bind:to="'/partie/'+selected">Lancer la partie</router-link>
    </p>
  </div>
</template>

<script>
import serie from "../assets/serie.json";
export default {
  props: ["selected", "pseudo"],
  computed: {
    listeSerie() {
      return serie.series.map(item => {
        return item;
      });
    }
  },
  methods: {
    data() {
      this.$emit("changevalue", this.selected);
      this.$emit("changevalue2", this.pseudo);
      alert(this.pseudo + this.selected);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
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
