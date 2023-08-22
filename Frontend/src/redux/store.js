import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import fetching from "./reducer/fetching.js";
import mobileNumber from "./reducer/mobileNumber.js";
import auth from "./reducer/auth.js";
import sidebar from "./reducer/sidebar.js";
import role from "./reducer/role.js";

// Create the logger instance
const logger = createLogger();

// Configure the store
const store = configureStore({
  reducer: {
    mobileNumber: mobileNumber,
    fetching: fetching,
    auth: auth,
    sidebar: sidebar,
    role: role,
  },
  middleware: [logger],
});

export default store;
