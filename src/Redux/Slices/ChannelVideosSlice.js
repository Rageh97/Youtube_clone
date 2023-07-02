import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Key } from "../../Utils/ApiKey";
const initialState = {
  channelVidos: [],
  status: "idle",
  error: null,
};

// fetch videos of the channel

export const fetchVideosByChannel = createAsyncThunk(
  "channelvideos/fetchchannelvideos",
  async (id) => {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          type: "video",
          key: Key,
          channelId: id,
        },
      }
    );
    return response.data.items;
  }
);

const channeVideoslSlice = createSlice({
  name: "channelvideos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchVideosByChannel.fulfilled, (state, action) => {
      state.channelVidos = action.payload;
    });
  },
});
export default channeVideoslSlice.reducer;

export const getVideosOfChannel = (state) => state.channelvideos.channelVidos;
