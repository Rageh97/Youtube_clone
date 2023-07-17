import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  error: null,
  videoData: null, // New state property to store the uploaded video data
};

// Async thunk to handle video upload
export const uploadVideo = createAsyncThunk(
  "video/upload",
  async (formData, { rejectWithValue }) => {
    try {
      const authToken = localStorage.getItem("accessToken"); // Get the access token from localStorage

      if (!authToken) {
        throw new Error("Access token not found");
      }

      let parsedToken;
      try {
        parsedToken = JSON.parse(authToken);
      } catch (error) {
        throw new Error("Invalid access token format");
      }

      const response = await axios.post(
        "https://youtube.softscope.net/api/auth/store-video",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${parsedToken}`, // Include the access token in the Authorization header
          },
        }
      );

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

// Video slice
const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadVideo.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(uploadVideo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.videoData = action.payload; // Store the uploaded video data in the state
      })
      .addCase(uploadVideo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default uploadSlice.reducer;
