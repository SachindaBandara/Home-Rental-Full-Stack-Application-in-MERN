const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require("./routes/Auth");

// Apply CORS middleware
app.use(cors());  // Ensure CORS is applied before routes

// Middleware for parsing JSON and serving static files
app.use(express.json());
app.use(express.static("public"));  // Static files should be served from the correct path

// Routes
app.use("/auth", authRoutes);

// Mongoose setup
const PORT = process.env.PORT || 3001;
mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "Home_Rental",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
  });
