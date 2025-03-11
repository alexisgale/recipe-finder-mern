import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store"; // Default import of store
import { AuthProvider } from "./contexts/AuthContext"; // Import AuthProvider

import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import SavedRecipesPage from "./components/SavedRecipesPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        {" "}
        {/* Wrap your app with AuthProvider */}
        <Router>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/saved-recipes" element={<SavedRecipesPage />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </Provider>
  );
}

export default App;
