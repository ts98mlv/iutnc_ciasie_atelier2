<template>
    <div class="AddPhoto">
        <h1>Saluuuuuuuuuuuut</h1>

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
import datasSeries from '../assets/serie.json'
import datasPhotos from '../assets/photo.json'
import axios from "axios"

const urlAPI = "http://d3292950.ngrok.io/"

export default {

  data () {
    return {
      serieId: '',
      photoId: '',
      test: 'salut',
      listPhotos: '',
      listSeries: ''
    }
  },

  filters: {

  },
  
  created () {

            axios.get(urlAPI)
            .then( (res) => {
                console.log(res.data); // res.data contains request data
                
            })
            .catch( err => console.error(err));
      },

  methods: {
      sendForm () {
        // datasPhotos.photos.push({description: this.test, position: {position_x: 54.2458, position_y: 36.48542}, url: "https://res.cloudinary.com/du5jifpgg/image/upload/t_opengraph_image/Surcharge-APIDAE/Mus%C3%A9e%20du%20Louvre%20Paris.jpg", serie_id: 2});
        datasPhotos.photos.map(item => {
        //if (item.id = this.photoId) item.serie_id = this.serieId
        console.log("if " + item.id + " = " + this.photoId + " alors " + item.serie_id + " prend " + this.serieId)
        // console.log("id photo " + item.id + " id photo choisi " + this.photoId)
      })
      }

    },

  computed: {

    listOfDatasSeries () {
        axios.get(urlAPI + "series")
            .then( (res) => {
                const pars = JSON.parse(res.data);
                this.listSeries = pars.map(item => {
                    return item
                })
                
            })
            .catch( err => console.error(err));
    },

    listOfDatasPhotos () {
        axios.get(urlAPI + "photos")
            .then( (res) => {
                const pars = JSON.parse(res.data);
                this.listPhotos = pars.map(item => {
                    return item
                })
                
            })
            .catch( err => console.error(err));
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
