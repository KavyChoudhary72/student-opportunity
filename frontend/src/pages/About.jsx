import { Link } from "react-router-dom";
import {
  FaGraduationCap,
  FaCode,
  FaRobot,
  FaArrowLeft,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

function About() {
  return (
    <div className="min-h-screen bg-[#f6efe6] relative overflow-hidden font-sans text-gray-800 flex flex-col justify-between p-4 sm:p-6 md:p-8">
      {/* Decorative Organic Background Nodes */}
      <div className="absolute top-0 left-0 w-[200px] sm:w-[320px] h-[200px] sm:h-[280px] bg-[#efd48d] rounded-br-[180px] opacity-40 blur-xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[200px] sm:w-[350px] h-[200px] sm:h-[300px] bg-[#d9e7c3] rounded-tl-[180px] opacity-50 blur-xl pointer-events-none"></div>

      <div className="max-w-5xl w-full mx-auto relative z-10 space-y-8 sm:space-y-12">
        {/* Navigation Header */}
        <nav className="flex items-center justify-between border-b border-gray-200/40 pb-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-600 hover:text-gray-950 transition"
          >
            <FaArrowLeft className="text-[10px]" /> Back to Home
          </Link>
          <h1 className="text-lg sm:text-xl font-black text-gray-950 tracking-tight">
            Edu<span className="text-[#f4b400]">Info</span> • About Us
          </h1>
        </nav>

        {/* Vision & Mission Core Statement */}
        <main className="text-center max-w-3xl mx-auto space-y-4 sm:space-y-6">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-200/50 rounded-full text-[10px] sm:text-xs font-bold text-emerald-700 shadow-xs">
            🎯 Operational Mission Blueprint
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-950 tracking-tight leading-tight">
            Bridging the gap between tech students and high-growth{" "}
            <span className="text-emerald-700">opportunities</span>.
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed font-normal">
            EduInfo is an intelligent, centralized platform designed to minimize
            career discovery friction for students. By consolidating real-time
            verified data pipelines, we provide direct access to academic
            scholarships, industry-grade internships, and high-growth software
            engineering entry-level jobs within a single unified workspace.
          </p>
        </main>

        {/* Technical Value Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pt-4">
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="p-3 bg-amber-50 text-[#f4b400] rounded-xl text-lg w-fit">
                <FaGraduationCap />
              </div>
              <h3 className="font-extrabold text-gray-900 text-base sm:text-lg mt-4">
                Verified Repositories
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-2 leading-relaxed font-normal">
                Every single application link and corporate entry uploaded onto
                our centralized platform undergoes a verification filter to
                effectively eliminate broken navigation pathways and fraudulent
                listings.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl text-lg w-fit">
                <FaRobot />
              </div>
              <h3 className="font-extrabold text-gray-900 text-base sm:text-lg mt-4">
                Cognitive Matching
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-2 leading-relaxed font-normal">
                Leveraging the computing structure of the Google Gemini API, the
                platform autonomously analyzes candidate skill sets against
                real-time listings to push relevant, high-probability matches.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl text-lg w-fit">
                <FaCode />
              </div>
              <h3 className="font-extrabold text-gray-900 text-base sm:text-lg mt-4">
                Robust Full-Stack
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-2 leading-relaxed font-normal">
                Engineered from the ground up using the high-performance MERN
                Stack (MongoDB Atlas, Express, React, Node.js), protected by
                robust JWT authentication session state guards and fluid
                Tailwind utility styles.
              </p>
            </div>
          </div>
        </section>

        {/* Developer Identity Card with Image Verification Layout */}
        <section className="bg-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 border border-gray-100 shadow-sm max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          {/* Profile Image Frame with Automatic Fallback Design */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden shadow-md border-2 border-emerald-600 flex-shrink-0 bg-gradient-to-tr from-emerald-600 to-amber-400 flex items-center justify-center text-white text-3xl font-black">
            <img
              src="my-profile.jpg.jpeg"
              alt="Kavy Choudhary"
              className="w-full h-full object-cover relative z-10"
              onError={(e) => {
                // If the path breaks, displays clean fallback initials instead of an ugly broken icon
                e.target.style.display = "none";
              }}
            />
            <span className="absolute z-0">KC</span>
          </div>

          <div className="space-y-2 w-full">
            <div>
              <h3 className="text-xl font-black text-gray-900 tracking-tight">
                Kavy Choudhary
              </h3>
              <p className="text-xs sm:text-sm font-bold text-emerald-700">
                Full-Stack MERN Developer & Data Science Engineer
              </p>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-normal">
              I am a second-year B.Tech student specializing in Data Science at
              the Swami Keshvanand Institute of Technology (SKIT Jaipur). As a
              passionate Full-Stack MERN Developer, I design high-performance,
              responsive web architectures and integrate cognitive intelligence
              systems. I engineered this project to streamline structural
              application routing and eliminate systemic career discovery
              friction for peers chasing global listings.
            </p>

            {/* Social Redirection Profiles */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2">
              <a
                href="https://linkedin.com/in/kavy-choudhary"
                target="_blank"
                rel="noreferrer"
                className="hover:text-emerald-700 transition flex items-center gap-1.5 text-xs font-bold text-gray-600 bg-[#f6efe6] px-3 py-1.5 rounded-xl border border-gray-200/50"
              >
                <FaLinkedin className="text-emerald-700 text-sm" /> LinkedIn
              </a>
              <a
                href="https://github.com/KavyChoudhary72"
                target="_blank"
                rel="noreferrer"
                className="hover:text-gray-900 transition flex items-center gap-1.5 text-xs font-bold text-gray-600 bg-gray-900 text-white px-3 py-1.5 rounded-xl shadow-xs"
              >
                <FaGithub className="text-white text-sm" /> GitHub
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Footer System Logs */}
      <footer className="text-center text-[10px] sm:text-xs text-gray-400 pt-8 border-t border-gray-200/30 mt-12 max-w-5xl w-full mx-auto relative z-10">
        © 2026 EduInfo Analytics Platform. Engineered with high production-grade
        evaluation protocols.
      </footer>
    </div>
  );
}

export default About;
