<template>
  <div class="container">
    <div class="form-row">
      <div class="form-group col-md-6">
        <label>Pseudo</label>
        <input type="text" class="form-control" v-model="pseudo" autofocus />
      </div>
      <div class="form-group col-md-6">
        <label>Séries</label>
        <select v-model="selected" class="form-control">
          <option value disabled>Choisissez</option>
          <option
            v-bind:value="serie.id"
            v-for="(serie,index) in tabSeries"
            :key="index"
          >{{serie.ville}}</option>
        </select>
      </div>
    </div>
    <div class="text-center">
      <button
        type="button"
        class="btn btn-secondary text-center"
        v-on:click="$router.push({path:'/partie/'+ pseudo + '/' + selected })"
      >Créer une partie</button>
    </div>
    <!--
    <p v-if="selected != null && pseudo != null ">
      <router-link v-bind:to="'/partie/'+pseudo+ '/' + selected">Créer la partie</router-link>
    </p>-->
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
@import "../style/css/Serie.css";
</style>
