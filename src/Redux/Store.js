import { configureStore } from "@reduxjs/toolkit";
import videosReducer from "./Slices/VideoSlice";
import relatedVideosReducer from "./Slices/RelatedVideos";
import ChannelReducer from "./Slices/ChannelSlice";
import likedVideoReducer from "./Slices/LikedVideos";
import watchLaterReducer from "./Slices/WatchLater";
const store = configureStore({
  reducer: {
    videos: videosReducer,
    relatedVideos: relatedVideosReducer,
    channels: ChannelReducer,
    likedVideos: likedVideoReducer,
    watchLater: watchLaterReducer,
  },
});

export default store;
