const express = require("express");
const {
  createPropertyTax,
  getAllPropertyTaxes,
  getPropertyTaxById,
  updatePropertyTax,
  deletePropertyTax,
} = require("../controllers/propertyTax");

const router = express.Router();

// @route   POST /api/property
// @desc    Create a new property tax record
// @access  Public
router.post("/", createPropertyTax);

// @route   GET /api/property
// @desc    Get all property tax records
// @access  Public
router.get("/", getAllPropertyTaxes);

// @route   GET /api/property/:propertyId
// @desc    Get a property tax record by ID
// @access  Public
router.get("/:tenementNumber", getPropertyTaxById);

// @route   PUT /api/property/:propertyId
// @desc    Update a property tax record by ID
// @access  Public
router.post("/:propertyId", updatePropertyTax);

// @route   DELETE /api/property/:propertyId
// @desc    Delete a property tax record by ID
// @access  Public
router.delete("/:propertyId", deletePropertyTax);

module.exports = router;
