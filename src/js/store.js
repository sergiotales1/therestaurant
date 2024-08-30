import { configureStore } from "@reduxjs/toolkit";
import sobreReducer from "../features/sobre/sobreSlice";
import firstSectionReducer from "../features/firstSection/firstSectionSlice";
import secondSectionReducer from "../features/secondSection/secondSectionSlice";
import navbarReducer from "../features/navbar/navbarSlice";

export const store = configureStore({
  reducer: {
    sobre: sobreReducer,
    firstSection: firstSectionReducer,
    secondSection: secondSectionReducer,
    navbar: navbarReducer,
  },
});
