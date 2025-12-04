import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "./models/User.js";

dotenv.config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB...");

    // 1. Define Users
    const users = [
      {
        fullName: "Admin User",
        email: "admin@uniconnect.com",
        password: "password123",
        role: "admin",
      },
      {
        fullName: "Staff User",
        email: "staff@uniconnect.com",
        password: "password123",
        role: "staff",
      },
    ];

    // 2. Insert Users
    for (const u of users) {
      // Check if exists
      const exists = await User.findOne({ email: u.email });
      const hashedPassword = await bcrypt.hash(u.password, 10);

      if (exists) {
        // Update password just in case
        exists.password = hashedPassword;
        exists.role = u.role; // ensure role is correct
        await exists.save();
        console.log(`Updated existing user: ${u.email}`);
      } else {
        // Create
        await User.create({
          fullName: u.fullName,
          email: u.email,
          password: hashedPassword,
          role: u.role,
        });
        console.log(`Created user: ${u.email} (${u.role})`);
      }
    }

    console.log("✅ Seeding complete!");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding users:", error);
    process.exit(1);
  }
};

seedUsers();

