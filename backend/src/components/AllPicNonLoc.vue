<template>
    <div class="AllPhotoNonLoc col-10 col-md-10 mx-auto col-lg-8">
      <div class="btn-back row" @click="retour">
        <div class="back ml-4"><i class="fas fa-chevron-left"></i> Retour</div>
      </div>
        <h1 class="mx-auto p-2">Toutes les photos non localisées</h1>
        <hr>
        <div class="placeTab">
            <h3 class="titreTab">Photos</h3>

            <table class="tableauPhotos table mt-3">
                <thead>
                    <tr>
                        <th scope="col">Description</th>
                        <th scope="col">Photo</th>
                        <th scope="col">Assignée</th>
                        <th scope="col">Detail</th>
                    </tr>
                </thead>
                    <tr v-if="(photo.positionX == null || photo.positionX == 0) && (photo.positionY == null || photo.positionY == 0)" v-for="photo in this.listPhotos">
                        <td>{{photo.description}}</td>
                        <td><img :src='photo.url'></td>
                        <td v-if="photo.serie_id == null">Non</td>
                        <td v-if="photo.serie_id != null">Oui</td>
                        <td><router-link class="lienDet" v-bind:to="'/#/photos-nonLoc/'+photo.id">Detail <i class="fas fa-chevron-right"></i></router-link></td>
                    </tr>

                <tbody>

                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from "axios"

const urlAPI = "http://docketu.iutnc.univ-lorraine.fr:17280/"

export default {

  data () {
    return {
      photoId: '',
      listPhotos: ''
    }
  },
  
  created () {

            // Requête axios récupérant toutes les photos lors de l'actualisation de la page et envoyant dans header le tokenJWT du localStorage ainsi que l'email
            let tokenBearer = 'Bearer ' + localStorage.token; 

			axios({
          method: "get",
          url: urlAPI + "photos",
          headers: {
              "Authorization": tokenBearer,
              'mail': localStorage.email
          }
      })
			.then(res => {
				const pars = JSON.parse(res.data);
        this.listPhotos = pars.map(item => {
            return item
        })
			})		
      .catch( err => console.error(err));
      },

  methods: {
      retour() {
        this.$router.push("/#/");
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
  min-width: 600px;
}

.AllPhotoNonLoc {
  background-color: #910c5ee8;
  margin-top: 10vh;
  border-radius: 15px;
  padding: 10px;
}

h1 {
  color: white;
}

hr {
  width: 70%;
  border: 1px solid #31313140;
}

.titreTab {
    color: white;
}

.tableauPhotos {
    margin: 0 auto;
}

.tableauPhotos img {
    width: 80px;
}

thead {
    background-color: #600909;
}

th {
    padding: 5px;
    color: white;
    text-align: center;

}

td {
    color: white;
    vertical-align: middle !important;
}

.lienDet {
  color: white;
  padding: 5px;
}

.lienDet:hover {
  text-decoration: none;
  color: #d4d4d4;
}

.back {
  background-color: #ca1384;
  font-size: 1.3em;
  padding: 4px;
  padding-left: 7px;
  padding-right: 7px;
  border-radius: 8px;
  cursor: pointer;
}

</style>
