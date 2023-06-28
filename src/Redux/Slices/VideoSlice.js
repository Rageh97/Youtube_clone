import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  videos: [],
  currentVideo: null,
  status: "idle",
  error: null,
};

// const API_KEY = "b7d2ae626amshc2966c521430c77p110255jsn4e2578d3e4a1";

// export const fetchVideos = createAsyncThunk("videos/fetchVideos", async () => {
//   const response = await axios.get("https://youtube-v31.p.rapidapi.com/videos", {
//     headers: {
//       "x-rapidapi-host": "youtube-v31.p.rapidapi.com",
//       "x-rapidapi-key": API_KEY,
//     },
//     params: {
//       part: "snippet",
//       chart: "mostPopular",
//       type: "video",
//       maxResults: 10
//     },
//   });
//   return response.data.items.map((item) => ({
//     id: item.id.videoId,
//     title: item.snippet.title,
//     description: item.snippet.description,
//     thumbnailUrl: item.snippet.thumbnails.medium.url,
//   }));
// });

// export const fetchVideoById = createAsyncThunk(
//   "videos/fetchVideoById",
//   async (videoId) => {
//     const response = await axios.get(`https://youtube-v31.p.rapidapi.com/videos`, {
//       method: "GET",
//       headers: {
//         "X-RapidAPI-Key": API_KEY,
//         "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
//       },
//       params: {
//         part: "snippet",
//         id: videoId,
//       },
//     });
//     const item = response.data.items[0];
//     console.log(item);
//     return {
//       id: item.id,
//       title: item.snippet.title,
//       description: item.snippet.description,
//       thumbnailUrl: item.snippet.thumbnails.medium.url,
//     };
//   }
// );
export const fetchVideos = createAsyncThunk("videos/fetchVideos", async () => {
  const response = await axios.get(
    "https://www.googleapis.com/youtube/v3/videos",
    {
      params: {
        part: "snippet",
        chart: "mostPopular",
        maxResults: 10,
        key: "AIzaSyDjsSFMAXVvdT2TNej-XQAHOB6IzlwM3PQ",
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
          part: "snippet",
          id: id,
          key: "AIzaSyDjsSFMAXVvdT2TNej-XQAHOB6IzlwM3PQ",
        },
      }
    );
    console.log(response.data.items[0]);
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
export const selectVideosStatus = (state) => state.videos.status;
export const selectVideosError = (state) => state.videos.error;
export const singleVideo = (state) => state.videos.currentVideo;
