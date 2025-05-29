const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { JWT_SECRET } = require("../config");

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ userId: user._id }, JWT_SECRET);
  res.json({ token });
};

exports.seedUser = async (req, res) => {
  const hash = bcrypt.hashSync("admin123", 8);
  await User.create({ username: "admin", password: hash });
  res.send("User created");
};
