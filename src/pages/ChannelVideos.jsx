import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchVideosByChannel,
  getVideosOfChannel,
} from "../Redux/Slices/ChannelSlice";

import VideoCard from "./../compenents/VideoCard";
const ChannelVideos = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const videos = useSelector(getVideosOfChannel);
  useEffect(() => {
    dispatch(fetchVideosByChannel(id));
  }, [id, dispatch]);
  return (
    <>
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </>
  );
};

export default ChannelVideos;
