import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Key } from "../../Utils/ApiKey";
const initialState = {
  channelsInfo: [],

  channel: null,

  status: "idle",
  error: null,
};

// fetch Channels
export const fetchChannels = createAsyncThunk(
  "channels/fetchchannels",
  async (category) => {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/channels",
      {
        params: {
          part: "snippet",
          forUsername: category,
          key: Key,
        },
      }
    );

    return response.data.items;
  }
);
// fetch channels by id
export const fetchChannelById = createAsyncThunk(
  "channel/fetchChannel",
  async (id) => {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/channels",
      {
        params: {
          part: "snippet,brandingSettings, statistics",
          key: Key,
          id: id,
        },
      }
    );

    return response.data.items[0];
  }
);
// fetch videos of the channel

const channelSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.fulfilled, (state, action) => {
        state.channelsInfo = action.payload;
      })

      .addCase(fetchChannelById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchChannelById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.channel = action.payload;
      })
      .addCase(fetchChannelById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export default channelSlice.reducer;
export const getChannel = (state) => state.channels.channel;
export const getChannels = (state) => state.channels.channelsInfo;
export const getCategories = (state) => state.channels.categories;
