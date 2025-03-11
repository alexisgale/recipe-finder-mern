import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { fetchRecipeById } from "../api/recipeApi";

const RecipeDetails = () => {
  const { idMeal } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Recipe passed through location state
  const recipeFromState = location.state ? location.state.recipe : null;

  useEffect(() => {
    const loadRecipeDetails = async () => {
      if (recipeFromState) {
        setRecipe(recipeFromState);
        setLoading(false);
      } else {
        try {
          setLoading(true);
          const data = await fetchRecipeById(idMeal);
          if (data) {
            setRecipe(data);
          }
        } catch (err) {
          setError("Failed to load recipe details. Please try again later.");
        } finally {
          setLoading(false);
        }
      }
    };

    loadRecipeDetails();
  }, [idMeal, recipeFromState]);

  const handleClose = () => {
    navigate(-1); // Navigate back to the recipe list page
  };

  if (loading) return <p>Loading recipe details...</p>;
  if (error) return <p>{error}</p>;
  if (!recipe) return <p>Recipe not found.</p>;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (recipe[`strIngredient${i}`]) {
      ingredients.push(`${recipe[`strIngredient${i}`]} - ${recipe[`strMeasure${i}`]}`);
    }
  }

  const instructionSteps = recipe.strInstructions
    .split(/\r\n|\n|\r/)
    .filter((step) => step.trim() !== "");

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl overflow-auto relative shadow-lg transform transition-all duration-300 ease-in-out scale-95 hover:scale-100 max-h-[80vh]">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white bg-red-600 p-3 rounded-full hover:bg-red-700 transition"
        >
          &times;
        </button>

        <h1 className="text-3xl font-bold text-center mb-4">{recipe.strMeal}</h1>
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-56 object-cover rounded-md mb-4"
        />

        <h2 className="text-xl font-semibold mb-4">Ingredients:</h2>
        <ul className="list-disc pl-5 mb-6">
          {ingredients.map((ingredient, index) => (
            <li key={index} className="mb-2">
              {ingredient}
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold mb-4">Instructions:</h2>
        {instructionSteps.map((step, index) => (
          <p key={index} className="mb-2">
            {step.trim()}
          </p>
        ))}
      </div>
    </div>
  );
};

export default RecipeDetails;
