import React, { useState, useEffect } from "react";
import RecipeSearch from "./RecipeSearch";
import RecipeList from "./RecipeList";
import { fetchRecipes, searchRecipes } from "../api/recipeApi";
import { useDispatch, useSelector } from "react-redux"; // For login state

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedRecipe, setSelectedRecipe] = useState(null); // For recipe details view
  const [favorites, setFavorites] = useState([]); // For storing favorites

  const pageSize = 10;

  // Access login state from Redux
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  // Fetch recipes on page change or component mount
  useEffect(() => {
    loadRecipes();
  }, [currentPage]);

  const loadRecipes = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchRecipes();
      if (!response || !Array.isArray(response)) {
        throw new Error("Invalid data received from the API.");
      }

      const totalCount = response.length;
      setRecipes(response);
      setTotalPages(Math.ceil(totalCount / pageSize));
    } catch (err) {
      setError("Failed to load recipes. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchResults = async (searchTerm) => {
    setLoading(true);
    setError(null);

    try {
      const fetchedRecipes = await searchRecipes(searchTerm);
      const uniqueRecipes = [
        ...new Map(fetchedRecipes.map((recipe) => [recipe.idMeal, recipe])).values(),
      ];

      setRecipes(uniqueRecipes);
      setTotalPages(Math.ceil(uniqueRecipes.length / pageSize));
      setCurrentPage(1);
    } catch (err) {
      setError("Failed to search recipes. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Select a recipe to view details
  const handleSelectRecipe = (recipe) => {
    setSelectedRecipe(recipe);
  };

  // Close recipe details
  const handleCloseRecipeDetails = () => {
    setSelectedRecipe(null);
  };

  // Add a recipe to favorites
  const handleAddToFavorites = (recipe) => {
    if (isLoggedIn) {
      setFavorites((prevFavorites) => [...prevFavorites, recipe]);
      alert("Recipe added to favorites!");
    } else {
      alert("You must log in to save this recipe.");
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-center">Recipe Finder</h1>
      <RecipeSearch onSearchResults={handleSearchResults} />
      {error && <p>{error}</p>}
      {loading && <p>Loading recipes...</p>}

      {/* Recipe List */}
      <RecipeList
        recipes={recipes}
        onRecipeClick={handleSelectRecipe}
        selectedRecipe={selectedRecipe}
        onCloseRecipeDetails={handleCloseRecipeDetails}
        onAddToFavorites={handleAddToFavorites}
      />

      {/* Pagination Controls */}
      {isLoggedIn && (
        <div className="flex justify-center items-center mt-4">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Prev
          </button>
          <span className="text-lg mx-4">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
