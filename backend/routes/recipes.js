import express from "express";
import Recipe from "../models/Recipe.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// Get all recipes (public route)
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find().populate("user", "username");
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching recipes: " + err.message });
  }
});

// Get recipes by user (protected route)
router.get("/myrecipes", authenticateToken, async (req, res) => {
  try {
    const recipes = await Recipe.find({ user: req.user.id });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching your recipes: " + err.message });
  }
});

// Update a recipe (protected route)
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    if (recipe.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this recipe" });
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedRecipe);
  } catch (err) {
    res.status(400).json({ message: "Error updating recipe: " + err.message });
  }
});

// Delete a recipe (protected route)
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    if (recipe.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this recipe" });
    }

    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: "Recipe deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting recipe: " + err.message });
  }
});

// Search recipes (public route)
router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const recipes = await Recipe.find({
      $or: [
        { name: { $regex: query, $options: "i" } }, // Modified to search by 'name' field instead of 'title'
        { ingredients: { $regex: query, $options: "i" } },
        { cuisineType: { $regex: query, $options: "i" } },
      ],
    }).populate("user", "username");

    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: "Error searching recipes: " + err.message });
  }
});

// Fetch available cuisines (public route)
router.get("/cuisines", async (req, res) => {
  try {
    const cuisines = await Recipe.distinct("cuisineType");
    res.json(cuisines);
  } catch (err) {
    res.status(500).json({ message: "Error fetching cuisines: " + err.message });
  }
});

export default router;
