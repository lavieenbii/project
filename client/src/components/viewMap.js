import React from "react";

import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { useRef, useState } from "react";
import osm from "./osmprov";


function MyMap() {
  const center = [-7.770905, 110.377637];
  const [mapLayer, setmapLayer] = useState([]);
  const ZoomLevel = 20;
  const mapRef = useRef();
  
  const _onCreate = e => {
    console.log(e);

    const {layer} = e;
    const { _leaflet_id } = layer;
    setmapLayer((layers) => [
      ...layers,
      {id: _leaflet_id, latlngs: layer.getLatLngs()[0]},
    ]);
  }

  const _onEdited = e => {
    console.log(e);

    const {
      layers: { _layers },
    } = e;

    Object.values(_layers).map(({_leaflet_id, editing}) => {
      setmapLayer((layers) =>
        layers.map((l) =>
          l.id === _leaflet_id
            ? {...l, latlngs: {...editing.latlngs[0]}} : l
        )
      );
    });
  };

  const _onDeleted = e => {
    console.log(e);
    const {
      layers: {_layers},
    } = e;

    Object.values(_layers).map(({_leaflet_id}) => {
      setmapLayer((layers) => layers.filter((l) => l.id !== _leaflet_id));
    });
  };

  return(
    <>
      <div>
        <div>
          <MapContainer center={center} zoom={ZoomLevel}>
            <FeatureGroup>
              <EditControl
                position='topright'
                onEdited={_onEdited}
                onCreated={_onCreate}
                onDeleted={_onDeleted}
              />
            </FeatureGroup>
            <TileLayer url="https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=IRZOzRLVldKCJpJ8qS0V" 
                      attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'/>
          </MapContainer>
        </div>
      </div>
    </>
  );
}

export default MyMap;
