<template>
  <div class="container">
    <div class="form-row">
      <div class="form-group col-md-6">
        <label>Pseudo</label>
        <input type="text" class="form-control" v-model="pseudo" autofocus />
      </div>
      <div class="form-group col-md-6">
        <label>Séries</label>
        <select v-model="idSerie" class="form-control">
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
        v-on:click="createPartie();"
      >Créer une partie</button>
    </div>
    <!--
    <p v-if="idSerie != null && pseudo != null ">
      <router-link v-bind:to="'/partie/'+pseudo+ '/' + idSerie">Créer la partie</router-link>
    </p>-->
  </div>
</template>

<script>
const axios = require("axios");

export default {
  data() {
    return {
      pseudo: "",
      idSerie: "",
      tabSeries: [],
      idPartie: ""
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
    // Pour créer la partie et envoyer au serveur
    createPartie() {
      let jsonEnvoi = {
        pseudo: this.pseudo,
        serie_id: this.idSerie
      };
      axios({
        method: "POST",
      //  url: "http://docketu.iutnc.univ-lorraine.fr:17180/series",
        url: "https://58de787a.ngrok.io/parties",
        data: jsonEnvoi
      })
        .then(response => {
          console.log(response);
          this.idPartie = response.data.idPartie
          this.$router.push({path:'/partie/'+ this.idSerie + "/" + this.idPartie })
        })
        .catch(error => {
          console.log(error);
        });
    },
    getSeries() {
      // Pour voir toute les séries disponibles dans la liste déroulante
      axios
        //.get("http://docketu.iutnc.univ-lorraine.fr:17180/series")
        .get("https://58de787a.ngrok.io/series")
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
    console.log(this.tabSeries);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../style/css/Serie.css";
</style>
