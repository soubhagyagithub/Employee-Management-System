const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  addEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
  getEmployeeById, // Add these imports
  getEmployeeHistory, // Add these imports
} = require("../controllers/employeeController");

const router = express.Router();

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

// File filter
const upload = multer({
  storage,
  limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "application/pdf" &&
      req.headers["content-length"] >= 10000
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files between 10KB and 1MB are allowed"));
    }
  },
});

router.post("/", upload.single("idProof"), addEmployee);
router.get("/", getEmployees);

// New routes:
router.get("/:id", getEmployeeById); // View employee details
router.get("/:id/history", getEmployeeHistory); // Get employee history

router.put("/:id", upload.single("idProof"), updateEmployee); // Update employee by ID
router.delete("/:id", deleteEmployee); // Delete employee by ID

module.exports = router;
