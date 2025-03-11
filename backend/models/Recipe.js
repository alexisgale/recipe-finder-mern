import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  cuisineType: {
    type: String,
    required: true, // Example: "Italian", "Mexican", etc.
  },
  prepTime: {
    type: Number, // Time in minutes
    required: true,
  },
  image: {
    type: String, // URL for the recipe image (if applicable)
  },
  category: {
    type: String, // Example: "Dessert", "Main Course", "Appetizer"
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming you have a User model and this is for user tracking
  },
  createdAt: {
    type: Date,
    default: Date.now, // Track when the recipe was created
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
