import mongoose from "mongoose";
import dns from "dns";

export const connectDB = async () => {
  try {
    try {
      dns.setDefaultResultOrder("ipv4first");
    } catch (e) {}
    await mongoose.connect(process.env.MONGO_URL, { serverSelectionTimeoutMS: 5000 });
    console.log("Database connected successfully (Atlas)");
  } catch (error) {
    console.log("MongoDB Atlas connection unavailable, connecting locally...");
    try {
      await mongoose.connect("mongodb://127.0.0.1:27017/grocery");
      console.log("Database connected successfully (Local MongoDB)");
    } catch (localErr) {
      console.error("Local MongoDB connection error:", localErr);
    }
  }
};
