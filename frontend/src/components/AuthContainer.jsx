import React, { useState } from "react";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const AuthContainer = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="bg-gradient-to-br from-slate-100 to-slate-300 flex flex-col justify-center items-center min-h-screen p-4 md:p-0 antialiased">
      {/* Container adapts size based on device layout screen breakpoints */}
      <div
        className={`group bg-white rounded-2xl shadow-2xl relative overflow-hidden w-full max-w-[400px] min-h-[580px] md:w-[768px] md:max-w-full md:min-h-[480px] ${isSignUp ? "right-panel-active" : ""}`}
      >
        <Signup />
        <Login />

        {/* --- RESPONSIVE OVERLAY SYSTEM --- */}
        <div
          className="absolute bottom-0 left-0 w-full h-1/2 md:top-0 md:left-1/2 md:w-1/2 md:h-full overflow-hidden transition-transform duration-600 ease-in-out z-[100] 
          group-[.right-panel-active]:-translate-y-full md:group-[.right-panel-active]:translate-y-0
          md:group-[.right-panel-active]:-translate-x-full"
        >
          <div
            className="bg-gradient-to-b md:bg-gradient-to-r from-amber-400 to-teal-500 text-white relative -top-full md:top-0 -left-0 md:-left-full h-[200%] md:h-full w-full md:w-[200%] transform translate-y-0 md:translate-x-0 transition-transform duration-600 ease-in-out 
            group-[.right-panel-active]:translate-y-1/2 md:group-[.right-panel-active]:translate-y-0
            md:group-[.right-panel-active]:translate-x-1/2"
          >
            {/* Left Overlay Content Panel */}
            <div className="bg-amber-500 absolute flex flex-col items-center justify-center px-6 md:px-10 text-center top-0 left-0 h-1/2 w-full md:h-full md:w-1/2 transition-transform duration-600 ease-in-out -translate-y-[20%] md:translate-y-0 md:-translate-x-[20%] group-[.right-panel-active]:translate-y-0 md:group-[.right-panel-active]:translate-x-0">
              <h2 className="font-bold text-xl md:text-2xl">Welcome Back!</h2>
              <p className="text-xs md:text-sm font-light leading-relaxed my-3 md:my-5 max-w-[280px]">
                To keep connected with us please login with your personal info
              </p>
              <button
                className="rounded-full border border-white bg-transparent text-white text-xs font-bold py-2 md:py-3 px-9 md:px-11 tracking-wider uppercase transition-transform duration-75 active:scale-95 cursor-pointer"
                onClick={() => setIsSignUp(false)}
              >
                Sign In
              </button>
            </div>

            {/* Right Overlay Content Panel */}
            <div className="bg-teal-500 absolute flex flex-col items-center justify-center px-6 md:px-10 text-center bottom-0 md:top-0 left-0 h-1/2 w-full md:h-full md:w-1/2 md:right-0 transition-transform duration-600 ease-in-out translate-y-0 md:translate-x-0 group-[.right-panel-active]:translate-y-[20%] md:group-[.right-panel-active]:translate-x-[20%]">
              <h2 className="font-bold text-xl md:text-2xl">Hello, Friend!</h2>
              <p className="text-xs md:text-sm font-light leading-relaxed my-3 md:my-5 max-w-[280px]">
                Enter your personal details and start journey with us
              </p>
              <button
                className="rounded-full border border-white bg-transparent text-white text-xs font-bold py-2 md:py-3 px-9 md:px-11 tracking-wider uppercase transition-transform duration-75 active:scale-95 cursor-pointer"
                onClick={() => setIsSignUp(true)}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;
