import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  searchvideos: [],

  status: "idle",
  error: null,
};
// fetch categories
export const fetchSearchVideos = createAsyncThunk(
  "searchvideos/fetchsearchvideos",
  async (name) => {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",

          q: name,
          maxResults: 10,
          type: "video",
          key: "AIzaSyBOGCoJqODnVaNUpBTYulxBq-jJcBWuYz4",
        },
      }
    );

    return response.data.items;
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchSearchVideos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSearchVideos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.searchvideos = action.payload;
      })
      .addCase(fetchSearchVideos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default searchSlice.reducer;

export const getsearchvideos = (state) => state.search.searchvideos;

