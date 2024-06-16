const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");

const app = express();
const PORT = process.env.PORT || 3000;

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
  Argillaceous_clay: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  Bauxite: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  Bentonite: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  Brine: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  Coal: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  Coal_LSM: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  China_Clay: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  Dolomite: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  Fireclay: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  Fuller_Earth: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  Gypsum: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  Gypsum_LSM: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  Iron_Ore: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  Marble: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  Ochers: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  RockSalt: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  RockSalt_LSM: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  Silica_Sand: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  Silica_Sand_LSM: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  Ordinary_Salt: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  Lake_Salt: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  Sand_Gravel_LSM: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
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
  const {
    year,
    month,
    district,
    Limestone,
    Limestone_LSM,
    Argillaceous_clay,
    Bauxite,
    Bentonite,
    Brine,
    Coal,
    Coal_LSM,
    China_Clay,
    Dolomite,
    Fireclay,
    Fuller_Earth,
    Gypsum,
    Gypsum_LSM,
    Iron_Ore,
    Marble,
    Ochers,
    RockSalt,
    RockSalt_LSM,
    Silica_Sand,
    Silica_Sand_LSM,
    Ordinary_Salt,
    Lake_Salt,
    Sand_Gravel_LSM,
  } = req.body;

  try {
    const result = await MineralRevenue.create({
      year,
      month,
      district,
      Limestone,
      Limestone_LSM,
      Argillaceous_clay,
      Bauxite,
      Bentonite,
      Brine,
      Coal,
      Coal_LSM,
      China_Clay,
      Dolomite,
      Fireclay,
      Fuller_Earth,
      Gypsum,
      Gypsum_LSM,
      Iron_Ore,
      Marble,
      Ochers,
      RockSalt,
      RockSalt_LSM,
      Silica_Sand,
      Silica_Sand_LSM,
      Ordinary_Salt,
      Lake_Salt,
      Sand_Gravel_LSM,
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

// GET route to fetch mineral revenue data for a specific year
app.get("/api/mineral-revenues/:year", async (req, res) => {
  const { year } = req.params;

  try {
    const result = await MineralRevenue.findAll({
      where: { year },
    });
    if (!result || result.length === 0) {
      res.status(404).json({
        success: false,
        message: `Mineral revenue data for year ${year} not found.`,
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

// GET route to fetch mineral revenue data for a specific month and district
app.get("/api/mineral-revenues/:month/:district", async (req, res) => {
  const { month, district } = req.params;

  try {
    const result = await MineralRevenue.findAll({
      where: { month, district },
    });
    if (!result || result.length === 0) {
      res.status(404).json({
        success: false,
        message: `Mineral revenue data for month ${month} and district ${district} not found.`,
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

// PUT route to update mineral revenue data for a specific year, month, and district
app.put("/api/mineral-revenues/:year/:month/:district", async (req, res) => {
  const { year, month, district } = req.params;
  const {
    Limestone,
    Limestone_LSM,
    Argillaceous_clay,
    Bauxite,
    Bentonite,
    Brine,
    Coal,
    Coal_LSM,
    China_Clay,
    Dolomite,
    Fireclay,
    Fuller_Earth,
    Gypsum,
    Gypsum_LSM,
    Iron_Ore,
    Marble,
    Ochers,
    RockSalt,
    RockSalt_LSM,
    Silica_Sand,
    Silica_Sand_LSM,
    Ordinary_Salt,
    Lake_Salt,
    Sand_Gravel_LSM,
  } = req.body;

  try {
    const result = await MineralRevenue.update(
      {
        Limestone,
        Limestone_LSM,
        Argillaceous_clay,
        Bauxite,
        Bentonite,
        Brine,
        Coal,
        Coal_LSM,
        China_Clay,
        Dolomite,
        Fireclay,
        Fuller_Earth,
        Gypsum,
        Gypsum_LSM,
        Iron_Ore,
        Marble,
        Ochers,
        RockSalt,
        RockSalt_LSM,
        Silica_Sand,
        Silica_Sand_LSM,
        Ordinary_Salt,
        Lake_Salt,
        Sand_Gravel_LSM,
      },
      { where: { year, month, district } }
    );
    if (result[0] === 0) {
      res.status(404).json({
        success: false,
        message: `Mineral revenue data for year ${year}, month ${month}, and district ${district} not found or no updates applied.`,
      });
    } else {
      res.json({ success: true, message: `Mineral revenue data updated.` });
    }
  } catch (error) {
    console.error("Error updating mineral revenue data:", error);
    res.status(500).json({
      success: false,
      message: "Error updating mineral revenue data.",
    });
  }
});

// DELETE route to delete mineral revenue data for a specific year, month, and district
app.delete("/api/mineral-revenues/:year/:month/:district", async (req, res) => {
  const { year, month, district } = req.params;

  try {
    const result = await MineralRevenue.destroy({
      where: { year, month, district },
    });
    if (!result) {
      res.status(404).json({
        success: false,
        message: `Mineral revenue data for year ${year}, month ${month}, and district ${district} not found or no deletes applied.`,
      });
    } else {
      res.json({ success: true, message: `Mineral revenue data deleted.` });
    }
  } catch (error) {
    console.error("Error deleting mineral revenue data:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting mineral revenue data.",
    });
  }
});

// Serve static files (optional)
app.use(express.static("public"));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
