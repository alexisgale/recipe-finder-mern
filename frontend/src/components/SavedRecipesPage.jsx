// src/pages/SavedRecipesPage.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromSavedRecipes } from "../redux/actions/userActions"; // Redux action for removing saved recipes

const SavedRecipesPage = () => {
  const dispatch = useDispatch();
  const { savedRecipes } = useSelector((state) => state.user); // Get saved recipes from Redux state
  const [selectedRecipe, setSelectedRecipe] = useState(null); // State to store the selected recipe for details view

  const handleRemoveRecipe = (recipeId) => {
    dispatch(removeFromSavedRecipes(recipeId)); // Remove recipe from saved list
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe); // Set the clicked recipe to show details
  };

  const handleCloseRecipeDetails = () => {
    setSelectedRecipe(null); // Close recipe details modal
  };

  // Function to extract ingredients from the recipe
  const getIngredients = (recipe) => {
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient) {
        ingredients.push(`${ingredient} ${measure ? measure : ""}`.trim());
      }
    }
    return ingredients;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Saved Recipes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {savedRecipes && savedRecipes.length > 0 ? (
          savedRecipes.map((recipe) => (
            <div
              key={recipe.idMeal}
              className="border rounded-md shadow-lg overflow-hidden bg-white hover:shadow-2xl transition duration-300"
            >
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="font-bold text-lg text-blue-600">{recipe.strMeal}</h2>
                <p className="text-sm text-gray-500">{recipe.strCategory}</p>
                <button
                  onClick={() => handleRecipeClick(recipe)} // View Recipe details
                  className="inline-block mt-3 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                >
                  View Recipe
                </button>
                <button
                  onClick={() => handleRemoveRecipe(recipe.idMeal)} // Remove from saved list
                  className="inline-block mt-3 ml-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300"
                >
                  Remove from Saved
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No saved recipes found.</p>
        )}
      </div>

      {/* Recipe Details (when selected) */}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl overflow-auto relative shadow-lg transform transition-all duration-300 ease-in-out scale-95 hover:scale-100 max-h-[80vh]">
            {/* Close Button */}
            <button
              onClick={handleCloseRecipeDetails} // Close the recipe details view
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
              {getIngredients(selectedRecipe).length > 0 ? (
                getIngredients(selectedRecipe).map((ingredient, index) => (
                  <li key={index} className="mb-2">
                    {ingredient}
                  </li>
                ))
              ) : (
                <p>No ingredients available.</p>
              )}
            </ul>

            <h2 className="text-xl font-semibold mb-4">Instructions:</h2>
            {selectedRecipe.strInstructions ? (
              selectedRecipe.strInstructions.split(/\r\n|\n|\r/).map((step, index) => (
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

export default SavedRecipesPage;
