<template>
    <div class="AddPhoto">
        <h1>Toutes les photos de l'id {{$route.params.id}}</h1>

        <div class="placeTab">

            <h3 class="titreTab">Photos</h3>

            <table  class="tableauPhotos">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>positionX</th>
                        <th>positionY</th>
                        <th>Photo</th>
                        <th>Serie</th>
                    </tr>
                </thead>
                    <tr v-if="photo.id == $route.params.id" v-for="photo in this.listPhotos">
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
    </div>
</template>

<script>
import datasPhotos from '../assets/photo.json'
import axios from "axios"

const urlAPI = "http://docketu.iutnc.univ-lorraine.fr:17280/"

export default {

  data () {
    return {
      photoId: '',
      listPhotos: ''
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

        // Reqête axios récupérant toutes les photos lors de l'actualisation de la page
        axios.get(urlAPI + "photos")
            .then( (res) => {
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

    listOfDatasPhotosById () {


        return datasPhotos.map(item => {
            return item;
        });
    }
  }
}

</script>

<style>
.tableauPhotos {
    border: 1px solid black;
    margin: 0 auto;
}

.tableauPhotos img {
    width: 80px;
}

</style>
