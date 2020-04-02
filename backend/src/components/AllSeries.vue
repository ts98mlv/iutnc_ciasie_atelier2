<template>
    <div class="AllSeries col-10 col-sm-6 mx-auto col-lg-6">
      <div class="btn-back row">
        <div class="back ml-4" @click="retour"><i class="fas fa-chevron-left"></i> Retour</div>
      </div>
        <h1 class="mx-auto p-2">Toutes les séries</h1>
        <hr>
        <div class="placeTab">
            <h3 class="titreTab">Series</h3>

            <table class="tableauSeries table">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Ville</th>
                        <th scope="col">Detail</th>
                        <th scope="col">Supprimer</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="serie in this.listSeries">
                        <th scope="row">{{serie.id}}</th>
                        <td>{{serie.ville}}</td>
                        <td><router-link class="lienDet" v-bind:to="'/#/series/'+serie.id">Detail <i class="fas fa-chevron-right"></i><i class="fas fa-chevron-right"></i></router-link></td>
                        <td><a class="lienSuppr" @click="supprS(serie.id)">Supprimer <i class="fas fa-map-marker-alt"></i></a></td>
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

      // Requête axios récupérant toutes les séries et envoyant dans header le tokenJWT du localStorage ainsi que l'email
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
        this.$router.push("/#/");
      },

      supprS (idSer) {

        // Requête axios permettant de supprimer une série et envoyant dans header le tokenJWT du localStorage ainsi que l'email
        let tokenBearer = 'Bearer ' + localStorage.token;   

      axios({
          method: "delete",
          url: urlAPI + "series/" + idSer,
          headers: {
              "Authorization": tokenBearer,
              'mail': localStorage.email
          }
        })
			.then(res => {
				console.log(res)
        
			})		
      .catch( err => console.error(idSer + " : " + err));

      alert("Votre série a bien été supprimée.")
      this.$router.push("/#/");

    },

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

.AllSeries {
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

thead {
    background-color: #600909;
}

.titreTab {
    color: white;
}

.tableauSeries {
    margin: 20px auto;
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

.lienDet, .lienSuppr {
  color: white;
  background-color: #ca1384;
  padding: 5px;
  border-radius: 8px;
}

.lienDet:hover, .lienSuppr:hover {
  text-decoration: none;
  color: #d4d4d4;
}

a {
  cursor: pointer;
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
