const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const patientModel = mongoose.model("patientModel", patientSchema);
module.exports = patientModel;
