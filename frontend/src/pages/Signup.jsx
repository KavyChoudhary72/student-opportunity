import { useState } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaQuestionCircle,
  FaKey,
} from "react-icons/fa";
import scholarshipImage from "../assets/scholarship.png";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secretQuestion, setSecretQuestion] = useState(
    "What is your favorite city?",
  );
  const [secretAnswer, setSecretAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Frontend form validation rules
  const validateForm = () => {
    const STRICT_EMAIL_REGEX =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const ALPHABETIC_NAME_REGEX = /^[a-zA-Z\s]{3,50}$/;

    if (!ALPHABETIC_NAME_REGEX.test(name)) {
      toast.error(
        "Full name must be at least 3 characters and contain only alphabets.",
      );
      return false;
    }

    if (!STRICT_EMAIL_REGEX.test(email)) {
      toast.error(
        "Please provide a completely valid structured email address.",
      );
      return false;
    }

    if (password.length < 8) {
      toast.error("Password string must be at least 8 characters long.");
      return false;
    }

    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    if (!hasLetter || !hasNumber) {
      toast.error("Password policy: Must be alphanumeric (letters + numbers).");
      return false;
    }

    if (!secretAnswer.trim()) {
      toast.error("Please configure your security recovery response.");
      return false;
    }

    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);

      await API.post("/auth/signup", {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password,
        secretQuestion,
        secretAnswer: secretAnswer.toLowerCase().trim(),
      });

      toast.success("Account created successfully 🎉");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Signup validation pipeline aborted",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6efe6] relative overflow-hidden flex items-center justify-center px-4 py-6 md:py-12">
      {/* Background Shapes */}
      <div className="absolute top-0 left-0 w-[160px] h-[120px] md:w-[220px] md:h-[170px] bg-[#efd48d] rounded-br-[90px] opacity-80"></div>
      <div className="absolute top-0 right-0 w-[140px] h-[100px] md:w-[200px] md:h-[150px] bg-[#efd48d] rounded-bl-[80px] opacity-80"></div>
      <div className="absolute bottom-0 left-0 w-[130px] h-[100px] md:w-[180px] md:h-[130px] bg-[#d8e4c5] rounded-tr-[80px] opacity-80"></div>
      <div className="absolute bottom-0 right-0 w-[150px] h-[110px] md:w-[200px] md:h-[150px] bg-[#efd48d] rounded-tl-[90px] opacity-80"></div>

      {/* Main Card Wrapper Layout */}
      <div className="relative z-10 bg-white w-full max-w-4xl rounded-[28px] md:rounded-[36px] shadow-[0_12px_40px_rgba(0,0,0,0.08)] overflow-hidden my-auto">
        <div className="grid lg:grid-cols-2">
          {/* LEFT SIDE FORM ELEMENTS */}
          <div className="p-5 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center max-h-[90vh] lg:max-h-none overflow-y-auto">
            {/* Logo */}
            <div className="mb-4 md:mb-6">
              <h1 className="text-xl md:text-3xl font-bold text-gray-900">
                Edu<span className="text-[#f4b400]">Info</span>
              </h1>
              <p className="text-gray-500 mt-1 text-[9px] md:text-xs tracking-[2px] md:tracking-[3px]">
                SCHOLARSHIPS • INTERNSHIPS • JOBS
              </p>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-[32px] font-black text-gray-900 tracking-tight">
              Create Account
            </h2>
            <p className="text-gray-500 mt-1.5 text-xs md:text-sm">
              Discover active funding assets tailored directly to your
              engineering stack.
            </p>

            {/* Registration form content */}
            <form onSubmit={handleSignup} className="mt-5 space-y-3.5">
              {/* Name Input */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="flex items-center border border-gray-200 rounded-xl px-4 py-2.5 bg-[#faf8f4] focus-within:border-[#f4b400] transition">
                  <FaUser className="text-gray-400 text-xs flex-shrink-0" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter full identity characters"
                    className="w-full ml-3 bg-transparent outline-none text-gray-700 text-xs sm:text-sm"
                    required
                  />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="flex items-center border border-gray-200 rounded-xl px-4 py-2.5 bg-[#faf8f4] focus-within:border-[#f4b400] transition">
                  <FaEnvelope className="text-gray-400 text-xs flex-shrink-0" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full ml-3 bg-transparent outline-none text-gray-700 text-xs sm:text-sm"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Password (Alphanumeric, Min 8 Chars)
                </label>
                <div className="flex items-center border border-gray-200 rounded-xl px-4 py-2.5 bg-[#faf8f4] focus-within:border-[#f4b400] transition">
                  <FaLock className="text-gray-400 text-xs flex-shrink-0" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create complex dynamic key"
                    className="w-full ml-3 bg-transparent outline-none text-gray-700 text-xs sm:text-sm"
                    required
                  />
                </div>
              </div>

              {/* Security Questions Selection Module */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Recovery Question
                  </label>
                  <div className="flex items-center border border-gray-200 rounded-xl px-3 py-2.5 bg-[#faf8f4] focus-within:border-[#f4b400] transition">
                    <FaQuestionCircle className="text-gray-400 text-xs flex-shrink-0 mr-2" />
                    <select
                      value={secretQuestion}
                      onChange={(e) => setSecretQuestion(e.target.value)}
                      className="bg-transparent outline-none text-gray-700 text-xs w-full font-medium"
                    >
                      <option value="What is your favorite city?">
                        Your favorite city?
                      </option>
                      <option value="What was your first pet name?">
                        First pet name?
                      </option>
                      <option value="What is your primary tech stack?">
                        Primary tech stack?
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Secret Recovery Key
                  </label>
                  <div className="flex items-center border border-gray-200 rounded-xl px-3 py-2.5 bg-[#faf8f4] focus-within:border-[#f4b400] transition">
                    <FaKey className="text-gray-400 text-xs flex-shrink-0" />
                    <input
                      type="text"
                      value={secretAnswer}
                      onChange={(e) => setSecretAnswer(e.target.value)}
                      placeholder="Your secret answer"
                      className="w-full ml-2 bg-transparent outline-none text-gray-700 text-xs sm:text-sm"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button Trigger */}
              <button
                disabled={loading}
                className="w-full mt-2 bg-[#f4b400] hover:bg-[#e3a600] transition py-3 rounded-xl font-bold text-gray-950 text-xs sm:text-sm shadow-md active:scale-[0.99] disabled:opacity-50"
              >
                {loading
                  ? "Creating secure credentials profile..."
                  : "Create Account"}
              </button>
            </form>

            <p className="text-center mt-5 text-gray-600 text-xs sm:text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-emerald-700 font-extrabold hover:underline ml-1"
              >
                Login here
              </Link>
            </p>
          </div>

          {/* RIGHT SIDE GRAPHIC BLOCK CONTAINER */}
          <div className="hidden lg:flex items-center justify-center bg-[#fdf9f4] relative overflow-hidden min-h-[500px] px-6">
            <div className="absolute w-[220px] h-[220px] xl:w-[280px] xl:h-[280px] bg-[#dce9cc] rounded-[70px] rotate-6"></div>
            <div className="absolute w-[180px] h-[180px] xl:w-[220px] xl:h-[220px] border-[3px] border-[#bfd8a6] rounded-[60px] rotate-6"></div>
            <div className="absolute top-20 right-14 w-7 h-7 bg-[#efd48d] rounded-full"></div>
            <div className="absolute bottom-20 left-14 w-4 h-4 bg-[#bfd8a6] rounded-full"></div>
            <img
              src={scholarshipImage}
              alt="Scholarship Vectors"
              className="relative z-10 w-[190px] xl:w-[250px] object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
