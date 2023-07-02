import React from "react";
import ChannelPage from "../pages/ChannelPage";
import ChannelVideos from "../pages/ChannelVideos";
import ChannelPlaylist from "../pages/ChannelPlaylist";
import PlaylistItem from "../pages/PlaylistItem";
import { Route, Routes } from "react-router-dom";

const ChannelRoutes = () => {

  return (
    <Routes>
      <Route path="/" element={<ChannelPage />} />
      <Route path="/videos" element={<ChannelVideos/>} />
      <Route path="/playlists" element={<ChannelPlaylist />} />
      <Route path="/playlists/:id" element={<PlaylistItem />} />
    </Routes>
  );
};

export default ChannelRoutes;
