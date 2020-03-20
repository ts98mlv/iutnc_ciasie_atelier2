<template>
  <div>
    <h3>Bonjour {{$route.params.pseudo}}</h3>
    <p style="margin-bottom:0">
      Vous avez choisis la série de
      <b>{{listeSerie.ville}}</b> avec une distance de
      <b>{{listeSerie.distance}}</b>.
    </p>
    <p style="margin-top:0">
      Les règles sont simples. Vous aurez
      <b>{{findPartie.nb_photos}}</b> photos à insérer sur la carte. Attention, vous aurez 20 secondes max pour le faire.
      Plus vous êtes rapide, et plus vous gagnerez de points.
    </p>
    <router-link v-bind:to="'/play/'+pseudo+ '/' + selected">Démarrer le jeu</router-link>
  </div>
</template>

<script>
import serie from "../assets/serie.json";
import partie from "../assets/partie.json";
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
      pseudo: this.$route.params.pseudo
    };
  },
  computed: {
    listeSerie() {
      return serie.series.find(element => {
        return element.id == this.idPartie;
      });
    },
    findPartie() {
      return partie.parties.find(element => {
        return element.serie_id == this.idPartie;
      });
    }
  },
  created: function() {
    this.idPartie = this.$route.params.id;
    this.pseudo = this.$route.params.pseudo;
  }
};
</script>

<style>
</style>
