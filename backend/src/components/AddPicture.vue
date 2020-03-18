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
                    <tr v-for="serie in listOfDatasSeries">
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
                    <tr v-for="photo in listOfDatasPhotos">
                        <td>{{photo.description}}</td>
                        <td>{{photo.position_x}}</td>
                        <td>{{photo.position_y}}</td>
                        <td><img :src='photo.url'></td>
                        <td>{{photo.serie_id}}</td>
                    </tr>

                <tbody>

                </tbody>
            </table>
        </div>

        <form id="affectPhoto" @submit="checkForm" action="/something" method="post">
  
            <p v-if="errors.length">
                <b>Veuillez remplir ces champs:</b>
                <ul>
                <li v-for="error in errors">{{ error }}</li>
                </ul>
            </p>
            
            <p>
                <label for="ville">Ville<label>
                <input type="text" name="ville" id="ville" v-model="ville">
            </p>

            <p>
                <label for="mapX">Map_x<label>
                <input type="number" name="age" id="age" v-model="age" min="0">
            </p>

            <p>
                <label for="movie">Favorite Movie<label>
                <select name="movie" id="movie" v-model="movie">
                <option>Star Wars</option>
                <option>Vanilla Sky</option>
                <option>Atomic Blonde</option>
                </select>
            </p>

            <p>
                <input type="submit" value="Submit">  
            </p>

        </form>
    </div>
</template>

<script>
import datasSeries from '../assets/serie.json'
import datasPhotos from '../assets/photo.json'

export default {
  name: 'addpho',
  data () {
    return {
      series: []
    }
  },

  methods: {

  },

  computed: {

    listOfDatasSeries () {
      return datasSeries.series.map(item => {
        return item
      })
    },

    listOfDatasPhotos () {
      return datasPhotos.photos.map(item => {
        return item
      })
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
