const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("./gcs.db");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res, next) {
  db.all("SELECT * FROM MissionPlan", (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).json({ status: "error" });
      return;
    }
    res.json(rows);
  });
});

app.post("/", (req, res) => {
  const namaMisi = req.body.namaMisi;
  const geoJSON = req.body.geoJSON;

  const create = `INSERT INTO MissionPlan(planName, g3wp) VALUES (?, ?)`;

  db.run(create, [namaMisi, geoJSON], (err, result) => {
    if (err) {
      return console.log(err.message);
    }
    res.send(result);
  });
});

app.get("/delete/:id", (req, res) => {
  const id = req.params.id;
  const delete_misi = `DELETE FROM MissionPlan WHERE planId = ${id}`;
  db.run(delete_misi, (err, result) => {
    if (err) {
      return console.log(err.message);
    }
    res.send("delete");
  });
});

// app.get("/delete/:id", function (req, res) {
//   let id = req.params.id;
//   db.run(`DELETE FROM MissionPlan WHERE planId = ${id}`, (err) => {
//     if (err) {
//       console.log(err);
//       return res.status(500).json({
//         status: "error",
//       });
//     }
//     res.status(200).send("delete");
//   });
// });

app.get("/update", (req, res) => {
  const namaMisi = req.body.namaMisi;
  const geoJSON = req.body.geoJSON;
  const create = `UPDATE SET planName MissionPlan VALUES = misi WHERE g3wp = a`;

  db.run(create, [namaMisi, geoJSON], (err, result) => {
    if (err) {
      return console.log(err.message);
    }
    res.send(result);
  });
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
