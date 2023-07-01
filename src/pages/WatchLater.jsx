import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import VideoCard from "../compenents/VideoCard";
import Sidebar from "./../compenents/Sidebar";

const WatchLater = () => {
  const videos = useSelector((state) => state.watchLater);
  return (
    <>
      <Container style={{ marginTop: "100px" }}>
        <Row>
          {videos?.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </Row>
      </Container>
    </>
  );
};

export default WatchLater;
