import React, { createContext, useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../redux/actions/userActions"; // Redux actions

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData); // Getting user data from Redux store
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn); // Checking login status

  const loginHandler = (userData) => {
    // Storing user data in Redux and localStorage
    dispatch(login(userData));
    localStorage.setItem("token", userData.token); // Save token to localStorage
  };

  const logoutHandler = () => {
    dispatch(logout()); // Dispatch logout action
    localStorage.removeItem("token"); // Remove token from localStorage
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login: loginHandler, logout: logoutHandler }}>
      {children}
    </AuthContext.Provider>
  );
};
