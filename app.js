const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const ejs = require("ejs");
const patientModel = require("./models/patientModel");
const doctorModel = require("./models/doctorModel");
const app = express();
require("dotenv").config();

// EJS.
app.set("view engine", "ejs");

// BodyParser.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(cors());

// MongoDB starts

mongoose.connect(process.env.MONGODB);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Successfully connected Database");
});

// MongoDB ends

// get reqs

app.get("/", function (req, res) {
  res.send("This is Home Page!");
});

app.get("/patientSignup", function (req, res) {
  res.render("patientSignup");
});

app.get("/doctorSignup", function (req, res) {
  res.render("DoctorSignup");
});

app.get("/patientLogin", function (req, res) {
  res.send("This is patient Login");
});

app.get("/patientProfile", function (req, res) {
  res.send("This is patient profile!");
});

app.get("/doctorProfile", function (req, res) {
  res.send("This is Doctor Profile!");
});

// post reqs
app.post("/patientSignup", async function (req, res) {
  const data = req.body;
  const newPatient = new patientModel({
    name: data.name,
    username: data.username,
    password: data.password,
    age: data.age,
    weight: data.weight,
    allergies: data.allergies,
    gender: data.gender,
    bloodPressure: data.bloodPressure,
    diabetes: data.diabetes,
  });

  await newPatient.save().catch((err) => {
    console.log(err);
  });
  res.redirect("/patientProfile");
});

app.post("/doctorSignup", async function (req, res) {
  const data = req.body;
  const newDoctor = new doctorModel({
    select: data.select,
    upr: data.upr,
    name: data.name,
    username: data.username,
    email: data.email,
    password: data.password,
    hospital: data.hospital,
  });

  await newDoctor.save().catch((err) => {
    console.log(err);
  });
  res.redirect("/doctorProfile");
});

app.post("/patientLogin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  patientModel
    .findOne({ username: username })
    .then((foundUser) => {
      if (foundUser) {
        if (foundUser.password === password) {
          res.redirect("/patientProfile");
        }
      } else {
        res.redirect("/patientLogin");
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

const PORT = process.env.PORT || 5000;
// Listen to the Port.
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
