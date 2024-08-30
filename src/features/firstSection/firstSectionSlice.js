import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  imgInView: false,
  iconsContainerInView: false,
  plates: 0,
  years: 0,
};

export const firstSectionSlice = createSlice({
  name: "firstSection",
  initialState,
  reducers: {
    setIsInView: (state) => {
      state.imgInView = true;
    },
    setIconsContainerInView: (state) => {
      state.iconsContainerInView = true;
    },
    increasePlates: (state) => {
      state.plates++;
    },
    increaseYears: (state) => {
      if (state.years === 1950) {
        let years = state.years + 29;
        return { ...state, years };
      }
      state.years += 30;
    },
  },
});

export const {
  setIsInView,
  setIconsContainerInView,
  increaseYears,
  increasePlates,
} = firstSectionSlice.actions;

export default firstSectionSlice.reducer;
