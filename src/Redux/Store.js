import { configureStore } from "@reduxjs/toolkit";
import videosReducer from "./Slices/VideoSlice";
import relatedVideosReducer from "./Slices/RelatedVideos";
const store = configureStore({
  reducer: {
    videos: videosReducer,
    relatedVideos: relatedVideosReducer,
  },
});

export default store;
