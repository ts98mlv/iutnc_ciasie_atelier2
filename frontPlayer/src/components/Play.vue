<template>
  <div>
    <Carte></Carte>
  </div>
</template>

<script>
import serie from "../assets/serie.json";
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
    };
  },
  computed: {
    listeSerie() {
      return serie.series.find(element => {
        return element.id == this.idPartie;
      });
    },
  },
  created: function() {
    this.center = latLng(this.listeSerie.map_x, this.listeSerie.map_y);
    this.withPopup = latLng(49.132728, 6.198789);
    this.partieStatus = 2;
  }
};
</script>

<style>
</style>
