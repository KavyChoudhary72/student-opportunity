# AI-Powered Student Opportunity Dashboard

A modern, highly responsive MERN-stack web application designed for students to discover, search, bookmark, and receive smart recommendations for **Scholarships**, **Internships**, and **Jobs**. The platform also features a secure, next-gen **AI Assistant (EduInfo AI)** powered by Gemini to help students solve career queries.

Deployed Live on Render:
- **Frontend App**: [https://eduinfo-723y.onrender.com](https://eduinfo-723y.onrender.com)
- **Backend API**: [https://student-opportunity.onrender.com](https://student-opportunity.onrender.com)

---

## 🛠️ Mandatory Tech Stack & Architecture

### Frontend
- **React.js**: Single-Page Application (SPA) framework built using Vite for fast compilation.
- **Tailwind CSS**: Utility-first CSS styling for highly customized, vibrant, modern, glassmorphic designs.
- **Axios**: Promised-based HTTP client to consume RESTful backend APIs.
- **React Icons & React Hot Toast**: Seamless micro-interactions and interactive notification overlays.

### Backend
- **Node.js & Express.js**: Asynchronous backend event loop server with robust JSON routing.
- **Mongoose & MongoDB Atlas**: Native Document schema mapping and cloud-hosted cluster persistence.
- **JSON Web Tokens (JWT)**: Secure user session authorization token distribution.
- **bcryptjs**: High-entropy password hashing implementation.
- **Google Generative AI SDK**: Backend-secured connection to Google's next-gen `gemini-2.5-flash` model.

---

## 🚀 Key Features Implemented

1. **Authentication Module**:
   - Secure User Signup & Login utilizing `bcryptjs` hashing.
   - Session tracking through stateless JWT headers.
   - Interactive recovery question access setup to reset forgotten passwords securely.
2. **Dynamic Live Dashboard**:
   - Displays real-time statistics shelf showing **Total Positions**, active **Scholarships**, live **Internships**, available **Jobs**, **Bookmarked** counts, and **Recently Viewed** items.
   - Interactive profile completing popup interface to fine-tune matching criteria.
3. **Advanced Filtering & Search**:
   - Real-time instant search matching title/company.
   - Multi-select filters for Category (Scholarships, Internships, Jobs), Location, Work Mode (Remote, Hybrid, Onsite), and Required Skills.
4. **AI-Powered Recommendation Engine**:
   - A dedicated **"Recommended For You"** section matching active listings against user-profile skills automatically.
5. **Google Gemini Career AI Chatbot**:
   - A fully sandboxed career assistant floating widget (**EduInfo AI**).
   - Chat context tracking with historical transcript memory.
   - Uses secure server-side API proxy routing so AI Studio keys are never exposed in client bundles.
6. **Responsive UI/UX**:
   - 100% responsive fluid grids designed flawlessly across mobile, tablet, and high-DPI desktop viewports.

---

## 📁 Folder Structure

```
student-opportunity
├─ backend
│  ├─ .env (Server environment variables)
│  ├─ config
│  │  └─ db.js (MongoDB Mongoose connection engine)
│  ├─ controllers
│  │  └─ authController.js (Authentication route handlers)
│  ├─ middleware
│  ├─ models
│  │  ├─ Opportunity.js (Opportunities Database Schema)
│  │  └─ User.js (User Profile Database Schema)
│  ├─ package.json (Backend Dependency Tree)
│  ├─ routes
│  │  ├─ authRoutes.js (Authentication routing)
│  │  ├─ opportunityRoutes.js (Opportunities search & AI recommendation routing)
│  │  └─ chatRoutes.js (Secure chatbot Gemini proxy endpoint)
│  ├─ server.js (Express server bootstrap entrypoint)
│  └─ utils
└─ frontend
   ├─ package.json (Frontend dependencies)
   ├─ vite.config.js (Vite compiler config)
   ├─ src
   │  ├─ api
   │  │  └─ axios.js (Shared Axios Client configuration)
   │  ├─ components
   │  │  └─ Chatbot.jsx (Vibrant Career AI Floating Widget)
   │  ├─ index.css (Global styling tokens)
   │  ├─ main.jsx (React render entrypoint)
   │  ├─ App.jsx (Routes mapping shell)
   │  └─ pages
   │     ├─ Home.jsx (Beautiful organic landing splash page)
   │     ├─ Signup.jsx (Vibrant registration gate)
   │     ├─ Login.jsx (Stateless session entry + recovery modal)
   │     └─ Dashboard.jsx (Main opportunities matrix analytics workstation)
```

---

## 🛣️ Backend API Routes Map

| Endpoint | Method | Description | Request Body Payload |
| :--- | :--- | :--- | :--- |
| `/api/auth/signup` | **POST** | Registers a new user profile with recovery question parameters. | `{ name, email, password, secretQuestion, secretAnswer }` |
| `/api/auth/login` | **POST** | Authenticates credentials and returns a JWT session token. | `{ email, password }` |
| `/api/auth/forgot-password` | **POST** | Resets password after verifying the security answer. | `{ email, secretAnswer, newPassword }` |
| `/api/opportunities` | **GET** | Fetches all active scholarships, internships, and jobs from MongoDB. | *None* |
| `/api/opportunities/seed` | **GET** | Resets and seeds the MongoDB database with initial sample positions. | *None* |
| `/api/chat` | **POST** | Securely routes prompt to Gemini with historical thread memory. | `{ message, history }` |

---

## 🛠️ Local Environment Setup Instructions

Follow these commands to clone, configure, and boot the application locally on your machine.

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB Atlas account (or locally running MongoDB community server)
- Google AI Studio API Key

### 1. Configure the Backend Server
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install standard node package dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file inside the `backend/` folder and paste the following parameters:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   GEMINI_API_KEY=your_google_ai_studio_api_key
   ```
4. Seed the initial opportunity dataset by booting up the backend and visiting:
   `http://localhost:5000/api/opportunities/seed` in your browser.

### 2. Configure the Frontend Client
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install client package dependencies:
   ```bash
   npm install
   ```
3. Boot up the Vite developer bundle server:
   ```bash
   npm run dev
   ```
4. Access the web application at the local address printed by Vite (usually `http://localhost:5173`).

---

## 🚀 Recommended Future Architecture Upgrades
- **Automatic Opportunity Scraper**: Implement node cron jobs that scrape major student opportunity platforms and automatically inject new listings into the MongoDB cluster daily.
- **Resume Tailoring Module**: Allow students to upload their PDF resumes to the dashboard, extracting skills using text-parsing scripts, and automatically matching them to live internships.
- **Email Subscription Alerts**: Integrate a nodemailer/SendGrid channel that alerts users via email when a new high-matching opportunity matching their skills is added.
- **Role-based Auth Panels**: Create an Admin panel where college organizers or companies can register, log in, and post new opportunities directly to the database.