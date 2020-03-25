<template>
  <div class="container text-center">
      Votre Partie est finit. Vous avez obtenu un score de <b>{{score}}</b>
  </div>
</template>

<script>


export default {

  data() {
    return {
      idPartie: this.$route.params.id,
      selected: this.$route.params.id,
      pseudo: this.$route.params.pseudo,
      score : this.$route.params.score
    };
  },
  computed: {

  },
  created: function() {

  }
};
</script>

<style>
@import "../style/css/End.css";

</style>
