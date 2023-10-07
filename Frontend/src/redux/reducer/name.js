import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "name",
  initialState: {
    name: null,
  },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
      // console.warn(action.payload);
    },
  },
});

export const { setName } = profileSlice.actions;
export default profileSlice.reducer;
