<template>
  <div class="container text-center">
    <h3>Bonjour {{$route.params.pseudo}}</h3>
    <p style="margin-bottom:0">
      Vous avez choisis la ville de
      <b>{{serie.ville}}</b>
    </p>
    <p>Les règles sont simples :</p>
    <ul>
      <li>
        🏰
        <b>{{nbphoto}}</b> Photos de monuments ou place à insérer sur la carte🏰
      </li>
      <li>
        ⌛
        <b>20</b> secondes max pour placer une image⌛
      </li>
      <li>👉Plus vous êtes rapide et précis, plus vous gagnez des points👈</li>
      <li>🚨Dès que vous appuyez sur "Démarrer le jeu", le timer est lancé🚨</li>
      <li>⚠️Il suffit de cliquer sur la carte pour valider votre choix⚠️</li>
    </ul>

    <button
      type="button"
      class="btn btn-secondary text-center"
      v-on:click="$router.push({path:'/play/'+ pseudo + '/' + selected })"
    >Lancer la partie</button>
    <!--  <router-link v-bind:to="'/play/'+pseudo+ '/' + selected">Démarrer le jeu</router-link> -->
  </div>
</template>

<script>
import serie from "../assets/serie.json";
import partie from "../assets/partie.json";
import Carte from "./Carte";
const axios = require("axios");

export default {
  components: {
    Carte
  },
  data() {
    return {
      idPartie: this.$route.params.id,
      selected: this.$route.params.id,
      pseudo: this.$route.params.pseudo,
      serie: "",
      nbphoto: 0
    };
  },
  methods: {
    listeSerie() {
      axios
        .get(
          "http://docketu.iutnc.univ-lorraine.fr:17180/series/" + this.idPartie
        )
        .then(response => {
          // handle success
          console.log(response.data[0]);
          this.serie = response.data[0];
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        })
        .finally(function() {
          // always executed
        });
    },
    getnbPhoto() {
      axios
        .get(
          "http://docketu.iutnc.univ-lorraine.fr:17180/series/" +
            this.idPartie +
            "/photos"
        )
        .then(response => {
          // handle success
          console.log(response);
          this.nbphoto = response.data.demande;
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        })
        .finally(function() {
          // always executed
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
    this.listeSerie();
    this.getnbPhoto();
  }
};
</script>

<style>
@import "../style/css/Partie.css";
</style>
