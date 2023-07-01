import { createSlice } from "@reduxjs/toolkit";

const likedVideoSlice = createSlice({
  name: "likedVideos",
  initialState: JSON.parse(localStorage.getItem("likedVideos")) || [],
  reducers: {
    addLikedVideo: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("likedVideos", JSON.stringify(state));
    },
    removeLikedVideo: (state, action) => {
      const videoId = action.payload;
      const updatedVideos = state.filter((video) => video.id !== videoId);
      state.splice(0, state.length, ...updatedVideos);
      localStorage.setItem("likedVideos", JSON.stringify(state));
    },
  },
});
export default likedVideoSlice.reducer;
export const { addLikedVideo, removeLikedVideo } = likedVideoSlice.actions;
