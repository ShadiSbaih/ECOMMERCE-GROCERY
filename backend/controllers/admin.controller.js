import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });

    const admin = await User.findOne({ email: email.toLowerCase(), role: "admin" });
    const isValidPassword = admin && await bcrypt.compare(password, admin.password);

    if (!isValidPassword) {
      return res.json({ message: "Invalid credentials", success: false });
    }

    const token = jwt.sign({ email: admin.email, role: admin.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res
      .status(200)
      .json({ message: "Login successful", success: true, token });
  } catch (error) {}
};
// Admin Logout
export const adminLogout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout successful", success: true });
};

export const checkAdmin = async (req, res) => {
  try {
    return res.status(200).json({ success: true });
  } catch (error) {
    res.json({ message: "Internal server error", success: false });
  }
};
