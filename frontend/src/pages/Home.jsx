import { Link } from "react-router-dom";
import {
  FaGraduationCap,
  FaBriefcase,
  FaLaptopCode,
  FaArrowRight,
} from "react-icons/fa";

function Home() {
  return (
    <div className="min-h-screen bg-[#f6efe6] relative overflow-hidden font-sans text-gray-800 flex flex-col justify-between">
      {/* Organic Background Blobs */}
      <div className="absolute top-0 left-0 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-[#efd48d] rounded-full opacity-40 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-[#d9e7c3] rounded-full opacity-50 blur-3xl pointer-events-none"></div>

      {/* Header Navbar */}
      <nav className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-black text-gray-950 tracking-tight">
          Edu<span className="text-[#f4b400]">Info</span>
        </h1>
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            to="/login"
            className="text-xs sm:text-sm font-bold text-gray-700 hover:text-gray-950 transition"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="bg-gray-900 hover:bg-emerald-800 text-white font-bold text-[10px] sm:text-xs px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl shadow-md transition"
          >
            Get Started
          </Link>
          <Link
            to="/about"
            className="text-xs sm:text-sm font-bold text-gray-600 hover:text-gray-950 transition"
          >
            About Us
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6 sm:pt-12 md:pt-20 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center flex-grow">
        {/* Left Copy */}
        <div className="space-y-4 sm:space-y-6 max-w-xl text-center lg:text-left mx-auto lg:mx-0 flex flex-col items-center lg:items-start">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded-full text-[10px] sm:text-xs font-bold text-emerald-700 shadow-sm">
            🚀 Powered by Intelligent Match Filtering
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-950 leading-[1.15] lg:leading-[1.1] tracking-tight">
            Your single gateway to massive student{" "}
            <span className="text-emerald-700 block sm:inline">
              opportunities
            </span>
            .
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed max-w-md sm:max-w-xl">
            Discover verified scholarships, industrial internships, and
            high-growth entry-level jobs tailored specifically to your
            technology stack.
          </p>
          <div className="pt-2 sm:pt-4 w-full sm:w-auto">
            <Link
              to="/signup"
              className="bg-[#f4b400] hover:bg-[#e2a600] text-gray-950 font-bold text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              Explore Opportunities{" "}
              <FaArrowRight className="text-xs sm:text-sm" />
            </Link>
          </div>
        </div>

        {/* Right Asset Frame (Hidden on Mobile/Tablet, visible and beautifully aligned on Desktop) */}
        <div className="hidden lg:flex justify-center relative">
          <div className="absolute w-[340px] h-[340px] bg-[#dce9cc] rounded-[80px] rotate-12 top-10"></div>
          <div className="absolute w-[300px] h-[300px] border-[3px] border-[#bfd8a6] rounded-[70px] rotate-6 top-16"></div>

          {/* A modern sleek vector shape to simulate a dashboard preview card natively */}
          <div
            className="relative z-10 w-[300px] h-[220px] bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 flex flex-col justify-between animate-bounce"
            style={{ animationDuration: "6s" }}
          >
            <div className="flex justify-between items-center">
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-black rounded-full uppercase tracking-wider">
                System Index Match
              </span>
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
            </div>

            <div>
              <h4 className="font-black text-gray-950 text-base xl:text-lg leading-tight tracking-tight">
                Unlock Your Potential
              </h4>
              <p className="text-[11px] font-bold text-emerald-700 mt-1.5 flex items-center gap-1">
                🚀 Matrix Matching Engine Active
              </p>
              <p className="text-[10px] font-medium text-gray-400 mt-1 italic">
                "Opportunities don't happen, you create them."
              </p>
            </div>

            <div className="w-full bg-gray-900 text-white font-extrabold text-[11px] py-2.5 rounded-xl text-center tracking-wide">
              Explore Live Tracks Now
            </div>
          </div>
        </div>
      </main>

      {/* Strategic Tri-Feature Metric Shelf */}
      <section className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white rounded-[24px] p-5 sm:p-6 border border-gray-100 shadow-sm flex gap-4 items-start">
            <div className="p-3 bg-amber-50 text-[#f4b400] rounded-xl text-lg sm:text-xl flex-shrink-0">
              <FaGraduationCap />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-base sm:text-lg">
                Scholarships
              </h4>
              <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-relaxed">
                Global funding paths, grants, and research stipends mapped
                dynamically.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-[24px] p-5 sm:p-6 border border-gray-100 shadow-sm flex gap-4 items-start">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl text-lg sm:text-xl flex-shrink-0">
              <FaBriefcase />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-base sm:text-lg">
                Internships
              </h4>
              <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-relaxed">
                Remote and onsite modern roles across top software institutions.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-[24px] p-5 sm:p-6 border border-gray-100 shadow-sm flex gap-4 items-start">
            <div className="p-3 bg-blue-50 text-blue-500 rounded-xl text-lg sm:text-xl flex-shrink-0">
              <FaLaptopCode />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-base sm:text-lg">
                Career Jobs
              </h4>
              <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-relaxed">
                Accelerate entry-level application pipelines with premium
                routing tracking.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
