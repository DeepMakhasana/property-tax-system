const mongoose = require("mongoose");

// Define Ward schema
const wardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  zoneId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Zone", // Reference to the ULB schema
    required: true,
  },
});

// Define Zone schema with multiple wards
const zoneSchema = new mongoose.Schema({
  zoneName: {
    type: String,
    required: true,
  },
  // wards: [wardSchema], // Array of wards inside the zone
  ulbId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ULB", // Reference to the ULB schema
    required: true,
  },
});

// Define ULB schema with multiple zones
const ulbSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    // zones: [zoneSchema], // Array of zones inside the ULB
  },
  { timestamps: true }
); // Automatically adds createdAt and updatedAt fields

const ULB = mongoose.model("ULB", ulbSchema);
const Zone = mongoose.model("Zone", zoneSchema);
const Ward = mongoose.model("Ward", wardSchema);

module.exports = { ULB, Zone, Ward };
