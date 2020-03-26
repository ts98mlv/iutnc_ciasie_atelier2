<template>
  <div class="container text-center">
      Votre Partie est finit. Vous avez obtenu un score de <b>{{score}}</b>
  </div>
</template>

<script>
const axios = require("axios");

export default {

  data() {
    return {
      idPartie: this.$route.params.id,
      idSerie: this.$route.params.serid,
      pseudo: this.$route.params.pseudo,
      score : this.$route.params.score
    };
  },
  computed: {

  },
  created: function() {
     let jsonEnvoi = {
        score: this.score,
        nb_photos : 5
      };
      axios({
        method: "PUT",
        url: "http://docketu.iutnc.univ-lorraine.fr:17180/parties/" + this.idPartie,
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
