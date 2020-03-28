<template>
  <div class="home col-10 col-sm-6 mx-auto col-lg-6">
    <h1 class="mx-auto p-2">Gestion Backend GeoQuizz</h1>
    <hr>
    <h4 v-if="toke != null">Vous êtes connecté en tant que <b>{{email}}</b></h4>
    <ul>
      <li>
        <a v-if="toke != null" class="hihi"
          href="/addPictures"
        >
          Ajout de photos
        </a>
      </li>

      <li>
        <a v-if="toke != null"
          href="/photos"
        >
          Voir toutes les photos
        </a>
      </li>

      <li>
        <a v-if="toke != null"
          href="/series"
        >
          Voir toutes les series
        </a>
      </li>

      <li>
        <a v-if="toke != null"
          href="/photos-nonLoc"
        >
          Voir toutes les photos non localisées
        </a>
      </li>

      <li>
        <a v-if="toke != null"
          href="/create-serie"
        >
          Créer une série
        </a>
      </li>

      <li v-if="toke != null">
        <a href="/"
          @click="deconnect"
        >
          Se deconnecter
        </a>
      </li>

      <li v-if="toke == null">
        <a
          href="/auth"
        >
          Se connecter
        </a>
      </li>

      <li v-if="toke == null">
        <a
          href="/inscription"
        >
          S'inscrire
        </a>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  data () {
    return {
      email: localStorage.email,
      toke: localStorage.token
    }
  },

  created () {
      
  },

  methods: {
    deconnect() {
      localStorage.clear()
      alert("Vous êtes deconnecté.")
      this.$router.push("/")
    }
  }
}
</script>

<style>
@import '../../vendor/bootstrap/css/bootstrap.min.css';

body {
  background-image: url('../assets/sky.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
}

.home {
  background-color: #910c5ee8;
  margin-top: 10vh;
  border-radius: 15px;
  padding: 10px;
}

h1 {
  color: white;
}

h4 {
  color: #b7c7f7;
}

hr {
  width: 70%;
  border: 1px solid #31313140;
}

li {
  list-style: none;
  padding: 3px;
}

a {
  color: white;
}

a:hover {
  color: rgb(201, 199, 199);
  text-decoration: none;
}

</style>