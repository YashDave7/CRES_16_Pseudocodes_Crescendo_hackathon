const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const patientModel = require("./models/patientModel");
const app = express();
require("dotenv").config();

// EJS.
app.use(expressLayouts);
app.set("view engine", "ejs");

// BodyParser.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// MongoDB starts

mongoose.connect(process.env.MONGODB);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Successfully connected Database");
});

// MongoDB ends

const PORT = process.env.PORT || 5000;
// Listen to the Port.
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
