import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  videos: [],

  currentVideo: null,
  status: "idle",
  error: null,
};

export const fetchVideos = createAsyncThunk("videos/fetchVideos", async () => {
  const response = await axios.get(
    "https://www.googleapis.com/youtube/v3/videos",
    {
      params: {
        part: "snippet, statistics",
        chart: "mostPopular",
        maxResults: 10,
        key: "AIzaSyBOGCoJqODnVaNUpBTYulxBq-jJcBWuYz4",
      },
    }
  );
  return response.data.items;
});

export const fetchVideoById = createAsyncThunk(
  "video/fetchvideoid",
  async (id) => {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/videos",
      {
        params: {
          part: "snippet,statistics",
          id: id,
          key: "AIzaSyBOGCoJqODnVaNUpBTYulxBq-jJcBWuYz4",
        },
      }
    );

    return response.data.items[0];
  }
);

const videosSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.videos = action.payload;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchVideoById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVideoById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentVideo = action.payload;
      })
      .addCase(fetchVideoById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default videosSlice.reducer;
export const selectVideos = (state) => state.videos.videos;
export const selectVideosCategory = (state) => state.videos.categoryVideos;
export const selectVideosStatus = (state) => state.videos.status;
export const selectVideosError = (state) => state.videos.error;
export const singleVideo = (state) => state.videos.currentVideo;
