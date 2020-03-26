<template>
  <div>
    <Carte></Carte>
  </div>
</template>

<script>
import Carte from "./Carte";
const axios = require("axios");

import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup, LTooltip } from "vue2-leaflet";
export default {
  components: {
    Carte
  },
  data() {
    return {
      idPartie: this.$route.params.id
    };
  },
  created: function() {}
};
</script>

<style>
</style>
