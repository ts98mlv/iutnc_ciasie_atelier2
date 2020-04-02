<template>
    <div class="CreateSer col-10 col-sm-6 mx-auto col-lg-6 pb-3">
        <div class="btn-back row" @click="retour">
            <div class="back ml-4"><i class="fas fa-chevron-left"></i> Retour</div>
        </div>
        <h1>Créer une série</h1>
        <hr>
        <div class="formCreate">
            <label class="labelCity mt-3">Ville :</label><br>
                <input type="text" class="" name="city" v-model="city" placeholder="Paris"><br>
            <label class="labelMapX mt-3">Position X :</label><br>
                <input type="number" v-model="mapX" class="mapX" value="0.0" step="0.01"><br>
            <label class="labelMapY mt-3">Position Y :</label><br>
                <input type="number" v-model="mapY" class="mapY" value="0.0" step="0.01"><br>
            <label class="labelMapX mt-3">Map Zoom :</label><br>
                <input type="number" v-model="mapZoom" class="mapZoom mb-4" value="0" step="1"><br>

            <a class="createSerie" @click="createS">Créer <i class="fas fa-map-marker-alt"></i></a>
            
        </div>

        
    </div>
</template>

<script>
import axios from "axios"

const urlAPI = "http://docketu.iutnc.univ-lorraine.fr:17280/"

export default {

  data () {
    return {
      city: '',
      mapX: '0.0',
      mapY: '0.0',
      mapZoom: '0'
    }
  },

  
  created () {

    },

  methods: {
    //   Formulaire envoie des données
      createS () {

        if(this.city.length == 0 || this.mapX.length == 0 || this.mapY.length == 0 || this.mapX == null || this.mapY == null || this.mapZoom.length == 0 ) {
            alert("Veuillez remplir tous les champs.")
            return
        }

        // Requête axios permettant de mettre à jour les données de l'api et envoyant dans header le tokenJWT du localStorage ainsi que l'email
        let tokenBearer = 'Bearer ' + localStorage.token;   

      axios({
          method: "post",
          url: urlAPI + "series",
          headers: {
              "Authorization": tokenBearer,
              'mail': localStorage.email
          },
          data: {
              "ville": this.city,
              "map_refs" : {
                  "map_x": this.mapX,
                  "map_y": this.mapY,
                  "map_zoom": this.mapZoom,
              }
          }
        })
			.then(res => {
				console.log(res)
        
			})		
      .catch( err => console.error(err));

      alert("Votre série a bien été enregistrée.")
      this.$router.push("/#");

    },
        
    retour() {
        this.$router.push("/#");
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
    min-width: 600px;       
}

.CreateSer {
  background-color: #910c5ee8;
  margin-top: 10vh;
  border-radius: 15px;
  padding: 10px;
}

label {
  color: white;
}

input {
    border-radius: 5px;
    padding: 2px;
    padding-left: 8px;
}

h1 {
  color: white;
}

.createSerie {
  color: white !important;
  background-color: #ca1384;
  padding: 5px;
  border-radius: 8px;
  font-size: 1.3em;
}

.createSerie:hover {
  text-decoration: none;
  color: #d4d4d4;
}

hr {
  width: 70%;
  border: 1px solid #31313140;
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

a {
    cursor: pointer;
}

</style>
