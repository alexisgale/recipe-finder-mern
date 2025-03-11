import { createStore, combineReducers } from "redux";
import userReducer from "./reducers/userReducer";

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
});

// Create store with Redux DevTools extension support
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // Enable Redux DevTools
);

export default store; // Ensure it's a default export
