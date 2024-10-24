const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Village = sequelize.define("Village", {
  candidate_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  village_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  youtube_link1: {
    type: DataTypes.STRING,
  },
  youtube_link2: {
    type: DataTypes.STRING,
  },
  image1: {
    type: DataTypes.STRING,
  },
  image2: {
    type: DataTypes.STRING,
  },
  images: {
    type: DataTypes.STRING,
  },
});

module.exports = Village;
