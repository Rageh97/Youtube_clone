import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Key } from "../../Utils/ApiKey";
import axios from "axios";

const initialState = {
  comments: [],
};

export const fetchComments = createAsyncThunk(
  "comments/fetchcomments",
  async (id) => {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/commentThreads",
      {
        params: {
          part: "snippet",
          key: Key,
          videoId: id,
        },
      }
    );
    return response.data.items;
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments = action.payload;
    });
  },
});
export default commentSlice.reducer;
export const getComments = (state) => state.comment.comments;
