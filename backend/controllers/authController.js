import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Regular expressions for input validation
const STRICT_EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const ALPHABETIC_NAME_REGEX = /^[a-zA-Z\s]{3,50}$/;

// User Registration Handler
export const signup = async (req, res) => {
  try {
    const { name, email, password, secretQuestion, secretAnswer } = req.body;

    // Validate full name (minimum 3 letters, alphabetic characters only)
    if (!name || !ALPHABETIC_NAME_REGEX.test(name)) {
      return res.status(400).json({
        success: false,
        message: "Full name must be at least 3 characters and contain only alphabets.",
      });
    }

    // Validate email format
    if (!email || !STRICT_EMAIL_REGEX.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    // Validate password length (minimum 8 characters)
    if (!password || password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long.",
      });
    }

    // Ensure password is alphanumeric
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (!hasLetter || !hasNumber) {
      return res.status(400).json({
        success: false,
        message: "Password must be alphanumeric, containing both letters and numbers.",
      });
    }

    // Validate secret recovery question and answer
    if (!secretQuestion || !secretAnswer) {
      return res.status(400).json({
        success: false,
        message: "Secret recovery question and answer are required.",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email address.",
      });
    }

    // Hash the password with bcrypt (salt factor 10)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user document in database
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      secretQuestion: secretQuestion.trim(),
      secretAnswer: secretAnswer.toLowerCase().trim(),
      profileCompleted: false,
    });

    res.status(201).json({
      success: true,
      message: "Signup successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// User Login Handler
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter your email and password.",
      });
    }

    // Find the user by email
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    // Verify hashed password using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    // Generate signed JWT token (expires in 7 days)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        interests: user.interests || [],
        skills: user.skills || [],
        profileCompleted: user.profileCompleted || false,
        preferredMode: user.preferredMode || "Remote",
        preferredLocation: user.preferredLocation || "",
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Forgot Password / Password Reset Handler
export const forgotPassword = async (req, res) => {
  try {
    const { email, secretAnswer, newPassword } = req.body;

    if (!email || !secretAnswer || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required to reset password.",
      });
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Account not registered.",
      });
    }

    // Verify secret question response
    if (user.secretAnswer !== secretAnswer.toLowerCase().trim()) {
      return res.status(400).json({
        success: false,
        message: "Security question answer mismatch. Identity verification failed.",
      });
    }

    // Validate new password rules
    if (
      newPassword.length < 8 ||
      !/[a-zA-Z]/.test(newPassword) ||
      !/[0-9]/.test(newPassword)
    ) {
      return res.status(400).json({
        success: false,
        message: "New password must be alphanumeric and minimum 8 characters long.",
      });
    }

    // Hash new password and save it
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully! 🔓",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
