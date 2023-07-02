import { createSlice } from "@reduxjs/toolkit";

const SubscribtionsSlice = createSlice({
  name: "subscribtions",
  initialState: JSON.parse(localStorage.getItem("subscribtions")) || [],
  reducers: {
    addSubscribtions: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("subscribtions", JSON.stringify(state));
    },
    removeSubscribtions: (state, action) => {
      const videoId = action.payload;
      const updatedVideos = state.filter((video) => video.id !== videoId);
      state.splice(0, state.length, ...updatedVideos);
      localStorage.setItem("subscribtions", JSON.stringify(state));
    },
  },
});
export default SubscribtionsSlice.reducer;
export const { addSubscribtions, removeSubscribtions } =
  SubscribtionsSlice.actions;
