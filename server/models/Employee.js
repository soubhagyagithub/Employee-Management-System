const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  employeeId: String,
  firstName: String,
  middleName: String,
  lastName: String,
  loginId: String,
  dob: Date,
  department: String,
  salary: Number,
  permanentAddress: String,
  currentAddress: String,
  idProof: String,
});

module.exports = mongoose.model("Employee", employeeSchema);
