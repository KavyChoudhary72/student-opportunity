import Chatbot from "./components/Chatbot";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import About from "./pages/About";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

// Security Check Guard Layer (Bina chede fully active rakha hai)
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      {/* Toast settings globally loaded (Back to original clean standard style) */}
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        {/* FIX 1: Jab browser normal link '/' par ho */}
        <Route path="/" element={<Home />} />

        {/* FIX 2: Jab browser exact '/home' par crash maar raha ho, toh ye line use handles karegi */}
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />

        {/* Auth Entry points */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Dashboard Dashboard view */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Fallback Catch: Agar user kisi galat path par chala jaye, toh use automatic wapas homepage par drop kar do */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* GLOBAL CHATBOT WIDGET PLACE: Renders outstandingly across all screens */}
      <Chatbot />
    </BrowserRouter>
  );
}

export default App;
