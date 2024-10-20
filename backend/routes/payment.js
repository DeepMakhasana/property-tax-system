const express = require("express");
const {
  paymentOrder,
  paymentVerify,
  paymentHistory,
  totalPayments,
  recentPaymentHistory,
} = require("../controllers/payment");
const router = express.Router();

// ROUTE 1 : Create Order Api Using POST Method http://localhost:4000/api/payment/order
router.post("/order", paymentOrder);

// ROUTE 2 : Create Verify Api Using POST Method http://localhost:4000/api/payment/verify
router.post("/verify", paymentVerify);

// ROUTE 3: payment history
router.get("/history/:userId", paymentHistory);
router.get("/paymentCount", totalPayments);
router.get("/recentPayments", recentPaymentHistory);

module.exports = router;
