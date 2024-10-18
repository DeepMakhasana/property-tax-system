const ULB = require("../models/ulb");

// Create a new ULB with zones and wards
exports.createULB = async (req, res) => {
  const { name, zones } = req.body;

  try {
    // Check if ULB already exists
    let ulb = await ULB.findOne({ name });
    if (ulb) {
      return res.status(400).json({ message: "ULB already exists" });
    }

    // Create new ULB
    const newULB = new ULB({ name, zones });
    const savedULB = await newULB.save();
    res.status(201).json(savedULB);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all ULBs with zones and wards
exports.getAllULBs = async (req, res) => {
  try {
    const ulbs = await ULB.find().sort({ name: 1 });
    res.json(ulbs);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get ULB by ID (with zones and wards)
exports.getULBById = async (req, res) => {
  try {
    const ulb = await ULB.findById(req.params.id);
    if (!ulb) {
      return res.status(404).json({ message: "ULB not found" });
    }
    res.json(ulb);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update ULB and its zones and wards by ID
exports.updateULB = async (req, res) => {
  const { name, zones } = req.body;

  try {
    let ulb = await ULB.findById(req.params.id);
    if (!ulb) {
      return res.status(404).json({ message: "ULB not found" });
    }

    // Update the ULB name and zones
    ulb.name = name || ulb.name;
    ulb.zones = zones || ulb.zones;

    const updatedULB = await ulb.save();
    res.json(updatedULB);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete ULB by ID
exports.deleteULB = async (req, res) => {
  try {
    const ulb = await ULB.findByIdAndDelete(req.params.id);
    if (!ulb) {
      return res.status(404).json({ message: "ULB not found" });
    }
    res.json({ message: "ULB deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Add a zone to a ULB
exports.addZone = async (req, res) => {
  const { zoneName } = req.body;

  try {
    let ulb = await ULB.findById(req.params.id);
    if (!ulb) {
      return res.status(404).json({ message: "ULB not found" });
    }

    // Add the new zone
    ulb.zones.push({ zoneName, wards: [] });
    const updatedULB = await ulb.save();
    res.json(updatedULB);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Remove a zone from a ULB
exports.removeZone = async (req, res) => {
  const { zoneId } = req.params;

  try {
    let ulb = await ULB.findById(req.params.id);
    if (!ulb) {
      return res.status(404).json({ message: "ULB not found" });
    }

    // Remove the zone by its ID
    ulb.zones = ulb.zones.filter((zone) => zone._id.toString() !== zoneId);
    const updatedULB = await ulb.save();
    res.json(updatedULB);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Add a ward to a zone within a ULB
exports.addWard = async (req, res) => {
  const { wardName } = req.body;
  const { zoneId } = req.params;

  try {
    let ulb = await ULB.findById(req.params.id);
    if (!ulb) {
      return res.status(404).json({ message: "ULB not found" });
    }

    // Find the zone and add the ward
    const zone = ulb.zones.id(zoneId);
    if (!zone) {
      return res.status(404).json({ message: "Zone not found" });
    }

    zone.wards.push({ name: wardName });
    const updatedULB = await ulb.save();
    res.json(updatedULB);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Remove a ward from a zone within a ULB
exports.removeWard = async (req, res) => {
  const { zoneId, wardId } = req.params;

  try {
    let ulb = await ULB.findById(req.params.id);
    if (!ulb) {
      return res.status(404).json({ message: "ULB not found" });
    }

    // Find the zone
    const zone = ulb.zones.id(zoneId);
    if (!zone) {
      return res.status(404).json({ message: "Zone not found" });
    }

    // Remove the ward by its ID
    zone.wards = zone.wards.filter((ward) => ward._id.toString() !== wardId);
    const updatedULB = await ulb.save();
    res.json(updatedULB);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
