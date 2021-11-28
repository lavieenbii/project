import "./App.css";
import Map from "./components/maps";
import { useState, useEffect } from "react";
import Axious from "../node_modules/axios";

function App() {
  const [namaMisi, setNamaMisi] = useState("");
  const [geoJSON, setGeoJSON] = useState("");
  const [planId, setplanId] = useState("");
  const [missionList, setMissionList] = useState([]);
  const [newMission, setNewMission] = useState([]);

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
    Axious.get(`http:localhost:3001/delete/${id}`, {
      planId: id,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  // const updateMission = (misi) => {
  //   Axious.put("http:localhost:3001/update", {
  //     namaMisi: misi,
  //     geoJSON: newGeoJSON,
  //   });
  //   setNewMission("");
  // };

  //save to data base by map

  return (
    <main>
      <div className="App">
        <header className="App-header">
          <b>
            <div className="Head-comp">Ground Control Station</div>
          </b>
          <a className="Head-comp">Home</a>
          <a className="Head-comp">Mission List</a>
        </header>
        <h1>Create Your Mission</h1>
        <label>Mission Name :</label>
        <input
          type="text"
          name="namaMisi"
          onChange={(event) => {
            setNamaMisi(event.target.value);
          }}
        />
        <label>geoJSON :</label>
        <input
          type="text"
          name="geoJSON"
          onChange={(event) => {
            setGeoJSON(event.target.value);
          }}
        />
        <button onClick={createMission}>create</button>

        <h4>Make your own mission plane by draw it in the map</h4>
        <Map></Map>
        <br />
        <button>Create</button>
        <h1>List Mission</h1>
        <h4>Here are your missions that have been created before</h4>
        <table cellPadding="10" width="100%">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">Mission name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Fly to Wisdom Park</td>
              <td>
                <button>Delete</button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Random Flight</td>
              <td>
                <button>Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
        <link rel="manifest" href="/manifest.json" />
        {missionList.map((val) => {
          return (
            <div>
              <h2>Mission Name:{val.planName}</h2>
              <p>id : {val.planId}</p>
              <p>geoJSON: {val.g3wp}</p>
              <button type="submit" onClick={() => deleteMission(val.planId)}>
                Delete
              </button>
              <input
                type="text"
                onChange={(e) => {
                  setNewMission(e.target.value);
                }}
              />
              <button>update</button>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default App;
