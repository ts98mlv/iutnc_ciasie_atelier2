<template>
    <div class="AddPhoto">
        <h1>Toutes les séries</h1>

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

        </div>
    </div>
</template>

<script>
import datasSeries from '../assets/serie.json'
import axios from "axios"

const urlAPI = "http://d3292950.ngrok.io/"

export default {

  data () {
    return {
      serieId: '',
      test: 'salut',
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
    }
  }
}

</script>

<style>
.tableauSeries {
    border: 1px solid black;
    margin: 0 auto;
}

</style>
