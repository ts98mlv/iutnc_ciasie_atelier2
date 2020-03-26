<template>
  <div v-if="this.statusPartie == 2">
    <div>
      <br />
      <hr />
      <div class="detail">
        <div class="item1 text-center">
          <h3>Image à placer :</h3>
        </div>
        <div class="item2 text-center">
          <h3>{{tabImages[compteurImg].description}}</h3>
        </div>
        <div class="item3">
          <img v-bind:src="this.tabImages[compteurImg].url" alt />
        </div>
        <div class="item4 text-center">
          <h3 style>Temps restant : {{ timer }}</h3>
          <br />
        </div>
        <div class="item5 text-center">
          <h3 style>Score : {{ score }}</h3>
        </div>
      </div>
      <hr />
    </div>
    <l-map
      :zoom.sync="zoom"
      :options="mapOptions"
      :center="center"
      :min-zoom="minZoom"
      :max-zoom="maxZoom"
      @click="onMapClick"
      style="height: 500px; width: 97%; margin:0 auto;"
    >
      <l-tile-layer
        v-for="tileProvider in tileProviders"
        :key="tileProvider.name"
        :visible="tileProvider.visible"
        :url="tileProvider.url"
        :attribution="tileProvider.attribution"
        :token="token"
        layer-type="base"
      />
      <l-control-scale :imperial="imperial" />
      <l-marker
        v-for="marker in markers"
        :key="marker.id"
        :visible="marker.visible"
        :draggable="marker.draggable"
        :lat-lng.sync="marker.position"
        :icon="marker.icon"
        @click="alert(marker)"
      >
        <l-popup :content="marker.tooltip" />
        <l-tooltip :options="{ permanent: true, interactive: true }" :content="marker.tooltip" />
      </l-marker>
      <l-layer-group layer-type="overlay" name="Layer polyline"></l-layer-group>
      <l-layer-group
        v-for="item in stuff"
        :key="item.id"
        :visible.sync="item.visible"
        layer-type="overlay"
        name="Layer 1"
      >
        <l-layer-group :visible="item.markersVisible">
          <l-marker
            v-for="marker in item.markers"
            :key="marker.id"
            :visible="marker.visible"
            :draggable="marker.draggable"
            :lat-lng="marker.position"
            @click="alert(marker)"
          />
        </l-layer-group>
      </l-layer-group>
    </l-map>
  </div>
  <div class="text-center" style="margin-top:20px;" v-else>
    <h3>Votre partie est terminée. Votre score est de {{score}}</h3>
    <button
      type="button"
      class="btn btn-secondary text-center"
      v-on:click="$router.push({path:'/end/' + idSerie +'/' + idPartie + '/' + score})"
    >Cliqué ici si vous voulez enregistrer votre score</button>
  </div>
</template>

<script>
const axios = require("axios");

import { latLngBounds } from "leaflet";
import {
  LMap,
  LTileLayer,
  LMarker,
  LPolyline,
  LLayerGroup,
  LTooltip,
  LPopup,
  LControlZoom,
  LControlAttribution,
  LControlScale,
  LControlLayers
} from "vue2-leaflet";

const tileProviders = [
  {
    name: "OpenStreetMap",
    visible: true,
    attribution:
      '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  },
  {
    name: "OpenTopoMap",
    visible: false,
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    attribution:
      'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  }
];

export default {
  name: "Example",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPolyline,
    LLayerGroup,
    LTooltip,
    LPopup,
    LControlZoom,
    LControlAttribution,
    LControlScale,
    LControlLayers
  },

  data() {
    return {
      idPartie: this.$route.params.id,
      idSerie: this.$route.params.serid,
      pseudo: this.$route.params.pseudo,
      center: [0, 0],
      tabImages: [],
      compteurImg: 0,
      timer: 20,
      score: 0,
      serie: "",
      distance: 0,
      statusPartie: 2,
      opacity: 0.6,
      token: "your token if using mapbox",
      mapOptions: {
        zoomControl: true,
        attributionControl: false,
        zoomSnap: true,
        scrollWheelZoom: false
      },
      zoom: 13,
      minZoom: 1,
      maxZoom: 20,
      imperial: false,
      tileProviders: tileProviders,
      markers: [],
      stuff: []
    };
  },
  methods: {
    // Fonction pour le timer
    timerFunction() {
      // Si c supérieur à 0 on décrémente de 1 toute les secondes
      if (this.timer > 0) {
        setTimeout(() => {
          this.timer -= 1;
          this.timerFunction();
        }, 1000);
      }
      // Si il est à 0 et que il n'y a plus d'image, on met fin à la partie
      if (this.timer == 0 && this.compteurImg == this.tabImages.length) {
        this.statusPartie = 3;
        this.timer = -500;
        // Si ce n'est pas la dernière image, on remet le timer à 20 et on passe à l'image suivante
      } else if (this.timer == 0) {
        alert("Trop tard, photo suivante ! ");
        this.compteurImg++;
        this.markers.push("Pas trouvé");
        this.timer = 20;
        setTimeout(() => {
          this.timer -= 1;
          this.timerFunction();
        }, 1000);
      }
    },
    // Pour ajouter une image sur la carte
    onMapClick(e) {
      if (
        confirm(
          "Souhaitez-vous confirmer votre choix ? Vous ne pourrez plus le modifier"
        )
      ) {
        const newMarker = {
          position: { lat: e.latlng.lat, lng: e.latlng.lng },
          tooltip: this.tabImages[this.compteurImg].description,
          draggable: false,
          visible: true
        };
        this.markers.push(newMarker);

        /* ------------ CALCUL DU SCORE ------------------- */
        /* ------------ CALCUL DU SCORE ------------------- */
        /* ------------ CALCUL DU SCORE ------------------- */
        /* ------------ CALCUL DU SCORE ------------------- */
        // En fonction de la distance et du temps
        if (
          newMarker.position.lat >=
            this.tabImages[this.compteurImg].positionX &&
          newMarker.position.lng >= this.tabImages[this.compteurImg].positionY
        ) {
          this.distance +=
            this.distance +
            (newMarker.position.lat -
              this.tabImages[this.compteurImg].positionX) +
            (newMarker.position.lng -
              this.tabImages[this.compteurImg].positionY);
        } else if (
          newMarker.position.lat <=
            this.tabImages[this.compteurImg].positionX &&
          newMarker.position.lng >= this.tabImages[this.compteurImg].positionY
        ) {
          this.distance +=
            this.distance +
            (this.tabImages[this.compteurImg].positionX -
              newMarker.position.lat) +
            (newMarker.position.lng -
              this.tabImages[this.compteurImg].positionY);
        } else if (
          newMarker.position.lat <=
            this.tabImages[this.compteurImg].positionX &&
          newMarker.position.lng <= this.tabImages[this.compteurImg].positionY
        ) {
          this.distance +=
            this.distance +
            (this.tabImages[this.compteurImg].positionX -
              newMarker.position.lat) +
            (this.tabImages[this.compteurImg].positionY -
              newMarker.position.lng);
        } else if (
          newMarker.position.lat >=
            this.tabImages[this.compteurImg].positionX &&
          newMarker.position.lng <= this.tabImages[this.compteurImg].positionY
        ) {
          this.distance +=
            this.distance +
            (newMarker.position.lat -
              this.tabImages[this.compteurImg].positionX) +
            (this.tabImages[this.compteurImg].positionY -
              newMarker.position.lng);
        }
        // Ajout de point
        if (this.distance < this.serie.distance) {
          this.score = this.score + 5;
        } else if (this.distance < this.serie.distance * 2) {
          this.score = this.score + 3;
        } else if (this.distance < this.serie.distance * 3) {
          this.score = this.score + 1;
        }

        // On multiplie le score en fonction du temps
        if (this.timer >= 15) {
          this.score = this.score * 4;
        } else if (this.timer >= 10 && this.timer <= 15) {
          this.score = this.score * 2;
        }

        this.distance = 0;

        /* ------------ FIN DU CALCUL DU SCORE ------------------- */
        /* ------------ FIN DU CALCUL DU SCORE ------------------- */
        /* ------------ FIN DU CALCUL DU SCORE ------------------- */
        /* ------------ FIN DU CALCUL DU SCORE ------------------- */

        // Si c la dernière image on met fin à la partie
        if (this.compteurImg > this.tabImages.length - 1) {
          this.markers.push(newMarker);
          this.statusPartie = 3;
          this.timer = -500;
        }
        // Et si non, on passe à la photo suivante en remettant le timer à 20
        if (this.compteurImg < this.tabImages.length - 1) {
          this.compteurImg++;
          this.timer = 20;
        }
      }
    },
    // Pour recup info de la partie et trouver la bonne série
    findPartie() {
      axios
        /*
        .get(
          "http://docketu.iutnc.univ-lorraine.fr:17180/series/" + this.idPartie
        )
        */
        .get("https://58de787a.ngrok.io/parties/" + this.idPartie)

        .then(response => {
          // handle success
          console.log(response);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        })
        .finally(function() {
          // always executed
        });
    },
    // Récupère la bonne série dans l'Api ainsi que ses infos + Place la map avec bon coordonnée
    getSerie() {
      axios
        /*
        .get(
          "http://docketu.iutnc.univ-lorraine.fr:17180/series/" + this.idPartie
        )
        */
        .get("https://58de787a.ngrok.io/series/" + this.idSerie)

        .then(response => {
          // handle success
          console.log(response.data[0]);
          this.serie = response.data[0];
          this.center = [this.serie.map_x, this.serie.map_y];
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        })
        .finally(function() {
          // always executed
        });
    },
    getnbPhoto() {
      // Pour afficher le nombre de photo qu'il y a dans la série
      axios
        /*
        .get(
          "http://docketu.iutnc.univ-lorraine.fr:17180/series/" +
            this.idPartie +
            "/photos"
        )
        */
        .get("https://58de787a.ngrok.io/series/" + this.idSerie + "/photos")

        .then(response => {
          // handle success
          console.log(response);
          response.data.photos.forEach(element => {
            this.tabImages.push(element);
          });
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        })
        .finally(function() {
          // always executed
        });
    }
  },
  created: function() {
    this.findPartie();
    // On met la bonne carte (associée à la ville de la série)
    this.getSerie();
    // On met en place le timer
    this.timerFunction();
    // On récupère les photos
    this.getnbPhoto();
  },
  beforeUpdate: function() {
    // Si il n'y a plus d'image, on met fin à la partie
    if (this.markers.length > this.tabImages.length - 1) {
      alert("Fin de la partie");
      this.statusPartie = 3;
      this.timer = -500;
    }
  }
};
</script>

<style>
@import "../style/css/Carte.css";
</style>