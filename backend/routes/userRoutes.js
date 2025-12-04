// backend/routes/userRoutes.js
import express from "express";
import {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} from "../controllers/userController.js";

const router = express.Router();

/**
 * @route   POST /api/users/register
 * @desc    Register a new user
 */
router.post("/register", registerUser);

/**
 * @route   POST /api/users/login
 * @desc    Login user
 */
router.post("/login", loginUser);

/**
 * @route   GET /api/users
 * @desc    Get all users
 */
router.get("/", getUsers);

/**
 * @route   GET /api/users/:id
 * @desc    Get user by ID
 */
router.get("/:id", getUserById);

/**
 * @route   PUT /api/users/:id
 * @desc    Update user (role, fullName, email)
 */
router.put("/:id", updateUser);

/**
 * @route   DELETE /api/users/:id
 * @desc    Delete user
 */
router.delete("/:id", deleteUser);

export default router;
