import mongoose from "mongoose";

const opportunitySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    company: { type: String, required: true },

    category: {
      type: String,
      required: true,
      enum: ["Scholarship", "Internship", "Job"],
    },

    location: { type: String, required: true },

    type: {
      type: String,
      required: true,
      enum: ["Remote", "Onsite", "Hybrid"],
    },

    deadline: { type: String, required: true },

    description: { type: String, required: true },

    skills: [{ type: String }],

    // IMPORTANT ADD THIS
    applyLink: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Opportunity", opportunitySchema);
