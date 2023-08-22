import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  number: "",
};

const mobileNumberSlice = createSlice({
  name: "mobileNumber",
  initialState,
  reducers: {
    setMobileNumber: (state, action) => {
      state.number = action.payload;
    },
  },
});

export const { setMobileNumber } = mobileNumberSlice.actions;

export default mobileNumberSlice.reducer;
