import "./App.css";
import Map from "./components/maps";
import MyMap from "./components/viewMap"
import { useState, useEffect } from "react";
import Axious from "../node_modules/axios";
import "leaflet/dist/leaflet.css";
import React from 'react'

function App() {
  const [namaMisi, setNamaMisi] = useState("");
  const [geoJSON, setGeoJSON] = useState("");
  const [missionList, setMissionList] = useState([]);
  const [newMissionName, setNewMissionName] = useState("");
  const [geoJsonData, setGeoJsonData] = useState([]);

  useEffect(() => {
    Axious.get("http://localhost:3001/").then((response) => {
      setMissionList(response.data);
    });
  }, []);

  const createMission = () => {
    Axious.post("http://localhost:3001/", {
      namaMisi: namaMisi,
      geoJSON: geoJSON,
    });
    setMissionList([...missionList, { namaMisi: namaMisi, geoJSON: geoJSON }]);
  };

  const deleteMission = (id) => {
    Axious.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      alert("your mission is deleted");
    });
  };

  const updateName = (id) => {
    Axious.put(`http://localhost:3001/update/${id}`, {
      namaMisi: newMissionName,
      id: id,
    }).then((response) => {
      setMissionList(
        missionList.map((val) => {
          return val.planId == id
            ? {
                id: val.planId,
                namaMisi: newMissionName,
              }
            : val;
        })
      );
    });
  };


  // const showGeoJson = (id) => {
  //   Axious.get(`http://localhost:3001/${id}`).then((response) => {
  //     setGeoJsonData(
  //       geoJsonData.map((val) => {
  //         return val.g3wp;
  //       })
  //     );
  //   });
  // };

  const showGeoJson = (id) => {
    Axious.post(`http://localhost:3001/${id}`, {
      geoJSON: geoJSON,
    });
    setGeoJsonData([...geoJsonData, { geoJSON: geoJSON }]);
  };

  // const saveToDatabase = (id) => {
  //   let currentNamaMisi = { };
  //   let namaMisi = prompt("Mission name: (empty means no change)");
  //   if(namaMisi === " "){
  //     namaMisi = currentNamaMisi;
  //   }
  //   Axious.put(`http://localhost:3001/${id}`, {
  //     currentNamaMisi: namaMisi,
  //     id: id,
  //     geoJSON: JSON.stringify(layerGroup.toGeoJSON()),
  //   }, (data) => {
  //     if(data=='OK'){
  //       namaMisi = {val.planName}
  //     }
  //   });
  // }

  // const updateName = (id) => {
  //   Axious.put(`http://localhost:3001/update/${id}/${newMissionName}`, {
  //     namaMisi: newMissionName,
  //     id: id,
  //   }).then((response) => {
  //     alert("your mission name is update");
  //   });
  // };

  return (
    <main>
      <div className="App">
        <header className="App-header">
          <b>
            <div className="Head-comp">Ground Control Station</div>
          </b>
        </header>
        <h1>Create Your Mission</h1>
        <h4>Make your own mission plane by write down the mission</h4>
        <div className="writemisi">
          <br/><label>Mission Name : </label>
          <input
            type="text"
            name="namaMisi"
            onChange={(event) => {
              setNamaMisi(event.target.value);
            }}
          /><br/><br/>
          <label>GeoJSON &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </label>
          <input
            type="text"
            name="geoJSON"
            onChange={(event) => {
              setGeoJSON(event.target.value);
            }}
          /><br/><br/>
        </div>
        <br/><br/>
        <button onClick={createMission}>Create</button>
        <h4>or by draw it directly on the map</h4>
        <div className="mapstyle">
          <Map>
          </Map>
        </div>        
        <br/>

        <h1>Mission List</h1>
        <h4>Here are your missions that have been created before</h4>
      
        <table className="tabeldata" cellPadding ="10" width="100%">
          <thead >
            <tr>
              <th scope="col">id</th>
              <th scope="col">Mission name</th>
              {/* <th scope="col">GeoJSON</th> */}
              <th scope="col">Delete</th>
              <th scope="col">Rename</th>
            </tr>
          </thead>
          {missionList.map((val) => {
            return (
              <tbody>
              <tr>
              <td>{val.planId}</td>
              <td>{val.planName}</td>
              {/* <!--<td><button className="btntabel" onClick={() => showGeoJson(val.planId)}>Show</button>
              </td>--> */}
              <td>
                <button className="btntabel" onClick={() => deleteMission(val.planId)}>Delete</button>
              </td>
              <td>
                <input
                  type="text"
                  id="updateInput"
                  onChange={(e) => {
                    setNewMissionName(e.target.value);
                  }}
                />&nbsp;
                <button className="btntabel" onClick={() => updateName(val.planId)}>Rename</button>
              </td>
              </tr>
            </tbody>
            )           
          })}
        </table>
      </div>
    </main>
  );
}

export default App;
