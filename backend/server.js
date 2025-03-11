import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import recipeRoutes from "./routes/recipes.js"; // Adjust the path as necessary
import userRoutes from "./routes/users.js"; // Adjust the path as necessary

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection setup
const dbUri = process.env.MONGODB_URI;

if (!dbUri) {
  console.error("MongoDB URI is not defined in the environment variables!");
  process.exit(1);
}

mongoose
  .connect(dbUri)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use(cors());
app.use(express.json());

// Register the routes
app.use("/api/recipes", recipeRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
