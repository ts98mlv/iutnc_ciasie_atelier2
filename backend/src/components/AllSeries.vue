<template>
    <div class="AllSeries col-10 col-sm-6 mx-auto col-lg-6">
      <div class="btn-back row" @click="retour">
        <div class="back ml-4"><i class="fas fa-chevron-left"></i> Retour</div>
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
                        <th scope="col">Distance</th>
                        <th scope="col">Detail</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="serie in this.listSeries">
                        <th scope="row">{{serie.id}}</th>
                        <td>{{serie.ville}}</td>
                        <td>{{serie.distance}}</td>
                        <td><router-link v-bind:to="'/series/'+serie.id">Detail</router-link></td>
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
            // !!!Ancien!!!
            // Reqête axios récupérant toutes les séries
            // axios.get(urlAPI + "series")
            // .then( (res) => {
            //     const pars = JSON.parse(res.data);
            //     this.listSeries = pars.map(item => {
            //         return item
            //     })
                
            // })
            // .catch( err => console.error(err));

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
        this.$router.go(-1);
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
}

.back {
  background-color: #ca1384;
  font-size: 1.3em;
  padding: 4px;
  padding-left: 7px;
  padding-right: 7px;
  border-radius: 8px;
}

.btn-back {
  cursor: pointer;
}

</style>
