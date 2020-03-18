<template>
  <div>
    <div>
      Zoom: level
      <input v-model.number="zoom" type="number" />
      <br />Center :
      <span>{{ center }}</span>
      <br />
      <hr />
      <h3>List of Markers</h3>
      <button name="button" @click="addMarker">Add a marker</button>
      <table>
        <tr>
          <th>Marker</th>
          <th>Latitude</th>
          <th>Longitude</th>
          <th>Tooltip</th>
          <th>Is Draggable ?</th>
          <th>Is Visible ?</th>
          <th>Remove</th>
        </tr>
        <tr v-for="(item, index) in markers" :key="index">
          <td>{{ 'Marker ' + (index + 1) }}</td>
          <td>
            <input v-model.number="item.position.lat" type="number" />
          </td>
          <td>
            <input v-model.number="item.position.lng" type="number" />
          </td>
          <td>
            <input v-model="item.tooltip" type="text" />
          </td>
          <td style="text-align: center">
            <input v-model="item.draggable" type="checkbox" />
          </td>
          <td style="text-align: center">
            <input v-model="item.visible" type="checkbox" />
          </td>
          <td style="text-align: center">
            <input type="button" value="X" @click="removeMarker(index)" />
          </td>
        </tr>
      </table>
      <hr />  
    </div>
    <l-map
      :zoom.sync="zoom"
      :options="mapOptions"
      :center="center"
      :min-zoom="minZoom"
      :max-zoom="maxZoom"
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
        <l-tooltip :content="marker.tooltip" />
      </l-marker>
      <l-layer-group layer-type="overlay" name="Layer polyline">

      </l-layer-group>
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
</template>

<script>
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
  },
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
      center: [51.505, -0.09],
      opacity: 0.6,
      token: "your token if using mapbox",
      mapOptions: {
        zoomControl: false,
        attributionControl: false,
        zoomSnap: true
      },
      zoom: 6,
      minZoom: 1,
      maxZoom: 20,
      imperial: false,
      tileProviders: tileProviders,
      markers: [
        {
          id: "m1",
          position: { lat: 51.505, lng: -0.09 },
          tooltip: "tooltip for marker1",
          draggable: true,
          visible: true
        },
        {
          id: "m2",
          position: { lat: 51.8905, lng: -0.09 },
          tooltip: "tooltip for marker2",
          draggable: true,
          visible: false
        },
        {
          id: "m3",
          position: { lat: 51.005, lng: -0.09 },
          tooltip: "tooltip for marker3",
          draggable: true,
          visible: true
        },
        {
          id: "m4",
          position: { lat: 50.7605, lng: -0.09 },
          tooltip: "tooltip for marker4",
          draggable: true,
          visible: false
        }
      ],
      stuff: [
        {
          id: 's1',
          markers: markers1,
          visible: true,
          markersVisible: true,
        },
      ]
    };
  },
  methods: {
    alert(item) {
      alert("this is " + JSON.stringify(item));
    },
    addMarker: function() {
      const newMarker = {
        position: { lat: 50.5505, lng: -0.09 },
        draggable: true,
        visible: true
      };
      this.markers.push(newMarker);
    },
    removeMarker: function(index) {
      this.markers.splice(index, 1);
    },
  }
};
</script>