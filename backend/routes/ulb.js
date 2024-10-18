const express = require("express");
const { ULB, Zone, Ward } = require("../models/ulb");
// const {
//   createULB,
//   getAllULBs,
//   getULBById,
//   updateULB,
//   deleteULB,
//   addZone,
//   removeZone,
//   addWard,
//   removeWard,
// } = require("../controllers/ulb");

const router = express.Router();

// // ULB Routes

// // @route   POST /api/ulb
// // @desc    Create a new ULB with zones and wards
// // @access  Public
// router.post("/", createULB);

// // @route   GET /api/ulb
// // @desc    Get all ULBs
// // @access  Public
// router.get("/", getAllULBs);

// // @route   GET /api/ulb/:id
// // @desc    Get a ULB by ID
// // @access  Public
// router.get("/:id", getULBById);

// // @route   PUT /api/ulb/:id
// // @desc    Update a ULB and its zones and wards by ID
// // @access  Public
// router.put("/:id", updateULB);

// // @route   DELETE /api/ulb/:id
// // @desc    Delete a ULB by ID
// // @access  Public
// router.delete("/:id", deleteULB);

// // Zone Routes (within ULB)

// // @route   POST /api/ulb/:id/zone
// // @desc    Add a new zone to a ULB
// // @access  Public
// router.post("/:id/zone", addZone);

// // @route   DELETE /api/ulb/:id/zone/:zoneId
// // @desc    Remove a zone from a ULB by zone ID
// // @access  Public
// router.delete("/:id/zone/:zoneId", removeZone);

// // Ward Routes (within Zone)

// // @route   POST /api/ulb/:id/zone/:zoneId/ward
// // @desc    Add a new ward to a zone
// // @access  Public
// router.post("/:id/zone/:zoneId/ward", addWard);

// // @route   DELETE /api/ulb/:id/zone/:zoneId/ward/:wardId
// // @desc    Remove a ward from a zone by ward ID
// // @access  Public
// router.delete("/:id/zone/:zoneId/ward/:wardId", removeWard);

/**
 * CRUD API for ULB (Urban Local Body)
 */

// Create a ULB
router.post("/", async (req, res) => {
  const { name } = req.body;
  try {
    const ulb = new ULB({ name });
    await ulb.save();
    res.status(201).json(ulb);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get all ULBs
router.get("/", async (req, res) => {
  try {
    const ulbs = await ULB.find();
    res.status(200).json(ulbs);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get a ULB by ID
router.get("/:id", async (req, res) => {
  try {
    const ulb = await ULB.findById(req.params.id);
    if (!ulb) {
      return res.status(404).json({ message: "ULB not found" });
    }
    res.status(200).json(ulb);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Delete a ULB
router.delete("/:id", async (req, res) => {
  try {
    const ulb = await ULB.findByIdAndDelete(req.params.id);
    if (!ulb) {
      return res.status(404).json({ message: "ULB not found" });
    }
    res.status(200).json({ message: "ULB deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

/**
 * CRUD for Zone
 */

// Create a Zone under a ULB
router.post("/:ulbId/zones", async (req, res) => {
  const { zoneName } = req.body;
  try {
    const ulb = await ULB.findById(req.params.ulbId);
    if (!ulb) {
      return res.status(404).json({ message: "ULB not found" });
    }
    const zone = new Zone({ zoneName, ulbId: ulb._id });
    await zone.save();
    res.status(201).json(zone);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get all Zones in a ULB
router.get("/:ulbId/zones", async (req, res) => {
  try {
    const zones = await Zone.find({ ulbId: req.params.ulbId });
    res.status(200).json(zones);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get a Zone by ID
router.get("/zones/:zoneId", async (req, res) => {
  try {
    const zone = await Zone.findById(req.params.zoneId);
    if (!zone) {
      return res.status(404).json({ message: "Zone not found" });
    }
    res.status(200).json(zone);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Delete a Zone
router.delete("/zones/:zoneId", async (req, res) => {
  try {
    const zone = await Zone.findByIdAndDelete(req.params.zoneId);
    if (!zone) {
      return res.status(404).json({ message: "Zone not found" });
    }
    res.status(200).json({ message: "Zone deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

/**
 * CRUD for Ward
 */

// Create a Ward in a Zone
router.post("/zones/:zoneId/wards", async (req, res) => {
  const { name } = req.body;
  try {
    const zone = await Zone.findById(req.params.zoneId);
    if (!zone) {
      return res.status(404).json({ message: "Zone not found" });
    }
    const ward = new Ward({ name, zoneId: zone._id });
    await ward.save();
    res.status(201).json(ward);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get all Wards in a Zone
router.get("/zones/:zoneId/wards", async (req, res) => {
  try {
    const wards = await Ward.find({ zoneId: req.params.zoneId });
    res.status(200).json(wards);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get a Ward by ID
router.get("/wards/:wardId", async (req, res) => {
  try {
    const ward = await Ward.findById(req.params.wardId);
    if (!ward) {
      return res.status(404).json({ message: "Ward not found" });
    }
    res.status(200).json(ward);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Delete a Ward
router.delete("/wards/:wardId", async (req, res) => {
  try {
    const ward = await Ward.findByIdAndDelete(req.params.wardId);
    if (!ward) {
      return res.status(404).json({ message: "Ward not found" });
    }
    res.status(200).json({ message: "Ward deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
