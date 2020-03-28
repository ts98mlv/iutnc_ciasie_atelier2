<template>
    <div class="AddPhoto col-10 col-md-10 mx-auto col-lg-8 mb-5 pb-4">
        <div class="btn-back row">
            <div class="back ml-4" @click="retour"><i class="fas fa-chevron-left"></i> Retour</div>
        </div>
        <h1 class="mx-auto p-2">Assigner une photo</h1>
        <hr>

        <div id="affectPhoto">
            
            <label class="labelSerie">Choisir une série : </label><br>
            <select v-model="serieId" class="mb-3">
                <option value="" disabled>Série</option>
                <option v-bind:value="serie.id" v-for="serie in this.listSeries">{{serie.ville}}</option>
            </select><br>
           
           <label class="labelPhoto">Choisir une photo : </label><br>
            <select v-model="photoId" >
                <option value="" disabled>Photo</option>
                <option v-if="photo.serie_id == null" v-bind:value="photo.id" v-for="photo in this.listPhotos">{{photo.description}}</option>
            </select>

            <div class="mt-3">
                <a class="assPhoto" @click="sendForm">Assigner <i class="fas fa-map-marker-alt"></i></a>
            </div>

        </div>
        <hr>
        <div class="placeTab">
            <h3 class="titreTab">Photos</h3>

            <table  class="tableauPhotos table">
                <thead>
                    <tr>
                        <th scope="col">Description</th>
                        <th scope="col">positionX</th>
                        <th scope="col">positionY</th>
                        <th scope="col">Photo</th>
                        <th scope="col">Serie</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="photo in this.listPhotos">
                        <td>{{photo.description}}</td>
                        <td>{{photo.positionX}}</td>
                        <td>{{photo.positionY}}</td>
                        <td><img :src='photo.url'></td>
                        <td>{{photo.serie_id}}</td>
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
      photoId: '',
      listPhotos: '',
      listSeries: ''
    }
  },

  
  created () {

    // Requête axios récupérant toutes les séries et envoyant dans header le tokenJWT du localStorage ainsi que l'email
    let tokenBearerSeries = 'Bearer ' + localStorage.token; 
    let nbNonAssignee = 0;

    axios({
        method: "get",
        url: urlAPI + "series",
        headers: {
            "Authorization": tokenBearerSeries,
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

    // Requête axios récupérant toutes les photos lors de l'actualisation de la page et envoyant dans header le tokenJWT du localStorage ainsi que l'email
    let tokenBearerPhotos = 'Bearer ' + localStorage.token; 

    axios({
        method: "get",
        url: urlAPI + "photos",
        headers: {
            "Authorization": tokenBearerPhotos,
            'mail': localStorage.email
        }
        })
        .then(res => {
            const pars = JSON.parse(res.data);
            this.listPhotos = pars.map(item => {
                if(item.serie_id == null) nbNonAssignee += 1
                return item
            })
        if(nbNonAssignee == 0)
        {
            alert("Toutes les photos sont déjà assignées.")
            this.$router.push("/");
        }
        })		
        .catch( err => console.error(err));

    },

  methods: {
    //   Formulaire envoie des données
      sendForm () {

        if(this.photoId.length == 0 || this.serieId.length == 0) {
            alert("Veuillez selectionner une série et une photo.")
            return
        }

        // Requête axios permettant de mettre à jour les données de l'api et envoyant dans header le tokenJWT du localStorage ainsi que l'email
        let tokenBearer = 'Bearer ' + localStorage.token;   
        const elemAss = this.listPhotos.find(element => element.id == this.photoId); 

        const options = {
            method: 'put',
            url: urlAPI + "photos/" + elemAss.id,
            headers: {
                "Authorization": tokenBearer,
                'mail': localStorage.email
            },
            data: {
                "id": elemAss.id,
                "serie_id": this.serieId,
                "description": elemAss.description,
                "url": elemAss.url,
                "position": 
                {
                    "positionX": elemAss.positionX,
                    "positionY": elemAss.positionY
                }
            },
            transformResponse: [(data) => {
                // transform the response
                return data;
                
            }]
        };

        // send the request
        axios(options);  

    },

    retour() {
        this.$router.push("/");
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
  min-width: 790px;
}


.AddPhoto {
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
    margin: 20px auto;
}

.tableauPhotos img {
    width: 80px;
}

label {
  color: white;
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

.assPhoto {
  color: white !important;
  background-color: #ca1384;
  padding: 5px;
  border-radius: 8px;
  font-size: 1.3em;
}

.assPhoto:hover {
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
