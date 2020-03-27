<template>
    <div class="AddPhoto">
        <h1>Assigner une photo</h1>

        <div class="placeTab">
            <h3 class="titreTab">Series</h3>

            <table class="tableauSeries">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Ville</th>
                        <th>Map X</th>
                        <th>Map Y</th>
                        <th>Map zoom</th>
                        <th>Distance</th>
                    </tr>
                </thead>
                    <tr v-for="serie in this.listSeries">
                        <td>{{serie.id}}</td>
                        <td>{{serie.ville}}</td>
                        <td>{{serie.map_x}}</td>
                        <td>{{serie.map_y}}</td>
                        <td>{{serie.map_zoom}}</td>
                        <td>{{serie.distance}}</td>
                    </tr>

                <tbody>

                </tbody>
            </table>

            <h3 class="titreTab">Photos</h3>

            <table class="tableauPhotos">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>positionX</th>
                        <th>positionY</th>
                        <th>Photo</th>
                        <th>Serie</th>
                    </tr>
                </thead>
                    <tr v-for="photo in this.listPhotos">
                        <td>{{photo.description}}</td>
                        <td>{{photo.positionX}}</td>
                        <td>{{photo.positionY}}</td>
                        <td><img :src='photo.url'></td>
                        <td>{{photo.serie_id}}</td>
                    </tr>

                <tbody>

                </tbody>
            </table>
        </div>

        <div id="affectPhoto">
            
            <p>Choisir une série : </p>
            <select v-model="serieId" >
                <option value="" disabled>Choisissez</option>
                <option v-bind:value="serie.id" v-for="serie in this.listSeries">{{serie.ville}}</option>
            </select>
           
           <p>Choisir une photo : </p>
            <select v-model="photoId" >
                <option value="" disabled>Choisissez</option>
                <option v-if="photo.serie_id == null" v-bind:value="photo.id" v-for="photo in this.listPhotos">{{photo.description}}</option>
            </select>

            <p>
                <button v-on:click="sendForm">Assigner</button>
            </p>

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

    axios({
        method: "get",
        url: urlAPI + "series",
        headers: {
            "Authorization": tokenBearerSeries,
            'mail': localStorage.mail
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

    }
  }
}

</script>

<style>
.tableauSeries, .tableauPhotos {
    border: 1px solid black;
    margin: 0 auto;
}

.tableauPhotos img {
    width: 80px;
}

</style>
