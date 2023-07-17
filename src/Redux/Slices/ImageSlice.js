// imageSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  imageURL: null,
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    setImageURL: (state, action) => {
      state.imageURL = action.payload;
      localStorage.setItem("imageURL", action.payload);
    },
  },
});

export const { setImageURL } = imageSlice.actions;
export default imageSlice.reducer;
