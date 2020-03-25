<template>
  <div>
    <p>
      Votre pseudo :
      <input type="text" v-model="pseudo" />
    </p>
    <p>
      Les séries :
      <select v-model="selected">
        <option value disabled>Choisissez</option>
        <option
          v-bind:value="serie.id"
          v-for="(serie,index) in tabSeries" 
          :key="index"
        >{{serie.ville}}</option>
        <!--        <option
          v-bind:value="serie.id"
          v-for="(serie,index) in listeSerie" 
          :key="index"
        >{{serie.ville}}</option> -->
      </select>
    </p>
    <p v-if="selected != null && pseudo != null ">
      <router-link v-bind:to="'/partie/'+pseudo+ '/' + selected">Créer la partie</router-link>
    </p>
  </div>
</template>

<script>
import serie from "../assets/serie.json";
const axios = require("axios");

export default {
  data() {
    return {
      pseudo: "",
      selected: "",
      tabSeries: []
    };
  },
  computed: {
    listeSerie() {
      return serie.series.map(item => {
        return item;
      });
    }
  },
  methods: {
    getSeries() {
      axios
        .get("http://docketu.iutnc.univ-lorraine.fr:17180/series")
        .then(response => {
          // handle success
          console.log(response);
          response.data.forEach(element => {
            this.tabSeries.push(element);
          });
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        })
        .finally(function() {
          // always executed
        });
    }
  },
  created: function() {
    this.getSeries();
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
