import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// ================= VALIDATION RECOGNITION PATTERNS =================
const STRICT_EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const ALPHABETIC_NAME_REGEX = /^[a-zA-Z\s]{3,50}$/;

export const signup = async (req, res) => {
  try {
    const { name, email, password, secretQuestion, secretAnswer } = req.body;

    // 1. Full Name Strict Character Limits Check
    if (!name || !ALPHABETIC_NAME_REGEX.test(name)) {
      return res.status(400).json({
        success: false,
        message:
          "Full name must be at least 3 characters and contain only alphabets.",
      });
    }

    // 2. Comprehensive Email Infrastructure Logic Check
    if (!email || !STRICT_EMAIL_REGEX.test(email)) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide a valid structured corporate email address (e.g., user@domain.com).",
      });
    }

    // 3. Strict Alphanumeric Password Rule Check Matrix (Min 8 Chars, 1 Letter, 1 Number)
    if (!password || password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long.",
      });
    }

    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (!hasLetter || !hasNumber) {
      return res.status(400).json({
        success: false,
        message:
          "Security breach policy: Password must be alphanumeric, containing both letters and numbers.",
      });
    }

    // 4. Secure Recovery Keys Parameter Verification
    if (!secretQuestion || !secretAnswer) {
      return res.status(400).json({
        success: false,
        message:
          "Security baseline error: Secret recovery question and answer are required for configuration.",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email address.",
      });
    }

    // Hash password safely using high entropy salts rounds
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user object context mapping properties securely
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

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter your tracking credentials parameters safely.",
      });
    }

    // Find user by normalized token string email
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials architecture match logic mismatch.",
      });
    }

    // Compare encrypted hash strings password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials architecture match logic mismatch.",
      });
    }

    // JWT Token creation pipeline
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

// ================= DYNAMIC FORGOT PASSWORD ACCESS OVERWRITE CONTROLLER =================
export const forgotPassword = async (req, res) => {
  try {
    const { email, secretAnswer, newPassword } = req.body;

    if (!email || !secretAnswer || !newPassword) {
      return res.status(400).json({
        success: false,
        message:
          "All parameters are mandatory to compute security verification tracking indices.",
      });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(404).json({
        success: false,
        message:
          "Account not registered in platform directory cluster database.",
      });
    }

    // Clean check verification answers indices match matching
    if (user.secretAnswer !== secretAnswer.toLowerCase().trim()) {
      return res.status(400).json({
        success: false,
        message:
          "Security question answer mismatch. Identity verification failed.",
      });
    }

    // New Password Matrix Rules Verification Loop
    if (
      newPassword.length < 8 ||
      !/[a-zA-Z]/.test(newPassword) ||
      !/[0-9]/.test(newPassword)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "New password must be alphanumeric and minimum 8 characters long.",
      });
    }

    // Overwrite old hash payload with freshly generated token parameters salt tracking bounds
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({
      success: true,
      message:
        "Password reset sequence triggered and synchronized successfully! 🔓",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
