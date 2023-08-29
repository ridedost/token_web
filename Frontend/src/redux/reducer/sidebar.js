
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: true, // Sidebar is initially open
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      return {
        ...state,
        isOpen: !state.isOpen, // Toggle the sidebar visibility
      };
    },
  },
});

export const { toggleSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
