<template>
  <div>
    <h3>Bonjour {{$route.params.pseudo}}</h3>
    <p style="margin-bottom:0">
      Vous avez choisis la ville de
      <b>{{listeSerie.ville}}</b>
    </p>
    <p>
      Les règles sont simples : 
      <ul>
        <li>🏰<b>{{findPartie.nb_photos}}</b> Photos de monuments ou place à insérer sur la carte🏰</li>
        <li>⌛<b>20</b> secondes max pour placer une image⌛</li>
        <li>👉Plus vous êtes rapide et précis, plus vous gagnez des points👈</li>
        <li>⚠️Dès que vous appuyez sur "Démarrer le jeu", le timer est lancé⚠️</li>
      </ul>
    </p>
    <p></p>
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
