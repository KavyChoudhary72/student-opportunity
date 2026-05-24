import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Opportunity from "../models/Opportunity.js";

const router = express.Router();

// 1. FIXED LOGIC INITIALIZATION: Clean server environment allocation
const aiStudioClient = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ================= ROUTE 1: FETCH ALL ACTIVE OPPORTUNITIES =================
router.get("/", async (req, res) => {
  try {
    const opportunities = await Opportunity.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, opportunities });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ================= ROUTE 2: AI-POWERED COGNITIVE MATCHMAKER (GEMINI 1.5 FLASH) =================
router.post("/ai-recommendations", async (req, res) => {
  try {
    const { userSkills, userInterests } = req.body;

    // Fetch live entries directly from your MongoDB Atlas database collection
    const activeOpportunities = await Opportunity.find({});

    if (!activeOpportunities.length) {
      return res.status(200).json({ success: true, recommendations: [] });
    }

    // System prompt layout instruction mappings
    const systemPromptStructure = `
      You are an expert AI Career Matchmaker System designed for student dashboards.
      Your task is to analyze a student's profile and recommend the absolute best matching opportunities from the provided list.
      
      Student Skills: ${JSON.stringify(userSkills)}
      Student General Interests: ${JSON.stringify(userInterests)}
      
      Available Platform Opportunities Dataset:
      ${JSON.stringify(
        activeOpportunities.map((o) => ({
          id: o._id.toString(),
          title: o.title,
          company: o.company,
          category: o.category,
          skills: o.skills,
          description: o.description,
        })),
      )}
      
      CRITICAL VALIDATION RULES:
      1. Filter and return ONLY up to 3 items from the list that best align with the student's profile parameters.
      2. Respond ONLY with a clean JSON array containing the exact unique matching IDs as strings (e.g., ["6625...", "6626..."]).
      3. Do NOT provide markdown wrappers, no backticks, and no conversation blocks. Just the raw array text output.
    `;

    // Connect to the model with native clean JSON streaming configuration
    const modelInstance = aiStudioClient.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const aiResultStream = await modelInstance.generateContent(
      systemPromptStructure,
    );
    const textOutputResponse = aiResultStream.response.text().trim();

    // Parse response array strings securely without breakable complex regex codes
    let identifiedMatchingIds = [];
    try {
      // BULLETPROOF PARSING LAYER: Clean inline string replacement on a single line
      const cleanJsonString = textOutputResponse
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
      identifiedMatchingIds = JSON.parse(cleanJsonString);
    } catch (parseError) {
      console.error(
        "AI data array formatting parse breakdown fallback triggered:",
        textOutputResponse,
      );
      return res.status(200).json({ success: true, recommendations: [] });
    }

    // Direct collection tracking filtration based on structural unique object IDs
    const tailoredAIRecommendations = activeOpportunities.filter((item) =>
      identifiedMatchingIds.includes(item._id.toString()),
    );

    return res.status(200).json({
      success: true,
      recommendations: tailoredAIRecommendations,
    });
  } catch (globalError) {
    console.error("Gemini routing execution framework anomaly:", globalError);
    return res
      .status(500)
      .json({
        success: false,
        message: "AI recommendation pipeline processing error.",
      });
  }
});

// ================= ROUTE 3: DATA SEEDER WITH SCHEMA VALIDATION FIXES =================
router.get("/seed", async (req, res) => {
  try {
    const defaultData = [
      {
        title: "Frontend Developer Intern",
        company: "Google",
        category: "Internship",
        location: "Remote",
        type: "Remote",
        deadline: "20 June 2026",
        description:
          "Build user-facing modules using modern structural stacks. Work closely with cross-functional designer teams.",
        skills: ["React", "JavaScript", "Tailwind CSS"],
        applyLink:
          "[https://www.google.com/about/careers/applications/jobs/results](https://www.google.com/about/careers/applications/jobs/results)",
      },
      {
        title: "AI/ML Global Scholarship Program",
        company: "Microsoft",
        category: "Scholarship",
        location: "Bangalore",
        type: "Onsite",
        deadline: "10 July 2026",
        description:
          "Full funding grant covering deep academic tracks across contemporary deep neural architectures.",
        skills: ["Python", "Machine Learning", "PyTorch"],
        applyLink:
          "[https://careers.microsoft.com/us/en/studentprograms](https://careers.microsoft.com/us/en/studentprograms)",
      },
      {
        title: "Junior Backend Engineer",
        Amazon: "Amazon",
        company: "Amazon",
        category: "Job",
        location: "Hyderabad",
        type: "Hybrid",
        deadline: "30 June 2026",
        description:
          "Maintain core distributed microservices architectures processing millions of multi-tenant event signals daily.",
        skills: ["Node.js", "MongoDB", "AWS"],
        applyLink:
          "[https://www.amazon.jobs/en/teams/global-student-programs](https://www.amazon.jobs/en/teams/global-student-programs)",
      },
    ];

    await Opportunity.deleteMany({});
    const items = await Opportunity.insertMany(defaultData);

    res.status(201).json({
      success: true,
      message: "Database schema successfully seeded with required apply links!",
      items,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Seeding operational error: " + error.message,
      });
  }
});

export default router;
