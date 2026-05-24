import { useState, useEffect } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaQuestionCircle, FaKey } from "react-icons/fa";
import scholarshipImage from "../assets/scholarship1.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  // FORGOT PASSWORD SUBSYSTEM STATES
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [secretAnswer, setSecretAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

  const navigate = useNavigate();

  // REMEMBER ME LIFECYCLE HOOK MATRIX
  useEffect(() => {
    const cachedMail = localStorage.getItem("edu_info_remember_email");
    if (cachedMail) {
      setEmail(cachedMail);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await API.post("/auth/login", {
        email: email.toLowerCase().trim(),
        password,
      });

      // Session Local Cache Setup
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Remember me persistence router lock
      if (rememberMe) {
        localStorage.setItem(
          "edu_info_remember_email",
          email.toLowerCase().trim(),
        );
      } else {
        localStorage.removeItem("edu_info_remember_email");
      }

      toast.success("Login successful 🎉");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid credentials configuration.",
      );
    } finally {
      setLoading(false);
    }
  };

  // FORGOT PASSWORD TRIGGER HANDLER VIA BACKEND
  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();

    // Frontend Matrix Guard Check for Reset Form
    if (
      newPassword.length < 8 ||
      !/[a-zA-Z]/.test(newPassword) ||
      !/[0-9]/.test(newPassword)
    ) {
      toast.error(
        "New password must be alphanumeric and minimum 8 characters long.",
      );
      return;
    }

    try {
      setResetLoading(true);

      const { data } = await API.post("/auth/forgot-password", {
        email: resetEmail.toLowerCase().trim(),
        secretAnswer: secretAnswer.toLowerCase().trim(),
        newPassword,
      });

      if (data.success) {
        toast.success("Password synchronized successfully! 🔓");
        setShowResetModal(false);
        // Clear reset values state layers
        setSecretAnswer("");
        setNewPassword("");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Identity verification layer failed.",
      );
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6efe6] relative overflow-hidden flex items-center justify-center px-4 py-4">
      {/* Background Shapes */}
      <div className="absolute top-0 left-0 w-[160px] h-[120px] md:w-[220px] md:h-[170px] bg-[#efd48d] rounded-br-[90px] opacity-80"></div>
      <div className="absolute top-0 right-0 w-[140px] h-[100px] md:w-[200px] md:h-[150px] bg-[#efd48d] rounded-bl-[80px] opacity-80"></div>
      <div className="absolute bottom-0 left-0 w-[130px] h-[100px] md:w-[180px] md:h-[130px] bg-[#d8e4c5] rounded-tr-[80px] opacity-80"></div>
      <div className="absolute bottom-0 right-0 w-[150px] h-[110px] md:w-[200px] md:h-[150px] bg-[#efd48d] rounded-tl-[90px] opacity-80"></div>

      {/* Main Card Wrapper Structure Container */}
      <div className="relative z-10 bg-white w-full max-w-4xl rounded-[28px] md:rounded-[36px] shadow-[0_12px_40px_rgba(0,0,0,0.08)] overflow-hidden">
        <div className="grid lg:grid-cols-2">
          {/* LEFT SIDE FORM INTERFACES */}
          <div className="p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center">
            {/* Logo */}
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Edu<span className="text-[#f4b400]">Info</span>
              </h1>
              <p className="text-gray-500 mt-2 text-[10px] md:text-xs tracking-[3px]">
                SCHOLARSHIPS • INTERNSHIPS • JOBS
              </p>
            </div>

            <h2 className="text-2xl sm:text-3xl xl:text-[40px] font-bold text-gray-900">
              Welcome Back !
            </h2>
            <p className="text-gray-500 mt-4 text-sm md:text-base max-w-md">
              Login to continue exploring opportunities designed for students
              and future professionals.
            </p>

            {/* CORE AUTH LOGIN FORM */}
            <form onSubmit={handleLogin} className="mt-8 space-y-4">
              {/* Email Block */}
              <div>
                <label className="block text-gray-800 font-medium mb-2 text-xs sm:text-sm">
                  Email Address
                </label>
                <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 bg-[#faf8f4] focus-within:border-[#f4b400] transition">
                  <FaEnvelope className="text-gray-400 text-sm flex-shrink-0" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your registered email"
                    className="w-full ml-3 bg-transparent outline-none text-gray-700 text-sm"
                    required
                  />
                </div>
              </div>

              {/* Password Block */}
              <div>
                <label className="block text-gray-800 font-medium mb-2 text-xs sm:text-sm">
                  Password
                </label>
                <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 bg-[#faf8f4] focus-within:border-[#f4b400] transition">
                  <FaLock className="text-gray-400 text-sm flex-shrink-0" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter account verification key"
                    className="w-full ml-3 bg-transparent outline-none text-gray-700 text-sm"
                    required
                  />
                </div>
              </div>

              {/* Controls Options Row Matrix */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs sm:text-sm">
                <label className="flex items-center gap-2 text-gray-600 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="accent-emerald-700 w-4 h-4 rounded"
                  />
                  Remember me
                </label>

                <button
                  type="button"
                  onClick={() => {
                    setResetEmail(email);
                    setShowResetModal(true);
                  }}
                  className="text-emerald-700 hover:text-emerald-800 font-bold tracking-tight text-left"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Action Trigger Button */}
              <button
                disabled={loading}
                className="w-full bg-[#f4b400] hover:bg-[#e3a600] transition py-3 rounded-xl font-bold text-black shadow-md"
              >
                {loading
                  ? "Verifying workspace authorization tokens..."
                  : "Login"}
              </button>
            </form>

            <p className="text-center mt-6 text-gray-600 text-sm">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-emerald-700 font-extrabold hover:underline ml-0.5"
              >
                Sign Up here
              </Link>
            </p>
          </div>

          {/* RIGHT SIDE VECTOR LOGOS BRANDING */}
          <div className="hidden lg:flex items-center justify-center bg-[#fdf9f4] relative overflow-hidden min-h-[500px] px-6">
            <div className="absolute w-[220px] h-[220px] xl:w-[280px] xl:h-[280px] bg-[#dce9cc] rounded-[70px] rotate-6"></div>
            <div className="absolute w-[180px] h-[180px] xl:w-[220px] xl:h-[220px] border-[3px] border-[#bfd8a6] rounded-[60px] rotate-6"></div>
            <div className="absolute top-20 right-14 w-7 h-7 bg-[#efd48d] rounded-full"></div>
            <div className="absolute bottom-20 left-14 w-4 h-4 bg-[#bfd8a6] rounded-full"></div>
            <img
              src={scholarshipImage}
              alt="Scholarship Asset Vector Frame"
              className="relative z-10 w-[190px] xl:w-[250px] object-contain"
            />
          </div>
        </div>
      </div>

      {/* ================= DYNAMIC FORGOT PASSWORD OVERLAY MODAL INTERFACE ================= */}
      {showResetModal && (
        <div className="fixed inset-0 bg-gray-950/40 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] sm:rounded-[32px] p-6 max-w-md w-full shadow-2xl border border-gray-100 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div>
              <h3 className="text-xl font-black text-gray-900 tracking-tight">
                Account Access Recovery
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Verify your registration parameters secret key context to
                overwrite password.
              </p>
            </div>

            <form onSubmit={handleForgotPasswordSubmit} className="space-y-3.5">
              {/* Target Recovery Mail */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                  Target Account Email
                </label>
                <div className="flex items-center border border-gray-200 rounded-xl px-3.5 py-2.5 bg-[#faf8f4]">
                  <FaEnvelope className="text-gray-400 text-xs flex-shrink-0" />
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="Enter email account index"
                    className="w-full ml-2 bg-transparent outline-none text-gray-700 text-xs sm:text-sm"
                    required
                  />
                </div>
              </div>

              {/* Secret Key Response */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                  Secret Question Response Value
                </label>
                <div className="flex items-center border border-gray-200 rounded-xl px-3.5 py-2.5 bg-[#faf8f4]">
                  <FaKey className="text-gray-400 text-xs flex-shrink-0" />
                  <input
                    type="text"
                    value={secretAnswer}
                    onChange={(e) => setSecretAnswer(e.target.value)}
                    placeholder="Enter secret answer configured at setup"
                    className="w-full ml-2 bg-transparent outline-none text-gray-700 text-xs sm:text-sm"
                    required
                  />
                </div>
              </div>

              {/* New Alphanumeric Key */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                  New Alphanumeric Password (Min 8 Chars)
                </label>
                <div className="flex items-center border border-gray-200 rounded-xl px-3.5 py-2.5 bg-[#faf8f4]">
                  <FaLock className="text-gray-400 text-xs flex-shrink-0" />
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter brand new complex secure string"
                    className="w-full ml-2 bg-transparent outline-none text-gray-700 text-xs sm:text-sm"
                    required
                  />
                </div>
              </div>

              {/* Button Clusters Options */}
              <div className="flex items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowResetModal(false)}
                  className="w-1/2 bg-gray-100 hover:bg-gray-200 transition py-2.5 rounded-xl text-xs font-bold text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={resetLoading}
                  className="w-1/2 bg-gray-900 hover:bg-emerald-800 text-white transition py-2.5 rounded-xl text-xs font-bold shadow-md disabled:opacity-50"
                >
                  {resetLoading ? "Synchronizing..." : "Reset Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
