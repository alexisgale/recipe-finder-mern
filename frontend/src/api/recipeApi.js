import axios from "axios";

// Define the base URLs for local and external APIs
const API_BASE_URL = "https://www.themealdb.com/api/json/v1/1";
const LOCAL_API_BASE_URL = "/api"; // Adjust this if your backend API has a different base URL

// General error handler function
const handleApiError = (error, customMessage) => {
  console.error(customMessage, error);

  // Check for error details and log accordingly
  if (error.response) {
    console.error("Response data:", error.response.data);
    console.error("Response status:", error.response.status);
    console.error("Response headers:", error.response.headers);
  } else if (error.request) {
    console.error("No response received:", error.request);
  } else {
    console.error("Error setting up request:", error.message);
  }
  throw error; // Rethrow the error for further handling
};

// General function to fetch data from API and return a clean response
const fetchDataFromApi = async (url) => {
  try {
    const response = await axios.get(url);

    // Ensure that data exists in the response
    if (response.data) {
      return response.data;
    } else {
      console.warn("Received empty response from the API.");
      return null;
    }
  } catch (error) {
    handleApiError(error, "API request failed:");
  }
};

// Search recipes by term from either local API or external API
export const searchRecipes = async (searchTerm, useLocalApi = false) => {
  const url = useLocalApi
    ? `${LOCAL_API_BASE_URL}/recipes/search?query=${encodeURIComponent(searchTerm)}`
    : `${API_BASE_URL}/search.php?s=${encodeURIComponent(searchTerm)}`;

  const data = await fetchDataFromApi(url);
  return useLocalApi ? data : data?.meals || [];
};

// Fetch all recipes from either local API or external API
export const fetchRecipes = async (useLocalApi = false) => {
  const url = useLocalApi ? `${LOCAL_API_BASE_URL}/recipes` : `${API_BASE_URL}/search.php?s=`;
  const data = await fetchDataFromApi(url);

  if (data?.meals) {
    return data.meals;
  } else {
    console.warn("No meals data in the API response");
    return [];
  }
};

// Fetch recipe details by ID from either local API or external API
export const fetchRecipeById = async (id, useLocalApi = false) => {
  const url = useLocalApi
    ? `${LOCAL_API_BASE_URL}/recipes/${id}`
    : `${API_BASE_URL}/lookup.php?i=${id}`;

  const data = await fetchDataFromApi(url);
  return useLocalApi ? data : data?.meals?.[0] || null;
};

// Fetch all cuisine types from either local API or external API
export const fetchCuisineTypes = async (useLocalApi = false) => {
  const url = useLocalApi
    ? `${LOCAL_API_BASE_URL}/recipes/cuisines`
    : `${API_BASE_URL}/list.php?a=list`;

  const data = await fetchDataFromApi(url);

  if (data?.meals) {
    return useLocalApi ? data : data.meals.map((cuisine) => cuisine.strArea);
  } else {
    console.warn("No cuisines data in the API response");
    return [];
  }
};

// Fetch recipes by specific cuisine type from either local API or external API
export const fetchRecipesByCuisine = async (cuisine, useLocalApi = false) => {
  const url = useLocalApi
    ? `${LOCAL_API_BASE_URL}/recipes/cuisine/${cuisine}`
    : `${API_BASE_URL}/filter.php?a=${cuisine}`;

  const data = await fetchDataFromApi(url);

  if (data?.meals) {
    return useLocalApi ? data : data.meals;
  } else {
    console.warn(`No recipes found for cuisine: ${cuisine}`);
    return [];
  }
};
