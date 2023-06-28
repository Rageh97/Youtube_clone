import React, { useEffect } from "react";
import VideoCard from "./VideoCard";
import { Badge, Col, Row } from "react-bootstrap";
import { selectVideosStatus, selectVideos } from "../Redux/Slices/VideoSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from "../Redux/Slices/VideoSlice";
import Loading from './../Utils/Loading';

const VideoList = () => {
  const videos = useSelector(selectVideos);
  const status = useSelector(selectVideosStatus);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchVideos());
  }, []);


  return (
    <>
      <Row style={{ marginTop: "70px" }}>
        <Col className=" p-3  mb-3 ">
          <Badge className="p-2 me-3" pill bg="dark">
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
          </Badge>
        </Col>
      </Row>
      <Row className="d-flex ">
        {videos.map((video) => (
          <>
            {status === "loading" ? (
              <Loading />
            ) : (
              <>
                {" "}
                <VideoCard key={video.id} video={video} />
              </>
            )}
          </>
        ))}
      </Row>
    </>
  );
};

export default VideoList;
