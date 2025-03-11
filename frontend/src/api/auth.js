import axios from "axios";

// Base URL for your backend API
const API_URL = "http://localhost:5000/api/users";

// Register a new user
export const register = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { username, email, password });
    return response.data; // Return token or response data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

// Login user
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data; // Return token or response data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

// Example of how you can check for a logged-in user (with a token)
export const checkAuth = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");
  return token;
};
