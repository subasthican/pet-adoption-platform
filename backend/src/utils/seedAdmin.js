import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import User from "../models/user.model.js";
import { ROLES } from "./constants.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();

    const existingAdmin = await User.findOne({ email: process.env.ADMIN_EMAIL });

    if (existingAdmin) {
      console.log("Admin already exists");
    } else {
      await User.create({
        name: process.env.ADMIN_NAME,
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        role: ROLES.ADMIN,
      });

      console.log("Admin created successfully");
    }
  } catch (error) {
    console.error("Failed to seed admin:", error.message);
  } finally {
    await mongoose.connection.close();
  }
};

seedAdmin();