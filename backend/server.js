// Force public DNS resolution to fix MongoDB SRV errors
import dns from "node:dns"; // or const dns = require('node:dns'); if using CommonJS
dns.setServers(["1.1.1.1", "1.0.0.1"]);

// Your existing mongoose or mongodb connection code follows below...
import opportunityRoutes from "./routes/opportunityRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
connectDB();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use("/api/opportunities", opportunityRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API Running Successfully",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
