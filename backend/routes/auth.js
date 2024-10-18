const express = require("express");
const {
  register,
  login,
  registerAdmin,
  loginAdmin,
  getAllUser,
  getUser,
  updateUser,
  deleteUser,
  usersCount,
} = require("../controllers/auth");
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

// get all users
router.get("/users", getAllUser);
router.get("/usersCount", usersCount);
router.get("/users/:id", getUser);
router.post("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

module.exports = router;
