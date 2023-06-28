import { Avatar } from "@mui/material";
import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const VideosILiked = () => {
  return (
    <Col className="mb-4" xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
      <Card className="w-100 h-100">
        <Link to={`/videos/${likedVideos?.id.videoId}`}>
          <Card.Img
            variant="top"
            src={likedVideos?.snippet?.thumbnails?.default?.url}
          />
        </Link>
        <Card.Body>
          <Card.Title className="fw-bold fs-5">
            {likedVideos?.snippet?.title}
          </Card.Title>
          <div className="d-flex gap-2 align-items-center mb-2">
            <Avatar
              alt="Travis Howard"
              src="https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
            <Card.Text className="fw-bold fs-6 mb-0">
              {likedVideos?.snippet?.channelTitle}
            </Card.Text>
          </div>
          <Card.Text className="text-muted fs-6">
            {likedVideos?.snippet?.publishTime}.
            <span className="mx-1">Thousand Views 28</span>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default VideosILiked;
