import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaGraduationCap,
  FaBriefcase,
  FaBookmark,
  FaSearch,
  FaLaptopCode,
  FaUserCircle,
  FaSignOutAlt,
  FaMapMarkerAlt,
  FaRegClock,
  FaFilter,
  FaMagic,
  FaGlobeAmericas,
  FaHistory,
  FaList,
} from "react-icons/fa";
import toast from "react-hot-toast";

function Dashboard() {
  const navigate = useNavigate();

  // State Management for Database Opportunities
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Profile Popup and Filter States
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [skillsInput, setSkillsInput] = useState("");
  const [preferredMode, setPreferredMode] = useState("Remote");
  const [preferredLocation, setPreferredLocation] = useState("");

  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedMode, setSelectedMode] = useState("All");
  const [selectedSkill, setSelectedSkill] = useState("All");

  // Dynamic Persistent Bookmarks Array Hook
  const [savedIds, setSavedIds] = useState(() => {
    try {
      const cachedBookmarks = localStorage.getItem("edu_info_bookmarks");
      return cachedBookmarks ? JSON.parse(cachedBookmarks) : [];
    } catch {
      return [];
    }
  });

  // Authentication & Initial Profile Completeness Verification
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const savedUser = JSON.parse(localStorage.getItem("user"));
      if (savedUser && savedUser.profileCompleted !== true) {
        setShowProfilePopup(true);
        if (savedUser.interests) setSelectedInterests(savedUser.interests);
        if (savedUser.skills) setSkillsInput(savedUser.skills.join(", "));
        if (savedUser.preferredMode) setPreferredMode(savedUser.preferredMode);
        if (savedUser.preferredLocation)
          setPreferredLocation(savedUser.preferredLocation);
      }
    } catch (e) {
      console.error("Session profile alignment error", e);
    }
  }, [navigate]);

  // Dynamic Real-time MongoDB Atlas API Fetch Engine
  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const response = await fetch(
          "https://student-opportunity.onrender.com/api/opportunities",
        );
        const data = await response.json();

        if (data.success) {
          setOpportunities(data.opportunities || []);
        } else {
          toast.error(data.message || "Failed to sync opportunities grid.");
        }
      } catch (error) {
        console.log("Database connectivity breakdown:", error);
        toast.error("Failed to fetch opportunities from MongoDB Atlas");
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, []);

  // Dynamic User Session Profiling States
  const [userName, setUserName] = useState(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        return parsed.name || "Student";
      } catch (e) {
        return "Student";
      }
    }
    return "Student";
  });

  const [userSkills, setUserSkills] = useState(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        return parsed.skills || ["React", "Node.js", "JavaScript"];
      } catch (e) {
        return ["React", "Node.js", "JavaScript"];
      }
    }
    return ["React", "Node.js", "JavaScript"];
  });

  // Extraction of unique filter values dynamically from standard raw listings
  const locationsList = useMemo(() => {
    return [
      "All",
      ...new Set(opportunities.map((o) => o.location).filter(Boolean)),
    ];
  }, [opportunities]);

  const allSkillsList = useMemo(() => {
    return [
      "All",
      ...new Set(opportunities.flatMap((o) => o.skills || []).filter(Boolean)),
    ];
  }, [opportunities]);

  const modesList = ["All", "Remote", "Onsite", "Hybrid"];

  // Master Automated Pipeline Filter Engine Hook
  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((item) => {
      const itemTitle = item.title ? item.title.toLowerCase() : "";
      const itemCompany = item.company ? item.company.toLowerCase() : "";
      const cleanQuery = searchQuery.toLowerCase().trim();

      const matchesSearch =
        itemTitle.includes(cleanQuery) || itemCompany.includes(cleanQuery);
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesLocation =
        selectedLocation === "All" || item.location === selectedLocation;
      const matchesMode = selectedMode === "All" || item.type === selectedMode;
      const matchesSkill =
        selectedSkill === "All" || item.skills?.includes(selectedSkill);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesLocation &&
        matchesMode &&
        matchesSkill
      );
    });
  }, [
    opportunities,
    searchQuery,
    selectedCategory,
    selectedLocation,
    selectedMode,
    selectedSkill,
  ]);

  // AI Matching Recommendation Engine Logic
  const aiRecommendations = useMemo(() => {
    if (!opportunities.length) return [];
    const userSkillsLower = userSkills.map((s) => s.toLowerCase());

    return opportunities.filter((item) =>
      item.skills?.some((skill) =>
        userSkillsLower.includes(skill.toLowerCase()),
      ),
    );
  }, [opportunities, userSkills]);

  // Compute metrics statistics dashboard modules dynamically
  const countStats = useMemo(() => {
    return {
      scholarships: opportunities.filter((o) => o.category === "Scholarship")
        .length,
      internships: opportunities.filter((o) => o.category === "Internship")
        .length,
      jobs: opportunities.filter((o) => o.category === "Job").length,
    };
  }, [opportunities]);

  // Interactive Bookmarks Switch Handler with LocalStorage Persistence
  const toggleSave = (id) => {
    const isSaved = savedIds.includes(id);
    let updatedIds;

    if (isSaved) {
      updatedIds = savedIds.filter((i) => i !== id);
      toast.success("Removed from bookmarks");
    } else {
      updatedIds = [...savedIds, id];
      toast.success("Opportunity bookmarked safely! 💾");
    }
    setSavedIds(updatedIds);
    localStorage.setItem("edu_info_bookmarks", JSON.stringify(updatedIds));
  };

  // Safe Dynamic Application Router Gateway Redirect
  const handleApplyOpportunity = (opportunityItem) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((item) => item._id !== opportunityItem._id);
      return [opportunityItem, ...filtered].slice(0, 3);
    });

    toast.success(
      `Redirecting to ${opportunityItem.company || "application portal"}... 🚀`,
    );

    const applyLink = opportunityItem.applyLink;
    setTimeout(() => {
      if (applyLink) {
        window.open(applyLink, "_blank", "noopener,noreferrer");
      } else {
        toast.error(
          "Apply link not verified or available for this opportunity",
        );
      }
    }, 800);
  };

  // Profile Setup Persistence Synchronization Engine
  const handleSaveProfile = () => {
    const savedUser = JSON.parse(localStorage.getItem("user")) || {};
    const cleanSkillsArray = skillsInput
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);

    const updatedUser = {
      ...savedUser,
      interests: selectedInterests,
      skills: cleanSkillsArray,
      preferredMode,
      preferredLocation,
      profileCompleted: true,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUserSkills(cleanSkillsArray);
    if (updatedUser.name) setUserName(updatedUser.name);

    setShowProfilePopup(false);
    toast.success("Profile preferences synchronized successfully! 🎉");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("eduinfo_chat_session");
    toast.success("Logged out successfully! See you soon. 👋");
    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6efe6] flex items-center justify-center font-sans">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600 font-bold text-sm tracking-wide">
            Syncing Opportunities Workspace...
          </p>
        </div>
      </div>
    );
  }
  return (
    <div
      className="min-h-screen bg-[#f6efe6] relative p-3 sm:p-4 md:p-8 text-gray-800 font-sans"
      style={{ overflow: "visible" }}
    >
      {/* Decorative Organic Nodes */}
      <div className="absolute top-0 left-0 w-[200px] sm:w-[320px] h-[200px] sm:h-[280px] bg-[#efd48d] rounded-br-[180px] opacity-50 blur-xl pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[180px] sm:w-[300px] h-[180px] sm:h-[240px] bg-[#d9e7c3] rounded-bl-[160px] opacity-60 blur-xl pointer-events-none"></div>

      {/* COMPLETE PROFILE POPUP MODAL (FULLY ADAPTIVE FOR TOUCH SCREENS) */}
      {showProfilePopup && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999] flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-lg rounded-[24px] sm:rounded-[32px] p-5 sm:p-6 md:p-8 shadow-2xl border border-white/40 max-h-[90vh] overflow-y-auto w-full">
            <h2 className="text-xl sm:text-2xl font-black text-gray-900">
              Complete Your Profile
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Help us personalize scholarships, internships and jobs for you.
            </p>

            <div className="mt-5">
              <label className="text-xs sm:text-sm font-bold text-gray-700">
                Interested In
              </label>
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2.5">
                {["Scholarship", "Internship", "Job"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      if (selectedInterests.includes(item)) {
                        setSelectedInterests((prev) =>
                          prev.filter((i) => i !== item),
                        );
                      } else {
                        setSelectedInterests((prev) => [...prev, item]);
                      }
                    }}
                    className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                      selectedInterests.includes(item)
                        ? "bg-emerald-600 text-white shadow-sm"
                        : "bg-[#f6efe6] text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <label className="text-xs sm:text-sm font-bold text-gray-700">
                Skills (comma separated)
              </label>
              <input
                type="text"
                value={skillsInput}
                onChange={(e) => setSkillsInput(e.target.value)}
                placeholder="React, Python, MongoDB, Node.js"
                className="w-full mt-1.5 bg-[#faf8f4] border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#f4b400] text-xs sm:text-sm"
              />
            </div>

            <div className="mt-4">
              <label className="text-xs sm:text-sm font-bold text-gray-700">
                Preferred Mode
              </label>
              <select
                value={preferredMode}
                onChange={(e) => setPreferredMode(e.target.value)}
                className="w-full mt-1.5 bg-[#faf8f4] border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#f4b400] text-xs sm:text-sm"
              >
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Onsite">Onsite</option>
              </select>
            </div>

            <div className="mt-4">
              <label className="text-xs sm:text-sm font-bold text-gray-700">
                Preferred Location
              </label>
              <input
                type="text"
                value={preferredLocation}
                onChange={(e) => setPreferredLocation(e.target.value)}
                placeholder="Jaipur, Bangalore, Delhi..."
                className="w-full mt-1.5 bg-[#faf8f4] border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#f4b400] text-xs sm:text-sm"
              />
            </div>

            <button
              type="button"
              onClick={handleSaveProfile}
              className="w-full mt-6 sm:mt-7 bg-[#f4b400] hover:bg-[#e3a600] transition py-3 rounded-xl font-bold text-gray-900 shadow-md text-sm"
            >
              Save Preferences
            </button>
          </div>
        </div>
      )}

      <div
        className="relative z-10 max-w-7xl mx-auto space-y-4 sm:space-y-6 md:space-y-8"
        style={{ overflow: "visible" }}
      >
        {/* ================= NAVBAR LAYER (MOBILE OPTIMIZED EXPANSION ROW) ================= */}
        <header className="relative z-50 bg-white/90 backdrop-blur-md rounded-[20px] sm:rounded-[28px] shadow-sm border border-white/40 p-4 sm:p-6 flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="text-center lg:text-left w-full lg:w-auto">
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              Edu<span className="text-[#f4b400]">Info</span> Dashboard
            </h1>
            <p className="text-[10px] sm:text-xs font-medium tracking-[1.5px] text-gray-400 uppercase mt-0.5">
              Welcome back,{" "}
              <span className="text-emerald-700 font-extrabold normal-case tracking-normal">
                {userName}
              </span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full lg:w-auto relative z-50">
            <div className="flex items-center bg-[#f6efe6]/80 px-4 py-2.5 rounded-xl w-full sm:w-64 border border-gray-200/50 focus-within:border-[#f4b400] transition-colors">
              <FaSearch className="text-gray-400 text-sm flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search opportunities..."
                className="bg-transparent outline-none ml-2.5 text-xs sm:text-sm w-full placeholder-gray-400"
              />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <div className="relative group z-50">
                <button className="flex items-center gap-2 bg-white border border-gray-200 px-3.5 sm:px-4 py-2.5 rounded-xl shadow-sm hover:shadow-md transition text-xs sm:text-sm font-semibold">
                  <FaUserCircle className="text-base sm:text-lg text-emerald-600" />
                  <span className="max-w-[80px] truncate">{userName}</span>
                </button>

                {/* Dropdown position adjusted to auto-center bounds on handheld screens */}
                <div className="absolute right-1/2 translate-x-1/2 sm:translate-x-0 sm:right-0 top-14 w-72 sm:w-85 bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[100]">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 truncate">
                    {userName}
                  </h3>
                  <div className="mt-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      Interests
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {selectedInterests.length === 0 ? (
                        <span className="text-xs text-gray-400">
                          No profile tracking set
                        </span>
                      ) : (
                        selectedInterests.map((item) => (
                          <span
                            key={item}
                            className="bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full text-xs font-semibold"
                          >
                            {item}
                          </span>
                        ))
                      )}
                    </div>
                  </div>

                  <div className="mt-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      Skills Matrix
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {userSkills.map((skill) => (
                        <span
                          key={skill}
                          className="bg-[#f6efe6] text-gray-700 px-2 py-0.5 rounded-md text-[10px] font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowProfilePopup(true)}
                    className="w-full mt-4 bg-[#f4b400] hover:bg-[#e3a600] transition py-2 rounded-xl font-bold text-gray-900 text-xs shadow-sm"
                  >
                    Edit Profile Setup
                  </button>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="bg-amber-400 hover:bg-amber-500 text-gray-900 transition px-3.5 sm:px-4 py-2.5 rounded-xl font-bold shadow-sm flex items-center gap-2 text-xs sm:text-sm whitespace-nowrap"
              >
                <FaSignOutAlt className="text-xs" /> Logout
              </button>
            </div>
          </div>
        </header>

        {/* ================= PIPELINE ANALYTICS SHELF (GRID OPTIMIZED FOR MOBILE 2X3 / LG 6X1) ================= */}
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5 relative z-10">
          {/* 1. Total Opportunities Card */}
          <div className="bg-white rounded-xl sm:rounded-[24px] p-4 sm:p-5 shadow-sm border border-gray-100 flex items-center gap-3 sm:gap-4">
            <div className="p-2.5 sm:p-3.5 bg-indigo-50 rounded-xl sm:rounded-2xl text-indigo-600 text-xl sm:text-2xl flex-shrink-0">
              <FaList />
            </div>
            <div className="truncate">
              <p className="text-[9px] sm:text-xs text-gray-400 font-bold uppercase tracking-wider truncate">
                Total Positions
              </p>
              <h3 className="text-sm sm:text-xl md:text-2xl font-black mt-0.5 text-gray-900 truncate">
                {opportunities.length} Total
              </h3>
            </div>
          </div>

          {/* 2. Scholarships Card */}
          <div className="bg-white rounded-xl sm:rounded-[24px] p-4 sm:p-5 shadow-sm border border-gray-100 flex items-center gap-3 sm:gap-4">
            <div className="p-2.5 sm:p-3.5 bg-amber-50 rounded-xl sm:rounded-2xl text-amber-500 text-xl sm:text-2xl flex-shrink-0">
              <FaGraduationCap />
            </div>
            <div className="truncate">
              <p className="text-[9px] sm:text-xs text-gray-400 font-bold uppercase tracking-wider truncate">
                Scholarships
              </p>
              <h3 className="text-sm sm:text-xl md:text-2xl font-black mt-0.5 text-gray-900 truncate">
                {countStats.scholarships} Active
              </h3>
            </div>
          </div>

          {/* 3. Internships Card */}
          <div className="bg-white rounded-xl sm:rounded-[24px] p-4 sm:p-5 shadow-sm border border-gray-100 flex items-center gap-3 sm:gap-4">
            <div className="p-2.5 sm:p-3.5 bg-emerald-50 rounded-xl sm:rounded-2xl text-emerald-600 text-xl sm:text-2xl flex-shrink-0">
              <FaBriefcase />
            </div>
            <div className="truncate">
              <p className="text-[9px] sm:text-xs text-gray-400 font-bold uppercase tracking-wider truncate">
                Internships
              </p>
              <h3 className="text-sm sm:text-xl md:text-2xl font-black mt-0.5 text-gray-900 truncate">
                {countStats.internships} Live
              </h3>
            </div>
          </div>

          {/* 4. Jobs Card */}
          <div className="bg-white rounded-xl sm:rounded-[24px] p-4 sm:p-5 shadow-sm border border-gray-100 flex items-center gap-3 sm:gap-4">
            <div className="p-2.5 sm:p-3.5 bg-purple-50 rounded-xl sm:rounded-2xl text-purple-600 text-xl sm:text-2xl flex-shrink-0">
              <FaLaptopCode />
            </div>
            <div className="truncate">
              <p className="text-[9px] sm:text-xs text-gray-400 font-bold uppercase tracking-wider truncate">
                Jobs
              </p>
              <h3 className="text-sm sm:text-xl md:text-2xl font-black mt-0.5 text-gray-900 truncate">
                {countStats.jobs || 0} Available
              </h3>
            </div>
          </div>

          {/* 5. Bookmarked Card */}
          <div className="bg-white rounded-xl sm:rounded-[24px] p-4 sm:p-5 shadow-sm border border-gray-100 flex items-center gap-3 sm:gap-4">
            <div className="p-2.5 sm:p-3.5 bg-rose-50 rounded-xl sm:rounded-2xl text-rose-500 text-xl sm:text-2xl flex-shrink-0">
              <FaBookmark />
            </div>
            <div className="truncate">
              <p className="text-[9px] sm:text-xs text-gray-400 font-bold uppercase tracking-wider truncate">
                Bookmarked
              </p>
              <h3 className="text-sm sm:text-xl md:text-2xl font-black mt-0.5 text-gray-900 truncate">
                {savedIds.length} Saved
              </h3>
            </div>
          </div>

          {/* 6. Recently Viewed Card */}
          <div className="bg-white rounded-xl sm:rounded-[24px] p-4 sm:p-5 shadow-sm border border-gray-100 flex items-center gap-3 sm:gap-4">
            <div className="p-2.5 sm:p-3.5 bg-blue-50 rounded-xl sm:rounded-2xl text-blue-500 text-xl sm:text-2xl flex-shrink-0">
              <FaHistory />
            </div>
            <div className="truncate">
              <p className="text-[9px] sm:text-xs text-gray-400 font-bold uppercase tracking-wider truncate">
                Recent Views
              </p>
              <h3 className="text-sm sm:text-xl md:text-2xl font-black mt-0.5 text-gray-900 truncate">
                {recentlyViewed.length} Viewed
              </h3>
            </div>
          </div>
        </section>
        {/* ================= AI SMART RECOMMENDATION SYSTEM SHELF (FLUID CARD ROW) ================= */}
        <div
          className={`transition-all duration-700 ease-in-out overflow-hidden relative z-0 ${
            searchQuery.trim() === ""
              ? "max-h-[1200px] opacity-100 mb-4 sm:mb-6 md:mb-8 transform scale-100"
              : "max-h-0 opacity-0 mb-0 transform scale-95 pointer-events-none"
          }`}
        >
          <section className="bg-gradient-to-br from-emerald-900 via-emerald-950 to-neutral-900 rounded-[20px] sm:rounded-[32px] p-4 sm:p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute right-0 bottom-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <div className="bg-emerald-500/20 text-emerald-300 p-2 rounded-xl text-xs sm:text-sm">
                <FaMagic />
              </div>
              <h2 className="text-base sm:text-xl md:text-2xl font-bold tracking-tight">
                Recommended For You
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {aiRecommendations.length === 0 ? (
                <p className="text-xs sm:text-sm text-neutral-400 col-span-full py-2">
                  No matching opportunities found for your tracked skills
                  parameters.
                </p>
              ) : (
                aiRecommendations.map((item) => (
                  <div
                    key={`ai-${item._id || item.id}`}
                    className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 flex flex-col justify-between hover:bg-white/10 transition-all"
                  >
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-bold text-white text-sm sm:text-base line-clamp-1">
                          {item.title}
                        </h4>
                        <span className="text-[8px] sm:text-[9px] font-extrabold uppercase px-2 py-0.5 bg-amber-400 text-gray-950 rounded-md flex-shrink-0">
                          AI Match
                        </span>
                      </div>
                      <p className="text-xs text-emerald-300 font-medium mt-0.5 truncate">
                        {item.company}
                      </p>
                      <p className="text-xs text-neutral-300 mt-2.5 line-clamp-2 font-normal leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-400">
                      <span className="flex items-center gap-1">
                        <FaMapMarkerAlt className="text-[10px]" />{" "}
                        {item.location || "Remote"}
                      </span>
                      <span
                        onClick={() => handleApplyOpportunity(item)}
                        className="text-amber-300 font-bold cursor-pointer hover:underline"
                      >
                        Apply Now →
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        {/* ================= WORKSPACE CORE WORKFLOW ENGINE (SIDEBAR DECOUPLING) ================= */}
        <main
          className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 items-start w-full mt-4"
          style={{ overflow: "visible" }}
        >
          {/* CONTROL STRIP (SIDEBAR WITH ADAPTIVE VIEWPORT POSITION LAYOUTS) */}
          <aside
            className="w-full lg:w-[280px] xl:w-[310px] flex-shrink-0 lg:sticky"
            style={{ top: "24px", zIndex: 30, overflow: "visible" }}
          >
            <div className="bg-white rounded-[20px] sm:rounded-[28px] p-5 sm:p-6 border border-gray-100 shadow-sm space-y-5 max-h-none lg:max-h-[calc(100vh-4rem)] overflow-y-auto w-full">
              <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                <FaFilter className="text-xs text-gray-400" />
                <h3 className="font-extrabold text-sm sm:text-base text-gray-900 tracking-tight">
                  Advanced Filtering
                </h3>
              </div>

              {/* Filter: Category */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                  Category Type
                </label>
                <div className="flex flex-row flex-wrap lg:flex-col gap-1.5 w-full">
                  {["All", "Scholarship", "Internship", "Job"].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border w-auto lg:w-full text-center lg:text-left ${
                        selectedCategory === cat
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200 shadow-xs"
                          : "bg-white text-gray-600 border-gray-100 hover:bg-gray-50"
                      }`}
                    >
                      {cat === "All" ? "All Categories" : cat + "s"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter: Location */}
              <div className="space-y-1.5 pt-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                  Location Base
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full bg-[#f6efe6]/60 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold outline-none focus:border-[#f4b400]"
                >
                  {locationsList.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc === "All" ? "All Locations" : loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filter: Mode */}
              <div className="space-y-1.5 pt-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                  Work Mode
                </label>
                <select
                  value={selectedMode}
                  onChange={(e) => setSelectedMode(e.target.value)}
                  className="w-full bg-[#f6efe6]/60 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold outline-none focus:border-[#f4b400]"
                >
                  {modesList.map((mode) => (
                    <option key={mode} value={mode}>
                      {mode === "All" ? "All Modes" : mode}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filter: Required Skills */}
              <div className="space-y-1.5 pt-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                  Required Skill
                </label>
                <select
                  value={selectedSkill}
                  onChange={(e) => setSelectedSkill(e.target.value)}
                  className="w-full bg-[#f6efe6]/60 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold outline-none focus:border-[#f4b400]"
                >
                  {allSkillsList.map((skill) => (
                    <option key={skill} value={skill}>
                      {skill === "All" ? "All Skills Matrix" : skill}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedLocation("All");
                  setSelectedMode("All");
                  setSelectedSkill("All");
                  setSearchQuery("");
                }}
                className="w-full py-2 text-xs font-bold bg-[#f6efe6] text-gray-600 hover:bg-rose-50 hover:text-rose-600 rounded-xl transition-all"
              >
                Clear All Filters
              </button>
            </div>
          </aside>

          {/* DYNAMIC LISTINGS GRID SYSTEM */}
          <section
            className="flex-1 w-full space-y-4 sm:space-y-5"
            style={{ overflow: "visible" }}
          >
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              Latest Available Positions ({filteredOpportunities.length})
            </h2>

            {filteredOpportunities.length === 0 ? (
              <div className="bg-white rounded-[20px] sm:rounded-[28px] p-8 sm:p-12 text-center border border-gray-100 shadow-sm">
                <p className="text-sm text-gray-400 font-semibold">
                  No results match your selected filter matrices.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
                {filteredOpportunities.map((item) => {
                  const isSaved = savedIds.includes(
                    item._id?.toString() || item.id?.toString(),
                  );
                  return (
                    <div
                      key={item._id || item.id}
                      className="bg-white border border-gray-100 rounded-[20px] sm:rounded-[24px] p-4 sm:p-5 flex flex-col justify-between hover:shadow-md transition group"
                    >
                      <div>
                        <div className="flex justify-between items-start gap-3">
                          <div>
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-black rounded-md uppercase tracking-wider mb-2 border ${
                                item.category === "Scholarship"
                                  ? "bg-amber-50 text-amber-700 border-amber-200"
                                  : item.category === "Internship"
                                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                    : "bg-blue-50 text-blue-700 border-blue-200"
                              }`}
                            >
                              {item.category}
                            </span>
                            <h3 className="font-extrabold text-sm sm:text-base text-gray-900 leading-tight tracking-tight line-clamp-1 group-hover:text-emerald-700 transition-colors">
                              {item.title}
                            </h3>
                          </div>
                          <button
                            onClick={() =>
                              toggleSave(
                                item._id?.toString() || item.id?.toString(),
                              )
                            }
                            className="text-gray-400 hover:text-amber-500 transition text-base sm:text-lg p-1 flex-shrink-0"
                          >
                            <FaBookmark
                              className={
                                isSaved ? "text-amber-500" : "text-gray-300"
                              }
                            />
                          </button>
                        </div>

                        <p className="text-xs text-gray-500 font-bold mt-1 truncate">
                          {item.company} •{" "}
                          <span className="text-neutral-400 font-semibold">
                            {item.location} ({item.type || "Remote"})
                          </span>
                        </p>
                        <p className="text-xs text-gray-400 mt-2.5 line-clamp-3 leading-relaxed font-normal">
                          {item.description}
                        </p>

                        <div className="flex flex-wrap gap-1 mt-3">
                          {item.skills?.map((skill) => (
                            <span
                              key={skill}
                              className="bg-[#f6efe6]/80 text-gray-600 text-[9px] px-2 py-0.5 rounded-md font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-5 pt-3 border-t border-gray-50 flex items-center justify-between text-[11px]">
                        <span className="text-[10px] text-gray-400 font-medium flex items-center gap-1">
                          <FaRegClock className="text-gray-300" /> Until{" "}
                          {item.deadline || "Closing Soon"}
                        </span>
                        <button
                          onClick={() => handleApplyOpportunity(item)}
                          className="bg-gray-900 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl shadow-xs transition active:scale-95"
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
