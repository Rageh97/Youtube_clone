import React, { useEffect } from "react";
import VideoCard from "./VideoCard";
import { Badge, Col, Row } from "react-bootstrap";
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
    dispatch(fetchVideoByCategory(name))
    
  }
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
          {/* <Badge className="p-2 me-3" pill bg="dark">
            videos
          </Badge>
          <Badge className="p-2 me-3" pill bg="primary">
            New
          </Badge>
          <Badge className="p-2 me-3" pill bg="danger">
            suggestion
          </Badge>
          <Badge className="p-2 me-3" pill bg="dark">
            Trending
          </Badge>
          <Badge className="p-2 me-3" pill bg="dark">
            Next
          </Badge>
          <Badge className="p-2 me-3" pill bg="dark">
            Primary
          </Badge> */}
        </Col>
      </Row>
      <Row className="d-flex ">
      {categoryVideos && categoryVideos.length > 0 ? (
          categoryVideos.map((video , index) => (
            <VideoCard key={index} video={video} />
          ))
        ) : (
          videos && (
            <>
              {videos.map((video, index) => (
                <VideoCard key={index} video={video} />
              ))}
            </>
          )
        )}
      </Row>
    </>
  );
};

export default VideoList;
