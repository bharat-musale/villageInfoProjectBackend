const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
require("dotenv").config();

exports.register = async (req, res) => {
  const { username, password, candidateId } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({
      username,
      password: hashedPassword,
      candidateId,
    });
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    res.status(400).json({ message: "Registration failed" });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body; // Removed candidateId from here
  try {
    // Find the admin by username only
    const admin = await Admin.findOne({ where: { username } });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Include candidateId in the response
    res.json({
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        candidateId: admin.candidateId,
      },
    });
  } catch (error) {
    res.status(400).json({ message: "Login failed" });
  }
};
