<template>
  <div>
    <h3>Bonjour {{$route.params.pseudo}}</h3>
    <p>Vous avez choisis la série de {{listeSerie.ville}} avec une distance de {{listeSerie.distance}}</p>
    <router-link v-bind:to="'/play/'+pseudo+ '/' + selected">Démarrer le jeu</router-link>
    <Carte></Carte>
  </div>
</template>

<script>
import serie from "../assets/serie.json";
import Carte from "./Carte";

export default {
  components: {
    Carte
  },
  props: ["idPartie", "pseudo"],
  data() {
    return {
      idPartie: this.$route.params.id,
      selected: this.$route.params.id,
      pseudo : this.$route.params.pseudo
    };
  },
  computed: {
    listeSerie() {
      return serie.series.find(element => {
        return element.id == this.idPartie;
      });
    }
  },
  created : function() {
    this.idPartie = this.$route.params.id;
    this.pseudo = this.$route.params.pseudo;

  }
};
</script>

<style>
</style>
