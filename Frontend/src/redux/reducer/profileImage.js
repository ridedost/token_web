import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profileImage: null,
  },
  reducers: {
    setProfileImage: (state, action) => {
      state.profileImage = action.payload;
      // console.warn(action.payload);
    },
  },
});

export const { setProfileImage } = profileSlice.actions;
export default profileSlice.reducer;
