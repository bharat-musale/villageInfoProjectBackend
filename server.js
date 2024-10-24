const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const villageRoutes = require('./routes/villageRoutes');
require('dotenv').config();
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.json()); // Parse JSON
app.use(express.urlencoded({ extended: true })); // Parse form-urlencoded

app.get("/status", (req, res) => {
  res.send("Server is running");
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Dynamic route to serve images from candidate-specific folders
app.get("/uploads/:candidate_id/:image_name", (req, res) => {
  const { candidate_id, image_name } = req.params;
  const imagePath = path.join(__dirname, "uploads", candidate_id, image_name);

  res.sendFile(imagePath, (err) => {
    if (err) {
      res.status(404).send("Image not found");
    }
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/village', villageRoutes);

sequelize.sync().then(() => {
  console.log('Database connected');
  app.listen(5000, () => {
    console.log('Server is running on port 5000');
  });
}).catch(err => console.error('Unable to connect to the database:', err));
