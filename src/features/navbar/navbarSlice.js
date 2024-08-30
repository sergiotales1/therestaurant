import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showLinks: false,
  showLoggedLinks: false,
  isLoggedIn: false,
};

export const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    setShowLinks: (state, action) => {
      if (action.payload.type === "both") {
        state.showLinks = false;
        state.showLoggedLinks = false;
      }
      if (action.payload.type === "close-logged-links") {
        state.showLoggedLinks = false;
      }
      if (action.payload.type === "show-logged-links") {
        state.showLoggedLinks = true;
      }
    },
    toggleShowLinks: (state) => {
      state.showLinks = !state.showLinks;
    },
    toggleIsLoggedIn: (state, action) => {
      if (action.payload.changeTo === true) {
        state.isLoggedIn = true;
        return;
      }
      state.isLoggedIn = false;
    },
  },
});

export const { setShowLinks, toggleShowLinks, toggleIsLoggedIn } =
  navbarSlice.actions;

export default navbarSlice.reducer;
