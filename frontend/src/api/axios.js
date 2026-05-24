import axios from "axios";

const API = axios.create({
  baseURL: "https://student-opportunity.onrender.com/api",
});

// Attach token automatically (future use)
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;
