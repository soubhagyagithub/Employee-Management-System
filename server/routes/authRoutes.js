const express = require("express");
const { login, seedUser } = require("../controllers/authController");
const router = express.Router();

router.post("/login", login);
router.get("/seed-user", seedUser);

module.exports = router;
