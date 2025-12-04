import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// =============================================================
// REGISTER USER
// =============================================================
export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    // Check if email exists
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already used" });

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Create user with role (lowercase to match schema)
    const user = await User.create({
      fullName,
      email,
      password: hashed,
      role: role?.toLowerCase() || "student",
    });

    res.status(201).json({
      message: "Registered successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// =============================================================
// LOGIN USER
// =============================================================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Compare passwords
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid password" });

    // Create JWT with role
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// =============================================================
// GET ALL USERS
// =============================================================
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =============================================================
// GET USER BY ID
// =============================================================
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// =============================================================
// UPDATE USER (⭐ ADDED — Required for Admin Edit)
// =============================================================
export const updateUser = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select("-password");

    if (!updated) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// =============================================================
// DELETE USER (⭐ ADDED — Required for Admin Delete)
// =============================================================
export const deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
