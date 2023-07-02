import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Accordion, Button, Col, Container, Row } from "react-bootstrap";
import { Avatar, Chip, Stack } from "@mui/material";
import Comments from "../compenents/Comments";
import { IoMdShareAlt } from "react-icons/io";
import { BiSave } from "react-icons/bi";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { selectVideosStatus, singleVideo } from "../Redux/Slices/VideoSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideoById } from "../Redux/Slices/VideoSlice";
import Loading from "./../Utils/Loading";
import RelatedVideo from "../compenents/RelatedVideo";
import { addLikedVideo, removeLikedVideo } from "../Redux/Slices/LikedVideos";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formatNumber } from "./../Utils/FormatNumber";
import { getChannel } from "../Redux/Slices/ChannelSlice";
import { fetchChannelById } from "../Redux/Slices/ChannelSlice";
import {
  addWatchLaterVideo,
  removeWatchLaterVideo,
} from "../Redux/Slices/WatchLater";
import { addSubscribtions, removeSubscribtions } from "../Redux/Slices/Subscribtion";

const VideoPage = () => {
  const currentVideo = useSelector(singleVideo);
  const channel = useSelector(getChannel);
  const status = useSelector(selectVideosStatus);
  const { id } = useParams();
  const likedVideos = useSelector((state) => state.likedVideos);
  const watchLater = useSelector((state) => state.watchLater);
  const subscribes = useSelector((state) => state.subscribtions);
  const isSaved =
    currentVideo && watchLater.some((video) => video.id === currentVideo.id);
  const isLiked =
    currentVideo &&
    likedVideos.some((likedVideo) => likedVideo.id === currentVideo.id);
  const isSubscribe =
    currentVideo &&
    subscribes.some((subscribe) => subscribe.id === currentVideo.id);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchVideoById(id));
    dispatch(fetchChannelById(id));
  }, [dispatch, id]);
  const handleWatchLaterVideo = () => {
    dispatch(addWatchLaterVideo(currentVideo));
    toast.success("video is saved !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const handleRemoveWatchLaterVideo = () => {
    dispatch(removeWatchLaterVideo(currentVideo));
    toast.error("You removed the video !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const handleLikedVideo = () => {
    dispatch(addLikedVideo(currentVideo));
    toast.success("Success Notification !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const handleUnlike = () => {
    dispatch(removeLikedVideo(currentVideo.id));
    toast.error("Success Notification !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const addSubscribe = () => {
    dispatch(addSubscribtions(currentVideo));
    toast.success("You are subscribed !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
  const removeSubscribe = () => {
    dispatch(removeSubscribtions(currentVideo.id));
    toast.error("You are not subscribed !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
  const likeButtonClassName = isLiked
    ? "fs-3 chip-action text-light p-1 bg-dark"
    : "fs-3 chip-action";
  const saveButtonClassName = isSaved
    ? "fs-3 chip-action text-light p-1 bg-dark"
    : "fs-3 chip-action";
  return (
    <>
      <Container fluid style={{ marginTop: "90px" }}>
        <ToastContainer />
        <Row>
          {status === "loading" ? (
            <Loading />
          ) : (
            <>
              <Col xs={12} sm={12} md={12} lg={7} xl={7} xxl={7}>
                <iframe
                  className="w-100 rounded"
                  style={{ height: "480px" }}
                  src={`https://www.youtube.com/embed/${id}`}
                  title={currentVideo?.snippet?.title}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
                <h2 className="mt-2">{currentVideo?.snippet?.title}</h2>

                {/* here the part of channel name and buttons that related for each video */}
                <Row className="mb-4 mt-2">
                  <Col
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={5}
                    xxl={5}
                    className="d-flex align-items-center gap-4"
                  >
                    <div className="gap-2 d-flex align-items-center">
                      <Avatar
                        alt="Travis Howard"
                        src="https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      />
                      <div className="d-flex flex-column">
                        <p className="mb-0">
                          {currentVideo?.snippet?.channelTitle}
                        </p>
                        <span className="mb-0">
                          {" "}
                          {formatNumber(
                            channel?.statistics?.subscriberCount
                          )}{" "}
                        </span>
                      </div>
                    </div>
                    {/* <Button variant="dark">Subscribe</Button> */}
                    {isSubscribe ? (<>
                      <Button onClick={removeSubscribe} variant="danger">Subscribed</Button>
                    </>) : (<>
                      <Button onClick={addSubscribe} variant="dark">Subscribe</Button>
                    
                    </>)}
                  </Col>
                  <Col
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={5}
                    xxl={5}
                    className="d-flex align-items-center mt-3 mt-xs-0"
                  >
                    <Stack direction="row" spacing={1}>
                      <Chip
                        avatar={
                          <Avatar>
                            <IoMdShareAlt className="fs-3 chip-action" />
                          </Avatar>
                        }
                        label="share"
                      />
                      {isLiked ? (
                        <>
                          <Chip
                            avatar={
                              <Avatar>
                                <AiOutlineLike
                                  onClick={handleUnlike}
                                  className={likeButtonClassName}
                                />
                              </Avatar>
                            }
                            label={formatNumber(
                              currentVideo?.statistics?.likeCount
                            )}
                          />
                        </>
                      ) : (
                        <>
                          <Chip
                            avatar={
                              <Avatar>
                                <AiOutlineLike
                                  onClick={handleLikedVideo}
                                  className={likeButtonClassName}
                                />
                              </Avatar>
                            }
                            label={formatNumber(
                              currentVideo?.statistics?.likeCount
                            )}
                          />
                        </>
                      )}

                      <Chip
                        avatar={
                          <Avatar>
                            <AiOutlineDislike className="fs-3 chip-action" />
                          </Avatar>
                        }
                        label="dislike"
                      />
                     {isSaved ? (<>
                     
                      <Chip
                        avatar={
                          <Avatar>
                            <BiSave
                              onClick={handleRemoveWatchLaterVideo}
                              className={saveButtonClassName}
                            />
                          </Avatar>
                        }
                        label="Save"
                      />
                     </>) :(<>
                     
                      <Chip
                        avatar={
                          <Avatar>
                            <BiSave
                              onClick={handleWatchLaterVideo}
                              className={saveButtonClassName}
                            />
                          </Avatar>
                        }
                        label="Save"
                      />
                     </>)}
                    </Stack>
                  </Col>
                </Row>
                {/* here the part of description and views */}

                <Row className="mb-4 shadow-sm">
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        <div>
                          <p>
                            {" "}
                            {formatNumber(
                              currentVideo?.statistics?.viewCount
                            )}{" "}
                            Views{" "}
                            {new Date(
                              currentVideo?.snippet?.publishedAt
                            ).toLocaleDateString()}{" "}
                            {new Date(
                              currentVideo?.snippet?.publishedAt
                            ).toLocaleTimeString()}
                          </p>
                          <p>see description </p>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body>
                        {currentVideo?.snippet?.description}
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Row>

                {/* here the part of comments */}
                <Row>
                  <Comments />
                </Row>
              </Col>
            </>
          )}
          {/* here the part of related videos on the other side of the page */}

          <Col xs={12} sm={12} md={12} lg={5} xl={5} xxl={5}>
            <RelatedVideo />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default VideoPage;
