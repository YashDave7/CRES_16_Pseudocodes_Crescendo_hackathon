const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const ejs = require("ejs");
const md5 = require("md5");
const patientModel = require("./models/patientModel");
const doctorModel = require("./models/doctorModel");
const app = express();
const QRCode = require("qrcode");
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

const user1 = {};
const user2 = {};

// get reqs

app.get("/", function (req, res) {
  res.render("home");
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
  bcrypt.hash(data.password, saltRounds, function (err, hash) {
    const newPatient = new patientModel({
      name: md5(data.name),
      username: md5(data.username),
      password: hash,
      age: md5(data.age),
      weight: md5(data.weight),
      allergies: md5(data.allergies),
      gender: md5(data.gender),
      bloodPressure: md5(data.bloodPressure),
      diabetes: md5(data.diabetes),
    });
    user1 = newPatient;
    newPatient.save().catch((err) => {
      console.log(err);
    });
  });
  res.redirect("/patientProfile");
});

app.post("/doctorSignup", async function (req, res) {
  const data = req.body;
  bcrypt.hash(data.password, saltRounds, function (err, hash) {
    const newDoctor = new doctorModel({
      select: md5(data.select),
      upr: md5(data.upr),
      name: md5(data.name),
      username: md5(data.username),
      email: md5(data.email),
      password: hash,
      hospital: md5(data.hospital),
    });
    user2 = newDoctor;

    newDoctor.save().catch((err) => {
      console.log(err);
    });
  });

  res.redirect("/doctorProfile");
});

app.post("/patientLogin", function (req, res) {
  const username = md5(req.body.username);
  const password = req.body.password;

  patientModel
    .findOne({ username: username })
    .then((foundUser) => {
      if (foundUser) {
        bcrypt.compare(password, foundUser.password, function (err, result) {
          if (result === true) {
            console.log("Found Patient!");
            user1 = foundUser
            res.redirect("/patientProfile");
          } else {
            res.redirect("/patientLogin");
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/doctorLogin", function (req, res) {
  const username = md5(req.body.username);
  const password = req.body.password;
  doctorModel
    .findOne({ username: username })
    .then((foundUser) => {
      if (foundUser) {
        bcrypt.compare(password, foundUser.password, function (err, result) {
          if (result === true) {
            console.log("Found Doctor");
            user2 = foundUser;
            res.redirect("/doctorProfile");
          } else {
            res.redirect("/doctorLogin");
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/doctorHome", function (req, res) {
  res.render("DoctorHome.ejs");
});

app.get("/patientHome", async function (req, res) {
  // Creating the dat
  let data = {user1};

  // Converting the data into String format
  let stringdata = JSON.stringify(data);

  // Print the QR code to terminal
  // QRCode.toString(stringdata,
  //   function (err, QRcode) {
  //     if (err) return console.log("error ")

  //     console.log(QRcode)
  //   })

  // // Converting the data into base64
  // QRCode.toDataURL(stringdata, function (err, code) {
  //   if (err) return console.log("error occurred")
  //   // Printing the code
  //   console.log(code)

  QRCode.toFile("public/qrCode.png", stringdata, function (err) {
    if (err) return console.log("error occurred");
    // Printing the code
    res.render("patientHome.ejs");
  });
});

const PORT = process.env.PORT || 5000;
// Listen to the Port.
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
