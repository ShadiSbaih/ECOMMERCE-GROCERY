import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { connectDB } from "./config/connectDB.js";
import User from "./models/user.model.js";

dotenv.config();

const email = (process.env.ADMIN_EMAIL || "admin@example.com").trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD || "admin123";

const seedAdmin = async () => {
  try {
    await connectDB();
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await User.findOneAndUpdate(
      { email },
      { name: "Admin", email, password: hashedPassword, role: "admin" },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    console.log(`Admin account ready: ${admin.email}`);
  } catch (error) {
    console.error("Admin seed failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

seedAdmin();
