<template>
    <div class="DetailPhoto col-10 col-md-10 mx-auto col-lg-8">
      <div class="btn-back row" @click="retour">
        <div class="back ml-4"><i class="fas fa-chevron-left"></i> Retour</div>
      </div>
        <h1 class="mx-auto p-2">Localisation</h1>
        <hr>
        <div class="placeTab">

            <h3 class="titreTab">Photo</h3>

            <table  class="tableauPhotos table my-3">
                <thead>
                    <tr>
                        <th scope="col">Description</th>
                        <th scope="col">positionX</th>
                        <th scope="col">positionY</th>
                        <th scope="col">Photo</th>
                        <th scope="col">Serie</th>
                        <th scope="col">Localiser</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="photo.id == $route.params.id" v-for="photo in this.listPhotos">
                        <td>{{photo.description}}</td>
                        <td><input type="number" v-model="posX" step="0.01" value="0"></td>
                        <td><input type="number" v-model="posY" step="0.01" value="0"></td>
                        <td><img :src='photo.url'></td>
                        <td>{{photo.serie_id}}</td>
                        <td><a class="addLoc" @click="addLoc">Localiser <i class="fas fa-check"></i></a></td>
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
      photoId: this.$route.params.id,
      listPhotos: '',
      posX: '0',
      posY: '0'
    }
  },

  filters: {

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
        // Remplissage de listPhotos avec toutes les photos rencontrées
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
        this.$router.push("/#/photos-nonLoc");
      },

      addLoc() {

        // Requête axios permettant de mettre à jour la localisation d'une photo et envoyant dans header le tokenJWT du localStorage ainsi que l'email
        let tokenBearer = 'Bearer ' + localStorage.token;   
        const picALocaliser = this.listPhotos.find(element => element.id == this.photoId); 

        const options = {
            method: 'put',
            url: urlAPI + "photos/" + picALocaliser.id,
            headers: {
                "Authorization": tokenBearer,
                'mail': localStorage.email
            },
            data: {
                "id": picALocaliser.id,
                "serie_id": picALocaliser.serie_id,
                "description": picALocaliser.description,
                "url": picALocaliser.url,
                "position": 
                {
                    "positionX": this.posX,
                    "positionY": this.posY
                }
            },
            transformResponse: [(data) => {
                // transform the response
                return data;
                
            }]
        };

        // send the request
        axios(options); 

        // On averti à l'user que cela à bien été enregistré
        alert("Votre photo a bien été enregistrée.")
        this.$router.push('/#/photos-nonLoc');
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

.DetailPhoto {
  background-color: #910c5ee8;
  margin-top: 10vh;
  border-radius: 15px;
  padding: 10px;
}


hr {
  width: 70%;
  border: 1px solid #31313140;
}

.titreTab {
    color: white;
}

h1 {
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

.addLoc {
  color: white;
  padding: 5px;
}

.addLoc:hover {
  text-decoration: none;
  color: #d4d4d4;
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

input {
    width: 60%;
}
</style>
