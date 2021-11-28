import "leaflet/dist/leaflet.css";
import L from "leaflet/dist/leaflet";
import { useEffect } from "react";

function Map() {
  const centerCoor = [-7.770905, 110.377637];

  useEffect(() => {
    const mymap = L.map("mapid", {
      center: centerCoor,
      zoom: 18,
    });

    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZGhpZXMiLCJhIjoiY2t3ZWVybTFqMDQwczJ2bHA0ZTliazNqNiJ9.Scgg6H-jCWM4Dv06JmhaMw",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
      }
    ).addTo(mymap);
  }, []);

  return (
    <>
      <div id="mapid" style={{ height: "100vh" }}></div>
    </>
  );
}

export default Map;
