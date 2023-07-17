import { Avatar } from "@mui/material";
import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import { formatNumber } from "./../Utils/FormatNumber";
const VideoCard = ({ video }) => {
  return (
    <>
      <Col className="mb-4" xs={12} sm={6} md={6} lg={4} xl={4} xxl={3}>
        <Card className="w-100 h-100 carddark shadowDark">
          <Link to={`/videos/${video?.id}`}>
            <Card.Img
              variant="top"
              src={video?.snippet?.thumbnails?.default?.url}
            />
          </Link>
          <Card.Body className="d-flex w-100 card-body">
            <div style={{ width: "15%" }} className="me-2">
              <Avatar
                alt="Travis Howard"
                src={video?.snippet?.thumbnails?.default?.url}
              />
            </div>
            <div style={{ width: "85%" }}>
              <Card.Title className="card-title  text">
                {video?.snippet?.title}
              </Card.Title>

              <div className="d-flex gap-2 align-items-center mb-2">
                <Link className="LINK text" to={`/channel/${video?.snippet?.channelId}`}>
                  <Card.Text className="fs-6 mb-0 channeltitle">
                    {video?.snippet?.channelTitle}
                  </Card.Text>
                </Link>
              </div>
              <Card.Text className="text-muted fs-6">
                {video?.snippet?.publishTime}
                <span className="mx-1 channeltitle">
                  {formatNumber(video?.statistics?.viewCount)} Views
                </span>
              </Card.Text>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default VideoCard;
