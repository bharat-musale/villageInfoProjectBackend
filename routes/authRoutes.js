// backend/routes/authRoutes.js
const express = require("express");
const { register, login } = require("../controllers/authController");
const router = express.Router();

// Require the User model
const User = require("../models/User");

// Define your routes
router.post("/register", register);
router.post("/login", login);

module.exports = router;
