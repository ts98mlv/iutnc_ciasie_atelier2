<template>
    <div class="CreateSer col-10 col-sm-6 mx-auto col-lg-6">
        <div class="btn-back row" @click="retour">
            <div class="back ml-4"><i class="fas fa-chevron-left"></i> Retour</div>
        </div>
        <h1>Créer une série</h1>

        <div class="placeTab">

            
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
                this.reload();
            }]
        };

        // send the request
        axios(options);  

    //     // return
    //     axios.put(urlAPI + "photos/" + elemAss.id, {
    //             "serie_id": this.serieId
    //         })
    //         .then(res => {
    //             console.log("reussi : " + res)
    //         })
    //         .catch(err => console.error("non :" + err))
    //         return

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

h1 {
  color: white;
}

hr {
  width: 70%;
  border: 1px solid #31313140;
}
.tableauSeries, .tableauPhotos {
    border: 1px solid black;
    margin: 0 auto;
}

.tableauPhotos img {
    width: 80px;
}

.back {
  background-color: #ca1384;
  font-size: 1.3em;
  padding: 4px;
  padding-left: 7px;
  padding-right: 7px;
  border-radius: 8px;
}

.btn-back {
  cursor: pointer;
}

</style>
