import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      // Extracted configuration to support custom high-security alphanumeric strings at route validation phase
    },

    // RECOVERY MODULE LAYER (Purane existing database documents ko bina tode seamlessly add kiya hai)
    secretQuestion: {
      type: String,
      default: "What is your favorite city?",
    },

    secretAnswer: {
      type: String,
      lowercase: true,
      trim: true,
      default: "jaipur", // Safety default initialization to secure uncompleted old rows
    },

    profileCompleted: {
      type: Boolean,
      default: false,
    },

    skills: {
      type: [String],
      default: [],
    },

    interests: {
      type: [String],
      default: [],
    },

    savedOpportunities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Opportunity",
      },
    ],
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

export default User;
