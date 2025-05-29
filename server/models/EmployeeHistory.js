const mongoose = require("mongoose");

const employeeHistorySchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  changedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  changeType: { type: String },
  changes: { type: Object },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("EmployeeHistory", employeeHistorySchema);
