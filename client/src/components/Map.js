import { Map, TileLayer, FeatureGroup, Circle } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import L from "leaflet/dist/leaflet";

function map() {
  var map = L.map("map").setView([-7.770398086343634, 110.37753582000731], 17);
  L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  var editableLayers = new L.FeatureGroup();
  map.addLayer(editableLayers);
  var drawControl = new L.Control.Draw({
    edit: {
      featureGroup: editableLayers,
    },
  });
  map.addControl(drawControl);
  map.on(L.Draw.Event.CREATED, function (event) {
    editableLayers.addLayer(event.layer);
  });
}

export default map;
