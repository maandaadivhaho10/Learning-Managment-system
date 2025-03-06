import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // Adjust the path if needed

// ✅ Create the store and export it
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store; // ✅ Ensure you export store as default
