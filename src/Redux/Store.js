import { configureStore } from "@reduxjs/toolkit";

import videosReducer from "./Slices/VideoSlice";
import relatedVideosReducer from "./Slices/RelatedVideos";
import ChannelReducer from "./Slices/ChannelSlice";
import likedVideoReducer from "./Slices/LikedVideos";
import watchLaterReducer from "./Slices/WatchLater";
import uploadReducer from "./Slices/Upload";
import CategoriesReducer from "./Slices/Categories";
import SearchReduser from "./Slices/SearchSlice";
import ChannelVideosReducer from "./Slices/ChannelVideosSlice";
import ChannelPlaylistReducer from "./Slices/ChannelPlaylistSlice";
import SubscribtionVideosReducer from "./Slices/SubscribtionVideos";
import commentReducer from "./Slices/CommentSlice";
import darkModeReducer from "./Slices/DarkMode";
import userVideoReducer from "./Slices/UserVideos";
import ImageSlice from "./Slices/ImageSlice";
import dislikeVideoReducer from "./Slices/DislikeVideo";
const store = configureStore({
  reducer: {
    videos: videosReducer,
    relatedVideos: relatedVideosReducer,
    channels: ChannelReducer,
    likedVideos: likedVideoReducer,
    watchLater: watchLaterReducer,
    categories: CategoriesReducer,
    search: SearchReduser,
    channelvideos: ChannelVideosReducer,
    channelplaylists: ChannelPlaylistReducer,
    upload: uploadReducer,
    subscribtionVideos: SubscribtionVideosReducer,
    comment: commentReducer,
    darkMode: darkModeReducer,
    uservideos: userVideoReducer,
    image: ImageSlice,
    dislike: dislikeVideoReducer,
  },
});

export default store;
