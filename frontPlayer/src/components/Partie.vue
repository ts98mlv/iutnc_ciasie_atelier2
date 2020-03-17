<template>
  <div>
    <h3>Bonjour {{$route.params.pseudo}}</h3>
    <p>Vous avez choisis la série de {{listeSerie.ville}} avec une distance de {{listeSerie.distance}}</p>
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
  data() {
    return {
      idPartie: this.$route.params.id
    };
  },
  computed: {
    listeSerie() {
      return serie.series.find(element => {
        return element.id == this.idPartie;
      });
    }
  }
};
</script>

<style>
</style>
