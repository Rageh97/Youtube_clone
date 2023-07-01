// uploadSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uploading: false,
  progress: 0,
  error: null,
};

const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    uploadVideoStart: (state) => {
      state.uploading = true;
      state.progress = 0;
      state.error = null;
    },
    uploadVideoProgress: (state, action) => {
      state.progress = action.payload;
    },
    uploadVideoSuccess: (state) => {
      state.uploading = false;
      state.progress = 100;
      state.error = null;
    },
    uploadVideoFailure: (state, action) => {
      state.uploading = false;
      state.progress = 0;
      state.error = action.payload;
    },
  },
});

export const {
  uploadVideoStart,
  uploadVideoProgress,
  uploadVideoSuccess,
  uploadVideoFailure,
} = uploadSlice.actions;

export default uploadSlice.reducer;
