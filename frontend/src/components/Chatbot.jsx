import { useState, useRef, useEffect } from "react";
import {
  FaRobot,
  FaPaperPlane,
  FaTimes,
  FaMinus,
  FaRegCommentDots,
} from "react-icons/fa";
import API from "../api/axios";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Storage connection matrix logic
  const [messages, setMessages] = useState(() => {
    const savedChat = sessionStorage.getItem("eduinfo_chat_session");
    return savedChat
      ? JSON.parse(savedChat)
      : [
          {
            id: 1,
            sender: "bot",
            text: "Hi! 👋 I am EduInfo AI, your helpful career assistant. I will remember our chat until you close this tab. Ask me anything!",
          },
        ];
  });

  // 1. DYNAMIC AUTO-SCROLL LOOP: Runs whenever messages update or chatbot typing state changes
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }, 80); // 80ms latency buffer to let DOM render completely before sliding
    }
  }, [messages, isTyping, isOpen]);

  // 2. ENTRY TRIGGER LOOP: Forces scrollbar to jump to the bottom instantly the moment user opens the chatbot
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "auto" });
      }, 50);
    }
  }, [isOpen]);

  const askGeminiWithContext = async (currentUserPrompt) => {
    try {
      const { data } = await API.post("/chat", {
        message: currentUserPrompt,
        history: messages,
      });

      if (data.success) {
        return data.reply;
      } else {
        return data.message || "Failed to communicate with AI.";
      }
    } catch (error) {
      console.error("Gemini proxy API tracking crash:", error);
      return "I faced a connection hiccup. Please try typing your message again or refresh the screen.";
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentQuery = input.trim();
    setInput("");
    setIsTyping(true);

    const botReplyText = await askGeminiWithContext(currentQuery);

    setIsTyping(false);
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + 1,
        sender: "bot",
        text: botReplyText,
      },
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans antialiased">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-tr from-emerald-800 to-emerald-600 hover:from-emerald-700 hover:to-emerald-500 text-white p-4 rounded-full shadow-[0_8px_32px_rgba(4,120,87,0.3)] transition-all duration-300 hover:scale-110 flex items-center justify-center relative border border-emerald-500/30 group"
        >
          <FaRegCommentDots className="text-2xl group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#f4b400] rounded-full border-2 border-[#f6efe6] animate-ping"></span>
        </button>
      )}

      {isOpen && (
        <div className="bg-white/95 backdrop-blur-md w-[320px] sm:w-[360px] h-[460px] sm:h-[500px] rounded-[24px] shadow-[0_16px_48px_rgba(0,0,0,0.12)] border border-gray-100 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-200">
          <div className="bg-gradient-to-r from-gray-950 via-emerald-900 to-gray-950 p-4 flex items-center justify-between text-white border-b border-emerald-800/20">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-tr from-[#f4b400] to-amber-300 rounded-xl flex items-center justify-center text-gray-950 shadow-md">
                <FaRobot className="text-lg" />
              </div>
              <div>
                <h4 className="font-black text-xs sm:text-sm tracking-tight text-white">
                  EduInfo AI
                </h4>
                <p className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>{" "}
                  Google Next-Gen Active
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <button
                onClick={() => setIsOpen(false)}
                className="hover:text-white transition p-1"
              >
                <FaMinus className="text-xs" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:text-white transition p-1"
              >
                <FaTimes className="text-sm" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 bg-[#fdfdfb] space-y-3.5 scrollbar-thin">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex w-full ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-[18px] p-3 text-xs sm:text-sm font-medium leading-relaxed whitespace-pre-wrap ${msg.sender === "user" ? "bg-emerald-700 text-white rounded-br-none shadow-xs" : "bg-[#f6efe6] text-gray-800 rounded-bl-none border border-gray-200/50"}`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-[#f6efe6] text-gray-400 rounded-[18px] rounded-bl-none p-3 px-4 text-xs border border-gray-200/40 flex items-center gap-1">
                  <span
                    className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></span>
                  <span
                    className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></span>
                  <span
                    className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <form
            onSubmit={handleSendMessage}
            className="p-3 bg-white border-t border-gray-100 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 bg-[#faf8f4] text-gray-700 placeholder-gray-400 text-xs sm:text-sm rounded-xl px-4 py-2.5 outline-none border border-gray-200 focus:border-emerald-600 transition"
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 text-white p-2.5 rounded-xl transition flex items-center justify-center shadow-md shadow-emerald-700/10"
            >
              <FaPaperPlane className="text-xs sm:text-sm" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
