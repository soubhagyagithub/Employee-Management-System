const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { JWT_SECRET, ADMIN_USERNAME, ADMIN_PASSWORD } = require("../config");

// Login with credentials from MongoDB
exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET);
  res.json({ token });
};

// Create admin user from .env values
exports.seedUser = async (req, res) => {
  try {
    const existing = await User.findOne({ username: ADMIN_USERNAME });
    if (existing) {
      return res.send("Admin user already exists.");
    }

    const hash = bcrypt.hashSync(ADMIN_PASSWORD, 8);
    await User.create({ username: ADMIN_USERNAME, password: hash });
    res.send("Admin user created from environment variables.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating admin user.");
  }
};
