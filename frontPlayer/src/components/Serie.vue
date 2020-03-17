<template>
  <div>
    <p>
      Votre pseudo :
      <input type="text" v-model="pseudo" />
    </p>
    <p>
      Les séries :
      <select v-model="selected" >
        <option value="" disabled>Choisissez</option>
        <option v-bind:value="serie.id" v-for="serie in listeSerie">{{serie.ville}}</option>
      </select>
    </p>
    <p>
      <router-link v-bind:to="'/partie/'+pseudo+ '/' + selected">Créer la partie</router-link>
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
