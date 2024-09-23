const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require("./routes/Auth");
const listingRoutes = require("./routes/listing");
const bookingRoutes = require("./routes/booking");
const userRoutes = require("./routes/user");

// Apply CORS middleware
app.use(cors());

// Middleware for parsing JSON and serving static files
app.use(express.json());
app.use(express.static("public"));

// Routes
app.use("/auth", authRoutes);
app.use("/properties", listingRoutes);
app.use("/bookings", bookingRoutes);
app.use("/users", userRoutes);

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
