const mongoose = require("mongoose");

const propertyTaxSchema = new mongoose.Schema(
  {
    propertyId: { type: String, required: true, unique: true },
    ulbName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ULB", // Reference to the ULB schema
      required: true,
    },
    zone: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Zone", // Reference to the Zone schema
      required: true,
    },
    ward: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ward", // Reference to the Ward schema
      required: true,
    },
    taxAmount: { type: Number, required: true },
    rebateAmount: { type: Number, required: true },
    address: { type: String, required: true },
    ownerName: { type: String, required: true },
    tenementNumber: { type: Number, required: true, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PropertyTax", propertyTaxSchema);
