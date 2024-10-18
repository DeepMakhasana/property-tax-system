const PropertyTax = require("../models/propertyTax");

// Create Property Tax Record
exports.createPropertyTax = async (req, res) => {
  const { propertyId, zone, taxAmount, rebateAmount, ward, address, ownerName, ulbName, tenementNumber } = req.body;

  try {
    const newPropertyTax = new PropertyTax({
      propertyId,
      zone,
      taxAmount,
      rebateAmount,
      ward,
      address,
      ownerName,
      ulbName,
      tenementNumber,
    });

    const savedPropertyTax = await newPropertyTax.save();
    res.status(201).json(savedPropertyTax);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// Get All Property Tax Records
exports.getAllPropertyTaxes = async (req, res) => {
  try {
    const propertyTaxes = await PropertyTax.find().populate("ulbName zone ward");
    res.json(propertyTaxes);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// Get Property Tax by ID
exports.getPropertyTaxById = async (req, res) => {
  try {
    const propertyTax = await PropertyTax.findOne({ tenementNumber: req.params.tenementNumber });
    if (!propertyTax) {
      return res.status(404).json({ message: "Property Tax not found" });
    }
    res.json(propertyTax);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// Update Property Tax Record
exports.updatePropertyTax = async (req, res) => {
  const { propertyId: id } = req.params;
  // const { zone, taxAmount, ward, address, ownerName, ulbName, tenementNumber } = req.body;
  const { propertyId, zone, taxAmount, rebateAmount, ward, address, ownerName, ulbName, tenementNumber } = req.body;

  try {
    let propertyTax = await PropertyTax.findOne({ propertyId: id });
    if (!propertyTax) {
      return res.status(404).json({ message: "Property Tax not found" });
    }

    // Update fields
    propertyTax.propertyId = propertyId || propertyTax.propertyId;
    propertyTax.zone = zone || propertyTax.zone;
    propertyTax.taxAmount = taxAmount || propertyTax.taxAmount;
    propertyTax.rebateAmount = rebateAmount || propertyTax.rebateAmount;
    propertyTax.ward = ward || propertyTax.ward;
    propertyTax.address = address || propertyTax.address;
    propertyTax.ownerName = ownerName || propertyTax.ownerName;
    propertyTax.ulbName = ulbName || propertyTax.ulbName;
    propertyTax.tenementNumber = tenementNumber || propertyTax.tenementNumber;

    const updatedPropertyTax = await propertyTax.save();
    res.status(201).json(updatedPropertyTax);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// Delete Property Tax Record
exports.deletePropertyTax = async (req, res) => {
  try {
    const propertyTax = await PropertyTax.findOneAndDelete({ propertyId: req.params.propertyId });
    if (!propertyTax) {
      return res.status(404).json({ message: "Property Tax not found" });
    }
    res.json({ message: "Property Tax deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};
