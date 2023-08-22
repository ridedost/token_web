import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const fetchingSlice = createSlice({
  name: "fetching",
  initialState,
  reducers: {
    setFetching: (state, action) => {
      return action.payload;
    },
  },
});

export const { setFetching } = fetchingSlice.actions;

export default fetchingSlice.reducer;
