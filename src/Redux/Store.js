import { configureStore } from "@reduxjs/toolkit";
import videosReducer from "./Slices/VideoSlice";
import relatedVideosReducer from "./Slices/RelatedVideos";
import ChannelReducer from "./Slices/ChannelSlice";
import likedVideoReducer from "./Slices/LikedVideos";
import watchLaterReducer from "./Slices/WatchLater";
import uploadReducer from "./Slices/Upload";
import CategoriesReducer from "./Slices/Categories";
import SearchReduser from "./Slices/SearchSlice";
const store = configureStore({
  reducer: {
    videos: videosReducer,
    relatedVideos: relatedVideosReducer,
    channels: ChannelReducer,
    likedVideos: likedVideoReducer,
    watchLater: watchLaterReducer,
    categories: CategoriesReducer,
    search: SearchReduser,
    upload: uploadReducer,
  },
});

export default store;
