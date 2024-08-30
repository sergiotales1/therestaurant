import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  content1InView: false,
  content2InView: false,
};

export const sobreSlice = createSlice({
  name: "sobre",
  initialState,
  reducers: {
    setIsInView: (state, action) => {
      if (action.payload.content === 1) {
        state.content1InView = true;
        return;
      }
      state.content2InView = true;
    },
  },
});

export const { setIsInView } = sobreSlice.actions;

export default sobreSlice.reducer;
