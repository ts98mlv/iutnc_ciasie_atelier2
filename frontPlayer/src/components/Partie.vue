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
      v-on:click="$router.push({path:'/play/'+ idSerie + '/' + idPartie })"
    >Lancer la partie</button>
    <!--  <router-link v-bind:to="'/play/'+pseudo+ '/' + selected">Démarrer le jeu</router-link> -->
  </div>
</template>

<script>
import Carte from "./Carte";
const axios = require("axios");

export default {
  components: {
    Carte
  },
  data() {
    return {
      idPartie: this.$route.params.id,
      idSerie: this.$route.params.serid,
      pseudo: "",
      serie: "",
      nbphoto: 0
    };
  },
  methods: {
    // Pour recup info de la partie 
    findPartie() {
      axios
        /*
        .get(
          "http://docketu.iutnc.univ-lorraine.fr:17180/series/" + this.idPartie
        )
        */
        .get("https://58de787a.ngrok.io/parties/" + this.idPartie)

        .then(response => {
          // handle success
          console.log(response);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        })
        .finally(function() {
          // always executed
        });
    },
    // Récupère la bonne série dans l'Api ainsi que ses infos
    haveSerie() {
      axios
        /*
        .get(
          "http://docketu.iutnc.univ-lorraine.fr:17180/series/" + this.idPartie
        )
        */
        .get("https://58de787a.ngrok.io/series/" + this.idSerie)

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
      // Pour afficher le nombre de photo qu'il y a dans la série
      axios
        /*
        .get(
          "http://docketu.iutnc.univ-lorraine.fr:17180/series/" +
            this.idPartie +
            "/photos"
        )
        */
        .get("https://58de787a.ngrok.io/series/" + this.idSerie + "/photos")

        .then(response => {
          // handle success
          console.log(response);
          this.nbphoto = response.data.disponibles;
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        })
        .finally(function() {
          // always executed
        });
    }
  },
  created: function() {
    // On récup l'id de la partie, le pseudo, la liste des séries et le nombre de photo
    this.idPartie = this.$route.params.id;
    this.idSerie = this.$route.params.serid;
    this.pseudo = this.$route.params.pseudo;
    this.findPartie();
    this.haveSerie();
    this.getnbPhoto();

  }
};
</script>

<style>
@import "../style/css/Partie.css";
</style>
