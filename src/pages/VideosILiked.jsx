import React from "react";
import { useSelector } from "react-redux";
import VideoCard from "./../compenents/VideoCard";
import { Container, Row } from "react-bootstrap";

const VideosILiked = () => {
  const videos = useSelector((state) => state.likedVideos);

  return (
    <Container className="mt-5">
      <Row>
        {videos?.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </Row>
    </Container>
  );
};

export default VideosILiked;
