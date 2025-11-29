// backend/routes/userRoutes.js
import express from "express";
import {
  registerUser,
  loginUser,
  getUsers,
  getUserById
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
router.get("/:id", getUserById)
export default router;
