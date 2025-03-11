// src/redux/actions/recipesActions.js

export const fetchRecipes = (page) => {
  return async (dispatch) => {
    // Logic to fetch recipes
    try {
      const response = await fetch(`YOUR_API_ENDPOINT?page=${page}`);
      const data = await response.json();
      dispatch({ type: "SET_RECIPES", payload: data });
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", payload: error.message });
    }
  };
};

export const searchRecipes = (searchTerm) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`YOUR_API_ENDPOINT/search?query=${searchTerm}`);
      const data = await response.json();
      dispatch({ type: "SET_SEARCH_RESULTS", payload: data });
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", payload: error.message });
    }
  };
};

export const saveRecipe = (recipe) => ({
  type: "SAVE_RECIPE",
  payload: recipe,
});

export const removeRecipe = (recipe) => ({
  type: "REMOVE_RECIPE",
  payload: recipe,
});
