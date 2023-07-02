import React, { useEffect } from "react";
import VideoCard from "./VideoCard";
import { Badge, Card, Col, Row } from "react-bootstrap";
import { selectVideosStatus, selectVideos } from "../Redux/Slices/VideoSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from "../Redux/Slices/VideoSlice";
import Loading from "./../Utils/Loading";
import {
  fetchCategories,
  fetchVideoByCategory,
  getCategories,
  getCategoriesById,
} from "../Redux/Slices/Categories";
import { formatNumber } from "../Utils/FormatNumber";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";

const VideoList = () => {
  const videos = useSelector(selectVideos);
  const categories = useSelector(getCategories);
  const status = useSelector(selectVideosStatus);
  const categoryVideos = useSelector(getCategoriesById);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchVideos());
    dispatch(fetchCategories());
  }, []);

  const handleCategoryClick = (name) => {
    dispatch(fetchVideoByCategory(name));
  };
  return (
    <>
      <Row style={{ marginTop: "70px" }}>
        <Col className=" p-3  mb-3 ">
          {categories?.slice(0, 8).map((category, index) => (
            <Badge
              key={index}
              onClick={() => handleCategoryClick(category.snippet.title)}
              className="p-2 me-3"
              pill
              bg="danger"
            >
              {category?.snippet?.title}
            </Badge>
          ))}
        </Col>
      </Row>
      <Row className="d-flex ">
        {categoryVideos && categoryVideos.length > 0
          ? categoryVideos.map((video, index) => (
            <Col key={index} className="mb-4" xs={12} sm={6} md={6} lg={4} xl={4} xxl={3}>
            <Card className="w-100 h-100">
              <Link to={`/videos/${video?.id?.videoId}`}>
                <Card.Img
                  variant="top"
                  src={video?.snippet?.thumbnails?.default?.url}
                />
              </Link>
              <Card.Body className="d-flex w-100">
                <div style={{ width: "15%" }} className="me-2">
                  <Avatar
                    alt="Travis Howard"
                    src={video?.snippet?.channelThumbnails?.default.url}
                  />
                </div>
                <div style={{ width: "85%" }}>
                  <Card.Title className="fw-bold fs-5">
                    {video?.snippet?.title}
                  </Card.Title>
    
                  <div className="d-flex gap-2 align-items-center mb-2">
                    <Link to={`/channel/${video?.snippet?.channelId}`}>
                      <Card.Text className="fw-bold fs-6 mb-0">
                        {video?.snippet?.channelTitle}
                      </Card.Text>
                    </Link>
                  </div>
                  <Card.Text className="text-muted fs-6">
                    {video?.snippet?.publishTime}
                    <span className="mx-1">
                      {formatNumber(video?.statistics?.viewCount)} Views
                    </span>
                  </Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Col>
            ))
          : videos && (
              <>
                {videos.map((video, index) => (
                  <VideoCard key={index} video={video} />
                ))}
              </>
            )}
      </Row>
    </>
  );
};

export default VideoList;
