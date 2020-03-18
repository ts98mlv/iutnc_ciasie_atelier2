<template>
  <div>
    <h3>LE JEU COMMENCE {{idPartie}}</h3>
    <p>Image à placer :</p>
    <img v-bind:src="this.tabImages[compteurImg].url" alt />
    <Carte></Carte>
  </div>
</template>

<script>
import serie from "../assets/serie.json";
import photo from "../assets/photo.json";
import Carte from "./Carte";

import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup, LTooltip } from "vue2-leaflet";
export default {
  components: {
    Carte
  },
  data() {
    return {
      idPartie: this.$route.params.id,
      tabImages: [],
      compteurImg : 0
    };
  },
  computed: {
    listeSerie() {
      return serie.series.find(element => {
        return element.id == this.idPartie;
      });
    },
    image() {}
  },
  created: function() {
    this.center = latLng(this.listeSerie.map_x, this.listeSerie.map_y);
    this.withPopup = latLng(49.132728, 6.198789);
    this.partieStatus = 2;
    photo.photos.forEach(element => {
      if (element.serie_id == this.idPartie) {
        this.tabImages.push(element);
      }
    });
  }
};
</script>

<style>
</style>
