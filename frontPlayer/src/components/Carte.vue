<template>
  <div v-if="this.statusPartie == 2">
    <div>
      <br />
      <hr />
      <div
        style="width : 100%; height : 180px; margin:auto; display : flex; justify-content: space-between"
      >
        <h3 style="line-height:125px;">Image à placer : {{tabImages[compteurImg].description}}</h3>
        <img
          style="	max-width:100%;max-height:100%;"
          v-bind:src="this.tabImages[compteurImg].url"
          alt
        />

        <h3 style>Temps restant : {{ timer }}</h3>
        <h3 style>Score : {{ score }}</h3>
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
      style="height: 500px; width: 100%"
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
  <div v-else>
    <h3>Votre partie est terminée. Votre score est de {{score}}</h3>
    <router-link
      v-bind:to="'/end/'+pseudo+ '/' + selected + '/' + score"
    > Cliqué ici si vous voulez enregistrer votre score </router-link>
  </div>
</template>

<script>
import serie from "../assets/serie.json";
import photo from "../assets/photo.json";

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

const markers1 = [
  {
    position: { lng: -1.219482, lat: 47.41322 },
    visible: true,
    draggable: true
  }
];

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
      selected: this.$route.params.id,
      pseudo: this.$route.params.pseudo,
      center: [0, 0],
      tabImages: [],
      compteurImg: 0,
      timer: 20,
      score: 0,
      distance: 0,
      statusPartie: 2,
      idPartie: this.$route.params.id,
      opacity: 0.6,
      token: "your token if using mapbox",
      mapOptions: {
        zoomControl: false,
        attributionControl: false,
        zoomSnap: true
      },
      zoom: 13,
      minZoom: 1,
      maxZoom: 20,
      imperial: false,
      tileProviders: tileProviders,
      markers: [],
      stuff: [
        {
          id: "s1",
          markers: markers1,
          visible: true,
          markersVisible: true
        }
      ]
    };
  },
  methods: {
    timerFunction() {
      if (this.timer > 0) {
        setTimeout(() => {
          this.timer -= 1;
          this.timerFunction();
        }, 1000);
      }
      if (this.timer == 0 && this.compteurImg == this.tabImages.length) {
        this.statusPartie = 3;
        this.timer = -500;
        //alert("Fin de partie, c'était la dernière image");
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
    alert(item) {
      alert("this is " + JSON.stringify(item));
    },
    addMarker: function() {
      if (
        confirm(
          "Souhaitez-vous confirmer votre choix ? Vous ne pourrez plus le modifier"
        )
      ) {
        const newMarker = {
          position: { lat: 50.5505, lng: -0.09 },
          draggable: false,
          visible: true
        };
      }
      this.markers.push(newMarker);
    },
    removeMarker: function(index) {
      this.markers.splice(index, 1);
    },
    onMapClick(e) {
      if (this.markers.length > this.tabImages.length - 1) {
        alert(
          "Vous avez insérer toutes les photos sur la map. Vous pouvez mettre fin à la partie en cliquant sur OK."
        );
        this.statusPartie = 3;
        this.timer = -500;
      } else {
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
          if (
            newMarker.position.lat >=
              this.tabImages[this.compteurImg].position_x &&
            newMarker.position.lng >=
              this.tabImages[this.compteurImg].position_y
          ) {
            this.distance +=
              this.distance +
              (newMarker.position.lat -
                this.tabImages[this.compteurImg].position_x) +
              (newMarker.position.lng -
                this.tabImages[this.compteurImg].position_y);
          } else if (
            newMarker.position.lat <=
              this.tabImages[this.compteurImg].position_x &&
            newMarker.position.lng >=
              this.tabImages[this.compteurImg].position_y
          ) {
            this.distance +=
              this.distance +
              (this.tabImages[this.compteurImg].position_x -
                newMarker.position.lat) +
              (newMarker.position.lng -
                this.tabImages[this.compteurImg].position_y);
          } else if (
            newMarker.position.lat <=
              this.tabImages[this.compteurImg].position_x &&
            newMarker.position.lng <=
              this.tabImages[this.compteurImg].position_y
          ) {
            this.distance +=
              this.distance +
              (this.tabImages[this.compteurImg].position_x -
                newMarker.position.lat) +
              (this.tabImages[this.compteurImg].position_y -
                newMarker.position.lng);
          } else if (
            newMarker.position.lat >=
              this.tabImages[this.compteurImg].position_x &&
            newMarker.position.lng <=
              this.tabImages[this.compteurImg].position_y
          ) {
            this.distance +=
              this.distance +
              (newMarker.position.lat -
                this.tabImages[this.compteurImg].position_x) +
              (this.tabImages[this.compteurImg].position_y -
                newMarker.position.lng);
          }
          // Ajout de point
          if (this.distance < this.listeSerie.distance) {
            this.score = this.score + 5;
          } else if (this.distance < this.listeSerie.distance * 2) {
            this.score = this.score + 3;
          } else if (this.distance < this.listeSerie.distance * 3) {
            this.score = this.score + 1;
          }

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

          if (this.compteurImg > this.tabImages.length - 1) {
            this.markers.push(newMarker);
            this.statusPartie = 3;
            this.timer = -500;
          }
          if (this.compteurImg < this.tabImages.length - 1) {
            this.compteurImg++;
            this.timer = 20;
          }
        }
      }
    }
  },
  created: function() {
    this.center = [this.listeSerie.map_x, this.listeSerie.map_y];
    this.timerFunction();
    photo.photos.forEach(element => {
      if (element.serie_id == this.idPartie) {
        this.tabImages.push(element);
      }
    });
  },
  beforeUpdate: function() {
    if (this.statusPartie == 3) {
      alert("ntm");
    }
    if (this.markers.length > this.tabImages.length - 1) {
      alert(
        "Fin de la partie"
      );
      this.statusPartie = 3;
      this.timer = -500;
    }
  },
  computed: {
    listeSerie() {
      return serie.series.find(element => {
        return element.id == this.idPartie;
      });
    }
  }
};
</script>

<style>

</style>