import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../config/sendEmail.js";
import { VerifyEmailTemplate } from "../templates/email/verification.template.js";

export const registerUser = async (req, res) => {
  try {
    // Extract user details from request body

    const { name, email, password } = req.body;
    // Validate input

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        error: true,
        success: false,
      });
    }
    // Check if user already exists

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
        error: true,
        success: false,
      });
    }
    // Hash password and create new user

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save user to database
    await user.save();

    const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verifyToken}`;

    const sendVerifyEmail = await sendEmail({
      to: email,
      subject: "Verify your email",
      htmlContent: VerifyEmailTemplate({
        name: user.name,
        url: verifyUrl,
      }),
    });

    // Send success response
    return res.status(201).json({
      message: "User registered successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Server error",
      error: true,
      success: false,
    });
  }
};
