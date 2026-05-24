import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

// Initialize the Gemini client on demand when a request comes in
router.post("/", async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Request body must include a 'message' parameter.",
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("Missing GEMINI_API_KEY in backend environment.");
      return res.status(500).json({
        success: false,
        message: "Gemini API key is not configured on the backend server.",
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    // Connect to next-gen stable gemini-2.5-flash model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Matching system context from old Chatbot.jsx configuration
    const systemContext =
      "System Prompt Instruction: Your name is EduInfo AI. You are a helpful student assistant created by Kavya Choudhary, a second-year Data Science student at SKIT Jaipur. Keep your answers short, clear, and write in simple English. Help students find details about college scholarships, tech internships, MERN stack full-stack positions, data science paths, and engineering careers.";

    // Convert history format to text transcript
    const previousHistory = (history || [])
      .slice(-6)
      .map(
        (msg) =>
          `${msg.sender === "user" ? "Student" : "EduInfo AI"}: ${msg.text}`
      )
      .join("\n");

    const ultimateCleanPrompt = `${systemContext}\n\nChat History:\n${previousHistory}\nStudent: ${message}\nEduInfo AI:`;

    const result = await model.generateContent(ultimateCleanPrompt);
    const response = await result.response;
    const replyText = response.text().trim();

    return res.status(200).json({
      success: true,
      reply: replyText,
    });
  } catch (error) {
    console.error("Gemini backend chat controller error:", error);
    return res.status(500).json({
      success: false,
      message: "I faced a connection hiccup with the AI. Please try again.",
    });
  }
});

export default router;
