// src/redux/reducers/userReducer.js

const initialState = {
  isLoggedIn: false,
  userData: null,
  savedRecipes: [], // To hold the list of saved recipes
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        userData: action.payload,
      };
    case "USER_LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        userData: null,
        savedRecipes: [], // Clear saved recipes on logout
      };
    case "ADD_TO_SAVED_RECIPES":
      const isRecipeAlreadySaved = state.savedRecipes.some(
        (recipe) => recipe.idMeal === action.payload.idMeal
      );
      if (isRecipeAlreadySaved) {
        alert("You have already added this recipe to your saved list!");
        return state;
      }
      return {
        ...state,
        savedRecipes: [...state.savedRecipes, action.payload],
      };
    case "REMOVE_FROM_SAVED_RECIPES":
      return {
        ...state,
        savedRecipes: state.savedRecipes.filter((recipe) => recipe.idMeal !== action.payload),
      };
    default:
      return state;
  }
};

export default userReducer;
