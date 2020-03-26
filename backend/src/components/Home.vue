<template>
  <div class="home col-10 col-sm-6 mx-auto col-lg-6">
    <h1 class="mx-auto p-2">Gestion Backend GeoQuizz</h1>
    <hr>
    <h4>{{email}}</h4>
    <h4>{{toke}}</h4>
    <ul>
      <li>
        <a class="hihi"
          href="/addPictures"
        >
          Ajout de photos
        </a>
      </li>

      <li>
        <a
          href="/photos"
        >
          Voir toutes les photos
        </a>
      </li>

      <li>
        <a
          href="/series"
        >
          Voir toutes les series
        </a>
      </li>

      <li>
        <a
          href="/auth"
        >
          Se connecter
        </a>
      </li>

      <li>
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
  }
}
</script>

<style>
@import '../../vendor/bootstrap/css/bootstrap.min.css';

.home {
  background-color: #8e57bd;
  margin-top: 10vh;
}

h1 {
  color: white;
}

h3 {
  color: black;
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

body {
  background-image: url('https://img5.goodfon.com/wallpaper/nbig/1/b1/alexander-pavlov-by-alexander-pavlov-synth-retrowave-synthwa.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
}
</style>