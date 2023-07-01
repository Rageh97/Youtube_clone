import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  categories: [],
  categoryVideos: [],

  status: "idle",
  error: null,
};
// fetch categories
export const fetchCategories = createAsyncThunk(
  "categories/fetchcategories",
  async () => {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/videoCategories",
      {
        params: {
          part: "snippet",
          regionCode: "US",

          key: "AIzaSyBc91am_Bx5R9ngk4nGqFm2xqCZkvvif2A",
        },
      }
    );

    return response.data.items;
  }
);
//   fetch categories by id
export const fetchVideoByCategory = createAsyncThunk(
  "categoryvideos/fetchcategoryvideos",
  async (name) => {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          q: name,
          type:"video",
          maxResults: 10,
          key: "AIzaSyBc91am_Bx5R9ngk4nGqFm2xqCZkvvif2A",
        },
      }
    );

    return response.data.items;
  }
);

const categorySlise = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchVideoByCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVideoByCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categoryVideos = action.payload;
      })
      .addCase(fetchVideoByCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default categorySlise.reducer;

export const getCategories = (state) => state.categories.categories;
export const getCategoriesById = (state) => state.categories.categoryVideos;
