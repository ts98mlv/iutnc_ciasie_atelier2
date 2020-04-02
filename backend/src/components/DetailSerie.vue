<template>
    <div class="DetailSerie col-10 col-md-10 mx-auto col-lg-8" >
      <div class="btn-back row">
        <div class="back ml-4" @click="retour"><i class="fas fa-chevron-left"></i> Retour</div>
      </div>
        <h1 class="mx-auto p-2">Details</h1>
        <hr>
        <div class="placeTab">

            <h3 class="titreTab">Serie</h3>

            <table class="tableauSeries table">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Ville</th>
                        <th scope="col">Map X</th>
                        <th scope="col">Map Y</th>
                        <th scope="col">Map zoom</th>
                        <th scope="col">Distance</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Condition pour afficher seulement la série selon l'id obtenu grâce à la route -->
                   <tr v-if="serie.id == $route.params.id" v-for="serie in this.listSeries">
                        <td>{{serie.id}}</td>
                        <td>{{serie.ville}}</td>
                        <td>{{serie.map_x}}</td>
                        <td>{{serie.map_y}}</td>
                        <td>15</td>
                        <td>{{serie.distance}}</td>
                    </tr>
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
      serieId: '',
      listSeries: ''
    }
  },
  
  created () {

      // Reqête axios récupérant la série selon son id obtenu grâce à $route.params et envoyant dans header le tokenJWT du localStorage ainsi que l'email
      let tokenBearer = 'Bearer ' + localStorage.token; 

			axios({
          method: "get",
          url: urlAPI + "series",
          headers: {
              "Authorization": tokenBearer,
              'mail': localStorage.email
          }
      })
			.then(res => {
				const pars = JSON.parse(res.data);
        this.listSeries = pars.map(item => {
            return item
        })
			})		
			.catch( err => console.error(err));
      },

  methods: {
        retour() {
            this.$router.push("/#series");
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
  min-width: 710px;
}

.DetailSerie {
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

th {
    padding: 5px;
    color: white;
    text-align: center !important;
}


td {
  color: white;
  vertical-align: middle !important;
}

thead {
    background-color: #600909;
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
