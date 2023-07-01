import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRelatedVideos = createAsyncThunk(
  "videos/relatedVideos",
  async (id) => {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          key: "AIzaSyBc91am_Bx5R9ngk4nGqFm2xqCZkvvif2A",
          relatedToVideoId: id,
          type: "video",
          maxResults: 10,
        },
      }
    );
    return response.data.items;
  }
);
const initialState = {
  relatedVideo: [],
  status: "idle",
  console: null,
};

const relatedVideosSlice = createSlice({
  name: "relatedVideos",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchRelatedVideos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRelatedVideos.fulfilled, (state, action) => {
        state.status = "succeded";
        state.relatedVideo = action.payload;
      })
      // .addCase(fetchRelatedVideos.rejected, (state,action) => {
      //   state.error = action.error.message;
      //   state.status = "failed";
      // });
  },
});
export default relatedVideosSlice.reducer;
export const relatedVideos = (state) => state.relatedVideos.relatedVideo;
export const relatedVideoStatus = (state) => state.relatedVideos.status;
export const relatedVideoError = (state) => state.relatedVideos.error;
