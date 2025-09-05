const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config({ path: "./config.env" });
const { db } = require("./config/firebase");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(morgan("combined"));
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// City coordinates mapping for Tamil Nadu
const CITY_COORDINATES = {
  chennai: [80.2707, 13.0827],
  coimbatore: [76.9558, 11.0168],
  madurai: [78.1198, 9.9252],
  trichy: [78.7047, 10.7905],
  salem: [78.146, 11.6643],
  erode: [78.6569, 11.1271],
  thanjavur: [79.84, 10.7656],
  tirunelveli: [79.1378, 10.79],
  vellore: [79.1282, 12.2958],
};

// API Routes

// Get all farmers/users
app.get("/api/farmers", async (req, res) => {
  try {
    const snapshot = await db.ref("users").once("value");
    const users = snapshot.val();

    if (!users) {
      return res.json([]);
    }

    // Transform the data to match frontend expectations
    const farmers = Object.keys(users).map((key) => ({
      id: key,
      name: users[key].name || "Unknown",
      phone: users[key].phone || "N/A",
      village: users[key].village || "Unknown",
      size: users[key].size || 0,
      lastUpdated: new Date().toISOString(),
      status: "active", // Default status
    }));

    res.json(farmers);
  } catch (error) {
    console.error("Error fetching farmers:", error);
    res.status(500).json({ error: "Failed to fetch farmers data" });
  }
});

// Get specific farmer by ID
app.get("/api/farmers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const snapshot = await db.ref(`users/${id}`).once("value");
    const user = snapshot.val();

    if (!user) {
      return res.status(404).json({ error: "Farmer not found" });
    }

    const farmer = {
      id: id,
      name: user.name || "Unknown",
      phone: user.phone || "N/A",
      village: user.village || "Unknown",
      size: user.size || 0,
      lastUpdated: new Date().toISOString(),
      status: "active",
    };

    res.json(farmer);
  } catch (error) {
    console.error("Error fetching farmer:", error);
    res.status(500).json({ error: "Failed to fetch farmer data" });
  }
});

// Get reports data for heatmap
app.get("/api/reports", async (req, res) => {
  try {
    const snapshot = await db.ref("reports").once("value");
    const reports = snapshot.val();

    if (!reports) {
      return res.json({});
    }

    // Return raw data exactly as it is in database
    res.json(reports);
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ error: "Failed to fetch reports data" });
  }
});

// Get dashboard statistics
app.get("/api/dashboard/stats", async (req, res) => {
  try {
    const [usersSnapshot, reportsSnapshot] = await Promise.all([
      db.ref("users").once("value"),
      db.ref("reports").once("value"),
    ]);

    const users = usersSnapshot.val() || {};
    const reports = reportsSnapshot.val() || {};

    const stats = {
      totalFarmers: Object.keys(users).length,
      activeFarmers: Object.keys(users).length, // All users are considered active for now
      pendingUpdates: 0, // Can be calculated based on last updated timestamps
      inactiveFarmers: 0,
      totalReports: Object.keys(reports).length,
      averageFieldSize:
        Object.values(users).reduce((sum, user) => sum + (user.size || 0), 0) /
          Object.keys(users).length || 0,
    };

    res.json(stats);
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ error: "Failed to fetch dashboard statistics" });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// 404 handler
app.all("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL}`);
});

module.exports = app;
