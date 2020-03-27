<template>
  <div class="container text-center">
    <p>
    Vous avez enregistré votre partie avec votre score de 
    <b>{{score}}</b></p>
    <button
      type="button"
      class="btn btn-secondary text-center"
      v-on:click="$router.push({path:'/score/' + idSerie })"
    >Voir le classement de cette série</button>
  </div>
</template>

<script>
const axios = require("axios");

export default {
  data() {
    return {
      idPartie: this.$route.params.id,
      idSerie: this.$route.params.serid,
      score: this.$route.params.score,
      token: this.$route.params.token,
      nbphoto: this.$route.params.nbphoto
    };
  },
  computed: {},
  created: function() {
    let jsonEnvoi = {
      score: this.score,
      nb_photos: this.nbphoto,
      partie_token: this.token
    };
    axios({
      method: "PUT",
      url:
        "http://docketu.iutnc.univ-lorraine.fr:17180/parties/" + this.idPartie,
      data: jsonEnvoi
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style>
@import "../style/css/End.css";
</style>
