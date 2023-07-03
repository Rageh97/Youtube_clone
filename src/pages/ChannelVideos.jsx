import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  fetchVideosByChannel,
  getVideosOfChannel,
} from "./../Redux/Slices/ChannelVideosSlice";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Sidebar from "../compenents/Sidebar";
import { formatNumber } from "../Utils/FormatNumber";
import { fetchChannelById, getChannel } from "../Redux/Slices/ChannelSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Avatar } from "@mui/material";
import { addSubscribtions, removeSubscribtions } from "../Redux/Slices/Subscribtion";
const ChannelVideos = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const videos = useSelector(getVideosOfChannel);
  const channel = useSelector(getChannel);
  const subscribes = useSelector((state) => state.subscribtions);
  const isSubscribe =
  channel &&
    subscribes.some((subscribe) => subscribe?.snippet?.channelTitle  === channel?.snippet?.title);
  useEffect(() => {
    dispatch(fetchChannelById(id));
    dispatch(fetchVideosByChannel(id));
  }, [id, dispatch]);
  const addSubscribe = () => {
    dispatch(addSubscribtions(channel));
    toast.success("You are subscribed !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const removeSubscribe = () => {
    dispatch(removeSubscribtions(channel.id));
    toast.error("You are not subscribed !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  return (
    <>
      <Container fluid style={{ marginTop: "100px" }}>
        <ToastContainer/>
        <Row>
          <Col className="d-none d-lg-block" md={2} lg={2} xl={2} xxl={2}>
            <Sidebar />
          </Col>
          <Col xs={12} md={12} lg={10} xl={10} xxl={10}>
            {/* Banner of the channel */}
            <div className="mb-3" style={{ width: "100%", height: "400px" }}>
              <img
                style={{ objectFit: "cover" }}
                className="w-100 h-100 "
                src={channel?.brandingSettings?.image?.bannerExternalUrl}
                alt=""
              />
            </div>
            {/* Pic profile of the channel and content */}
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <img
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                  }}
                  src={channel?.brandingSettings?.image?.bannerExternalUrl}
                  alt="Channel Profile Picture"
                />

                <div className="mx-2 d-block d-xs-flex align-items-center justify-content-between">
                  <h4 className="fw-bold">{channel?.snippet?.title}</h4>
                  <span>
                    {formatNumber(channel?.statistics?.subscriberCount)}{" "}
                    subscribers {channel?.statistics?.videoCount} video
                  </span>

                  {/* <Button className="mx-0 mx-sm-5 " variant="dark">
                    Subscribe
                  </Button> */}
                  {isSubscribe ? (
                      <>
                        <Button className="mx-0 mx-sm-5" onClick={removeSubscribe} variant="danger">
                          Subscribed
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button className="mx-0 mx-sm-5" onClick={addSubscribe} variant="dark">
                          Subscribe
                        </Button>
                      </>
                    )}
                </div>

                {/* <div>
                <Button className="me-5" variant="dark">
                  Subscribe
                </Button>
              </div> */}
              </div>
            </div>

            {/* Links of profile videos and playlists */}
            <div className="mt-3 d-flex justify-content-center w-50 gap-5">
              <Link to={`/channel/${id}/videos`}>Videos</Link>
              <Link to={`/channel/${id}/playlists`}>Playlists</Link>
            </div>
            <hr />

            <Row className="d-flex">
              {videos?.map((video, index) => (
                  <Col key={index} className="mb-4" xs={12} sm={6} md={6} lg={4} xl={4} xxl={3}>
                  <Card className="w-100 h-100">
                    <Link to={`/videos/${video?.id.videoId}`}>
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
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ChannelVideos;
