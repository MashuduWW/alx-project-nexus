// utils/api.ts
import axios from "axios";

// Base URL from environment variable
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, 
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
