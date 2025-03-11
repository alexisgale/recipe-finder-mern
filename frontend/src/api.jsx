// src/api.jsx
import axios from "axios";

// Base URL for API
const API_BASE_URL = "http://localhost:5000/api";

// Create an Axios instance for reusable configurations
const apiInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Add request interceptor to handle Authorization header for all requests
apiInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Function to fetch recipes based on search term
export const fetchRecipes = async (searchTerm = "") => {
  try {
    const response = await apiInstance.get("/recipes", {
      params: { search: searchTerm },
    });

    // Ensure the response is in the expected format
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error("Invalid response structure from the API");
    }
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error; // Rethrow to handle in calling component
  }
};

// Function to login a user
export const login = async (email, password) => {
  try {
    const response = await apiInstance.post("/users/login", { email, password });

    // Check if the response contains the necessary data
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error("Invalid login response");
    }
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// Function to register a user
export const register = async (username, email, password) => {
  try {
    const response = await apiInstance.post("/users/register", {
      username,
      email,
      password,
    });

    // Check if registration response is successful
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error("Invalid registration response");
    }
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// Function to create a new recipe
export const createRecipe = async (recipeData) => {
  try {
    const response = await apiInstance.post("/recipes", recipeData);

    // Ensure the response contains the expected recipe data
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error("Error creating recipe");
    }
  } catch (error) {
    console.error("Error creating recipe:", error);
    throw error;
  }
};

// Function to fetch saved recipes
export const getSavedRecipes = async () => {
  try {
    const response = await apiInstance.get("/recipes/saved");

    // Check if response contains the saved recipes
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error("Error fetching saved recipes");
    }
  } catch (error) {
    console.error("Error fetching saved recipes:", error);
    throw error;
  }
};
