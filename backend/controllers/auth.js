const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Admin = require("../models/admin");

// Register User
exports.register = async (req, res) => {
  try {
    const { name, email, contactNumber, password } = req.body;
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      name,
      email,
      contactNumber,
      password: hashedPassword,
    };

    // Create a new user
    user = new User(newUser);

    await user.save();

    // Generate JWT
    const payload = {
      user: { id: user.id, name: user.name, email: user.email, contactNumber: user.contactNumber, role: "user" },
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: "Server error", err });
  }
};

// Login User
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // Generate JWT
    const payload = {
      user: { id: user.id, name: user.name, email: user.email, contactNumber: user.contactNumber, role: "user" },
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// GET all users excluding password
exports.getAllUser = async (req, res) => {
  try {
    // Find all users and exclude the password field
    const users = await User.find().select("-password");

    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    // Find the user by id, but exclude the password field
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;

    // Prevent updating the password directly through this route
    if (updateData.password) {
      return res.status(400).json({ message: "Password update is not allowed here" });
    }

    // Update the user, excluding password and return the updated user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true } // Return the updated document
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(201).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Find and delete the user by ID
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.usersCount = async (req, res) => {
  try {
    // Count the total number of users
    const totalUsers = await User.countDocuments();

    res.json({ totalUsers });
  } catch (error) {
    console.error("Error fetching total users:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Admin Registration
exports.registerAdmin = async (req, res) => {
  const { email, password } = req.body;

  console.log(email);

  try {
    // Check if admin already exists
    let admin = await Admin.findOne({ username: String(email) });
    if (admin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new admin
    admin = new Admin({
      username: email,
      password: hashedPassword,
    });

    await admin.save();

    // Generate JWT for the admin
    const payload = {
      user: { id: admin.id, email: admin.username, role: "admin" },
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Admin Login
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if admin exists
    let admin = await Admin.findOne({ username: email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT for the admin
    const payload = {
      user: { id: admin.id, email: admin.username, role: "admin" },
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
