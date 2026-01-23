import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../config/sendEmail.js";
import { VerifyEmailTemplate } from "../templates/email/verification.template.js";
import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefresToken.js";


// User Registration Controller
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

    // Generate email verification token
    const verifyToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: "15m",
      },
    );

    // Create verification URL
    const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verifyToken}`;

    // Send verification email
    await sendEmail({
      to: email,
      subject: "Verify your email",
      htmlContent: VerifyEmailTemplate({
        name: user.name,
        verifyUrl,
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
// Email Verification Controller
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({
        message: "Verification token is required",
        error: true,
        success: false,
      });
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_EMAIL_SECRET);
    } catch (err) {
      return res.status(400).json({
        message: "Invalid or expired token",
        error: true,
        success: false,
      });
    }

    // Update user's email verification status
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        message: "Email already verified",
        error: true,
        success: false,
      });
    }

    user.isVerified = true;
    await user.save();

    return res.status(200).json({
      message: "Email verified successfully",
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

// User Login Controller
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
        error: true,
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    if (user.status !== "active") {
      return res.status(403).json({
        message: `User account is ${user.status}. Please contact support.`,
        error: true,
        success: false,
      });
    }

    if (!user.isVerified) {
      return res.status(401).json({
        message: "Please verify your email first",
        error: true,
        success: false,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid credentials",
        error: true,
        success: false,
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: "1h",
      },
    );

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    return res.status(200).json({
      message: "Login successful",
      error: false,
      success: true,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Server error",
      error: true,
      success: false,
    });
  }
};

export const logoutUser = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        message: "Refresh token is required",
        error: true,
        success: false,
      });
    }

    // Verify refresh token
    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch (err) {
      return res.status(400).json({
        message: "Invalid or expired refresh token",
        error: true,
        success: false,
      });
    }

    // Update user's refresh token
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    user.refreshToken = "";
    await user.save();

    return res.status(200).json({
      message: "Logout successful",
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
