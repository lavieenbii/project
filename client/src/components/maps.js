import "leaflet/dist/leaflet.css";
import L from "leaflet/dist/leaflet";
import { useEffect } from "react";
import Axious from "../../node_modules/axios";
import { icon, marker } from "leaflet";

const layerGroup = L.layerGroup([]);

const saveToDatabase = () => {
  let namaMisi = prompt("enter mission name");
  Axious.post("http://localhost:3001/", {
    namaMisi: namaMisi,
    geoJSON: JSON.stringify(layerGroup.toGeoJSON()),
  });
};

function Map() {
  const centerCoor = [-7.770905, 110.377637];

  useEffect(() => {
    const mymap = L.map("mapid", {
      center: centerCoor,
      zoom: 18,
    });

    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGF2aWVlbmJpaSIsImEiOiJja3dlY2xubzUwM2VoMzFwbWJ0OTFtbmx4In0.GLTaBJJrhb5ZQVP2fsZYhw",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/satellite-v9",
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          "pk.eyJ1IjoibGF2aWVlbmJpaSIsImEiOiJja3dlY2xubzUwM2VoMzFwbWJ0OTFtbmx4In0.GLTaBJJrhb5ZQVP2fsZYhw",
      }
    ).addTo(mymap);

    //TODO: icon
    const myIcon = L.icon({
      iconUrl: "img/marker.png",
      iconSize: [40, 40],
      iconAnchor: [40, 40],
    });

    const polyline = L.polyline([], { color: "red" });
    layerGroup.addLayer(polyline).addTo(mymap);

    // event click map
    mymap.on("click", (e) => {
      const { lat, lng } = e.latlng;
      polyline.addLatLng([lat, lng]);
      layerGroup.addLayer(L.marker([lat, lng], { icon: myIcon }));
    });

    document.addEventListener("keypress", (e) => {
      if (e.code === "Space") {
        polyline.remove(mymap);
        layerGroup.remove(mymap);
      }
    });

    return () => {
      mymap.off();
      mymap.remove();
    };
  });

  return (
    <>
      <div id="mapid" style={{ width: "100%", height: "600px"}}></div><br/>
      <button onClick={saveToDatabase}>Create</button>
    </>
  );
}

export default Map;
