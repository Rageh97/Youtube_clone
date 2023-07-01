import { createSlice } from "@reduxjs/toolkit";

const watchLaterSlice = createSlice({
  name: "watchLater",
  initialState: JSON.parse(localStorage.getItem("watchLater")) || [],
  reducers: {
    addWatchLaterVideo: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("watchLater", JSON.stringify(state));
    },
    removeWatchLaterVideo: (state, action) => {
      const videoId = action.payload;
      const updatedVideos = state.filter((video) => video.id !== videoId);
      state.splice(0, state.length, ...updatedVideos);
      localStorage.setItem("watchLater", JSON.stringify(state));
    },
  },
});
export default watchLaterSlice.reducer;
export const { addWatchLaterVideo, removeWatchLaterVideo } =
  watchLaterSlice.actions;
