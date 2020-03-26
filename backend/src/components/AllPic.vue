<template>
    <div class="AddPhoto col-10 col-sm-6 mx-auto col-lg-6">
        <h1 class="mx-auto p-2">Toutes les photos</h1>
        <hr>
        <div class="placeTab">

            <h3 class="titreTab">Photos</h3>

            <table class="tableauPhotos">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Photo</th>
                        <th>Assigné</th>
                        <th>Detail</th>
                    </tr>
                </thead>
                    <tr v-for="photo in this.listPhotos">
                        <td>{{photo.description}}</td>
                        <td><img :src='photo.url'></td>
                        <td v-if="photo.serie_id == null">Non</td>
                        <td v-if="photo.serie_id != null">Oui</td>
                        <td><router-link v-bind:to="'/photos/'+photo.id">Detail</router-link></td>
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

            // Requête axios récupérant toutes les photos lors de l'actualisation de la page
            // axios.get(urlAPI + "photos")
            // .then( (res) => {
            //     const pars = JSON.parse(res.data);
            //     this.listPhotos = pars.map(item => {
            //         return item
            //     })
                
            // })
            // .catch( err => console.error(err));

            // Requête axios récupérant toutes les photos lors de l'actualisation de la page et envoyant dans header le tokenJWT du localStorage ainsi que l'email
            let tokenBearer = 'Bearer ' + localStorage.token; 

			axios({
                method: "get",
                url: urlAPI + "photos",
                headers: {
                    "Authorization": tokenBearer,
                    'mail': localStorage.mail
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

    },

  computed: {

    listOfDatasPhotos () {
        return datasPhotos.map(item => {
            return item;
        });
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

.AddPhoto {
  background-color: #910c5e;
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
    border: 1px solid black;
    margin: 0 auto;
}

.tableauPhotos img {
    width: 80px;
}

th {
    padding: 5px;
    color: white;
}

</style>
