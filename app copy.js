const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");

const app = express();
const port = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sequelize setup
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
  logging: false,
});

// Define a model for MineralRevenue
const MineralRevenue = sequelize.define("MineralRevenue", {
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  month: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  district: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Limestone: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Limestone_LSM: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Sync the model with the database
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database and tables synced.");
  })
  .catch((err) => {
    console.error("Database sync error:", err);
  });

// POST route to store mineral revenue data
app.post("/api/mineral-revenues", async (req, res) => {
  const { year, month, district, Limestone, Limestone_LSM } = req.body;

  try {
    const result = await MineralRevenue.create({
      year,
      month: year === 2024 ? month : null,
      district,
      Limestone,
      Limestone_LSM,
    });
    res.status(201).json({ success: true, result });
  } catch (error) {
    console.error("Error storing mineral revenue data:", error);
    res
      .status(500)
      .json({ success: false, message: "Error storing mineral revenue data." });
  }
});

// GET route to fetch mineral revenue data for a specific year, month, and district
app.get("/api/mineral-revenues/:year/:month/:district", async (req, res) => {
  const { year, month, district } = req.params;

  try {
    const result = await MineralRevenue.findOne({
      where: { year, month, district },
    });
    if (!result) {
      res.status(404).json({
        success: false,
        message: `Mineral revenue data for year ${year}, month ${month}, and district ${district} not found.`,
      });
    } else {
      res.json({ success: true, result });
    }
  } catch (error) {
    console.error("Error fetching mineral revenue data:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching mineral revenue data.",
    });
  }
});

// Serve static files (optional)
app.use(express.static("public"));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
