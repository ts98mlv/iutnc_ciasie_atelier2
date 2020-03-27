<template>
  <div class="container text-center">
    <h3>Tableau des scores pour cette série : </h3>
    <table>
      <tr>
        <th>Pseudo</th>
        <th>Score</th>
      </tr>
      <tr v-for="(joueur,index) in tabScore" :key="index">
        <td>{{joueur.joueur}}</td>
        <td>{{joueur.score}}</td>
      </tr>
    </table>
        <button
      type="button"
      class="btn btn-secondary text-center"
      v-on:click="$router.push({path:'/'})"
    >Revenir à l'accueil</button>
  </div>
</template>

<script>
const axios = require("axios");

export default {
  data() {
    return {
      idSerie: this.$route.params.serid,
      tabScore: []
    };
  },
  created: function() {
    // Recup les parties avec le bon id serie qui correspond
    axios
      .get("http://docketu.iutnc.univ-lorraine.fr:17180/parties")

      //.get("https://58de787a.ngrok.io/parties/" + this.idPartie)

      .then(response => {
        // handle success
        console.log(response);
        response.data.forEach(element => {
          if (element.serie_id == this.idSerie) this.tabScore.push(element);
        });
        // tri le tableau dans l'ordre croissant
        this.tabScore.sort(function (a,b) {
            return b.score - a.score;
        })
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .finally(function() {
        // always executed
      });
  }
};
</script>

<style>
@import "../style/css/Classement.css";
</style>
