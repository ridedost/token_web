import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: false,
  user: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser(state) {
      state.user = true;
      state.admin = false;
    },
    loginAdmin(state) {
      state.user = false;
      state.admin = true;
    },
  },
});

export const { loginUser, loginAdmin } = authSlice.actions;
export default authSlice.reducer;
