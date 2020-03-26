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
                        <td><router-link v-bind:to="'/series/'+serie.id">Detail</router-link></td>
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
      }
}

</script>

<style>
.tableauSeries {
    border: 1px solid black;
    margin: 0 auto;
}

</style>
