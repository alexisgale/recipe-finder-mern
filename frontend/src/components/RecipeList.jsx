import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToSavedRecipes, removeFromSavedRecipes } from "../redux/actions/userActions"; // Update to the correct path

const RecipeList = ({ recipes, onRecipeClick, selectedRecipe, onCloseRecipeDetails }) => {
  const { isLoggedIn, savedRecipes } = useSelector((state) => state.user); // Access isLoggedIn and savedRecipes from Redux store
  const dispatch = useDispatch();

  const ingredients = selectedRecipe ? [] : null;
  if (selectedRecipe) {
    // Extract ingredients when a recipe is selected
    for (let i = 1; i <= 20; i++) {
      if (selectedRecipe[`strIngredient${i}`]) {
        ingredients.push(
          `${selectedRecipe[`strIngredient${i}`]} - ${selectedRecipe[`strMeasure${i}`]}`
        );
      }
    }
  }

  const instructionSteps = selectedRecipe
    ? selectedRecipe.strInstructions?.split(/\r\n|\n|\r/).filter((step) => step.trim() !== "")
    : [];

  // Check if the recipe is already saved
  const isSaved = (recipeId) => savedRecipes.some((savedRecipe) => savedRecipe.idMeal === recipeId);

  // Handle adding a recipe to saved recipes
  const handleAddToSaved = (recipe) => {
    if (!isSaved(recipe.idMeal)) {
      dispatch(addToSavedRecipes(recipe));
      alert("Recipe added to saved recipes!");
    } else {
      alert("This recipe is already in your saved recipes!");
    }
  };

  // Handle removing a recipe from saved recipes
  const handleRemoveFromSaved = (recipe) => {
    dispatch(removeFromSavedRecipes(recipe.idMeal));
    alert("Recipe removed from saved recipes!");
  };

  return (
    <div>
      {/* If the user is not logged in, show the message */}
      {!isLoggedIn ? (
        <div className="text-center text-lg font-semibold text-red-500">
          You must log in to view the recipes 🥗
          <div className="mt-4">
            <Link to="/login" className="text-blue-600 underline">
              Login
            </Link>{" "}
            or{" "}
            <Link to="/register" className="text-blue-600 underline">
              Register
            </Link>
          </div>
        </div>
      ) : (
        // Recipe List
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recipes && recipes.length > 0 ? (
            recipes.map((recipe) => (
              <div
                key={recipe.idMeal}
                className="border rounded-xl shadow-xl overflow-hidden bg-white hover:shadow-2xl transition duration-300"
              >
                <img
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="font-semibold text-lg text-blue-600">{recipe.strMeal}</h2>
                  <p className="text-sm text-gray-500">{recipe.strCategory}</p>
                  <button
                    onClick={() => onRecipeClick(recipe)} // Pass the clicked recipe to show details
                    className="inline-block mt-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition duration-300"
                  >
                    View Recipe
                  </button>

                  {/* Add/Remove to Saved Recipes */}
                  <div className="mt-4 flex gap-4">
                    {" "}
                    {/* Added gap between buttons */}
                    {isSaved(recipe.idMeal) ? (
                      <button
                        onClick={() => handleRemoveFromSaved(recipe)} // Remove from saved recipes
                        className="bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition duration-300"
                      >
                        Remove from Saved
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAddToSaved(recipe)} // Add to saved recipes
                        className="bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition duration-300"
                      >
                        Add to Saved
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No recipes found.</p>
          )}
        </div>
      )}

      {/* Recipe Details (when selected) */}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-3xl overflow-auto relative shadow-lg transform transition-all duration-300 ease-in-out scale-95 hover:scale-100 max-h-[80vh]">
            {/* Close Button */}
            <button
              onClick={onCloseRecipeDetails} // Close the recipe details view
              className="absolute top-4 right-4 text-white bg-red-600 p-3 rounded-full hover:bg-red-700 transition"
            >
              &times;
            </button>

            {/* Recipe Title and Image */}
            <h1 className="text-3xl font-bold text-center mb-4">{selectedRecipe.strMeal}</h1>
            <img
              src={selectedRecipe.strMealThumb}
              alt={selectedRecipe.strMeal}
              className="w-full h-56 object-cover rounded-md mb-4"
            />

            {/* Ingredients and Instructions Section */}
            <h2 className="text-xl font-semibold mb-4">Ingredients:</h2>
            <ul className="list-disc pl-5 mb-6">
              {ingredients && ingredients.length > 0 ? (
                ingredients.map((ingredient, index) => (
                  <li key={index} className="mb-2">
                    {ingredient}
                  </li>
                ))
              ) : (
                <p>No ingredients available.</p>
              )}
            </ul>

            <h2 className="text-xl font-semibold mb-4">Instructions:</h2>
            {instructionSteps.length > 0 ? (
              instructionSteps.map((step, index) => (
                <p key={index} className="mb-2">
                  {step.trim()}
                </p>
              ))
            ) : (
              <p>No instructions available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeList;
