const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Initialize the app
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // or ['http://example1.com', 'http://example2.com'] for multiple
  })
);

// Import routes
const authRoutes = require("./routes/auth");
const propertyTaxRoutes = require("./routes/propertyTax");
const ulbRoutes = require("./routes/ulb");
const paymentRoutes = require("./routes/payment");

app.use("/api/auth", authRoutes);
// Use property tax routes
app.use("/api/property", propertyTaxRoutes);
app.use("/api/ulb", ulbRoutes);
// Use property tax payment routes
app.use("/api/payment", paymentRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
