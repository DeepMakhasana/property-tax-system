const express = require("express");
const { register, login, registerAdmin, loginAdmin } = require("../controllers/auth");
const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post("/register", register);

// @route   POST /api/auth/login
// @desc    Login a user
// @access  Public
router.post("/login", login);

// @route   POST /api/auth/admin/register
// @desc    Register a new admin
// @access  Public
router.post("/admin/register", registerAdmin);

// @route   POST /api/auth/admin/login
// @desc    Login as admin
// @access  Public
router.post("/admin/login", loginAdmin);

module.exports = router;
