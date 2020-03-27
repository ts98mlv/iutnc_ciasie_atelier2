<template>
  <div></div>
</template>

<script>
const axios = require("axios");

export default {
  data() {
    return {
      idSerie: this.$route.params.serid
    };
  },
  created: function() {
    // Recup les parties avec le bon id serie qui correspond
    axios
      .get(
        "http://docketu.iutnc.univ-lorraine.fr:17180/parties/" + this.idPartie
      )

      //.get("https://58de787a.ngrok.io/parties/" + this.idPartie)

      .then(response => {
        // handle success
        console.log(response);
        this.tokenSerie = response.data[0].token;
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
@import "../style/css/End.css";
</style>
