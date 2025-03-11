export const login = (userData) => {
  return {
    type: "USER_LOGIN",
    payload: userData,
  };
};

export const logout = () => {
  return {
    type: "USER_LOGOUT",
  };
};

export const addToSavedRecipes = (recipe) => {
  return {
    type: "ADD_TO_SAVED_RECIPES",
    payload: recipe, // The recipe object is added to savedRecipes
  };
};

export const removeFromSavedRecipes = (recipeId) => {
  return {
    type: "REMOVE_FROM_SAVED_RECIPES",
    payload: recipeId,
  };
};
