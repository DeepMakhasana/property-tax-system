const Razorpay = require("razorpay");
const crypto = require("node:crypto");
const Payment = require("../models/payment");
require("dotenv").config();

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

async function paymentOrder(req, res) {
  const { amount, propertyId } = req.body;

  try {
    const options = {
      propertyId,
      amount: Number(amount * 100),
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Something Went Wrong!" });
      }
      res.status(200).json(order);
      console.log(order);
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
  }
}

async function paymentVerify(req, res) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, propertyId, userId } = req.body;

  // console.log("req.body", req.body);

  try {
    // Create Sign
    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    // Create ExpectedSign
    const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET).update(sign.toString()).digest("hex");

    // console.log(razorpay_signature === expectedSign);

    // Create isAuthentic
    const isAuthentic = expectedSign === razorpay_signature;

    // Condition
    if (isAuthentic) {
      const payment = new Payment({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        propertyId,
        userId,
      });

      // Save Payment
      await payment.save();

      // Send Message
      res.json({
        message: "Payement Successfully",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
  }
}

async function paymentHistory(req, res) {
  try {
    const { userId } = req.params;
    const history = await Payment.find({ userId })
      .populate({
        path: "propertyId",
        model: "PropertyTax",
        // populate: [
        //   {
        //     path: "ulbName",
        //     model: "ULB", // Populating ULB details
        //   },
        //   {
        //     path: "zone",
        //     model: "Zone", // Populating Zone details
        //   },
        //   {
        //     path: "ward",
        //     model: "Ward", // Populating Ward details
        //   },
        // ],
      })
      .exec();

    // const history = await Payment.aggregate([
    //   {
    //     $lookup: {
    //       from: "propertytaxes", // The collection to join
    //       localField: "propertyId", // Field from the `orders` collection
    //       foreignField: "_id", // Field from the `customers` collection
    //       as: "property", // Output array field name
    //     },
    //   },
    // ]);

    res.json(history);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
  }
}

module.exports = { paymentOrder, paymentVerify, paymentHistory };
