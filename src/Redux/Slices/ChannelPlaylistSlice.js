import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Key } from "../../Utils/ApiKey";
const initialState = {
  channelPlaylist: [],
  playlistItem: null,
  status: "idle",
  error: null,
};

// fetch playlists of the channel
export const fetchPlaylistsByChannel = createAsyncThunk(
  "channelvideos/fetchchannelvideos",
  async (id) => {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/playlists",
      {
        params: {
          part: "snippet",

          key: Key,
          channelId: id,
        },
      }
    );
    return response.data.items;
  }
);
// fetch playlistitem of the channel
export const fetchPlaylistItem = createAsyncThunk(
  "playlistitem/fetchplaylistitem",
  async (id) => {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/playlistItems",
      {
        params: {
          part: "snippet",

          key: Key,
          playlistId: id,
        },
      }
    );
    return response.data.items;
  }
);

const channePlaylistslSlice = createSlice({
  name: "channelplaylists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaylistsByChannel.fulfilled, (state, action) => {
        state.channelPlaylist = action.payload;
      })
      .addCase(fetchPlaylistItem.fulfilled, (state, action) => {
        state.playlistItem = action.payload;
      });
  },
});
export default channePlaylistslSlice.reducer;

export const getPlaylistsOfChannel = (state) =>
  state.channelplaylists.channelPlaylist;
export const getPlaylistItem = (state) => state.channelplaylists.playlistItem;
