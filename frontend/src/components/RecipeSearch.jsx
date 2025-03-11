import React, { useState } from "react";

const RecipeSearch = ({ onSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent form from reloading the page
    if (searchTerm) {
      onSearchResults(searchTerm); // Trigger the parent callback to search recipes
    }
  };

  return (
    <form onSubmit={handleSearch} className="mb-8">
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search for a recipe..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 rounded-l-md border border-r-0 border-blue-500 focus:ring-2 focus:ring-blue-600"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default RecipeSearch;
