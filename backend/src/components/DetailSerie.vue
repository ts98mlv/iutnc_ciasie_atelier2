<template>
    <div class="AddPhoto">
        <h1>Info de la série {{$route.params.id}}</h1>

        <div class="placeTab">

            <h3 class="titreTab">Serie</h3>

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
                    <!-- Condition pour afficher seulement la série selon l'id obtenu grâce à la route -->
                   <tr v-if="serie.id == $route.params.id" v-for="serie in this.listSeries">
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
            // Reqête axios récupérant la série selon son id obtenu grâce à $route.params
            // axios.get(urlAPI + "serie" + serieId)
            // .then( (res) => {
            //     const pars = JSON.parse(res.data);
            //     this.listSeries = pars.map(item => {
            //         return item
            //     })
                
            // })
            // .catch( err => console.error(err));

            // Reqête axios récupérant la série selon son id obtenu grâce à $route.params et envoyant dans header le tokenJWT du localStorage ainsi que l'email
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
                console.log(this.listSeries)
			})		
			.catch( err => console.error(err));
      },

  methods: {

    },

  computed: {

    listOfDatasSerieById () {
        

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
