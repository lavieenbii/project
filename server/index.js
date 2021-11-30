const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const mysql = require("mysql");

var db = mysql.createConnection({
  host: "host",
  user: "root",
  password: "solo3011",
  database: "gcs",
  port: "3306",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res, next) {
  db.query("SELECT * FROM MissionPlan", (err, rows) => {
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

  db.query(create, [namaMisi, geoJSON], (err, result) => {
    if (err) {
      return console.log(err.message);
    }
    res.send(result);
  });
});

app.get("/delete/:id", (req, res) => {
  const id = req.params.id;
  const delete_misi = `DELETE FROM MissionPlan WHERE planId = ${id}`;
  db.query(delete_misi, (err, result) => {
    if (err) {
      return console.log(err.message);
    }
    res.send("delete");
  });
});

//Update the name of mission
app.get("/update", (req, res) => {
  const misi = req.body.namaMisi;
  const geoJSON = req.body.geoJSON;
  const sqlUpdate = "UPDATE MissionPlan SET planName = (?) WHERE g3wp = (?)";
  db.query(sqlUpdate, [misi, geoJSON], (err, result) => {
    if (err) {
      return console.log(err.message);
    }
    res.send("update");
  });
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
