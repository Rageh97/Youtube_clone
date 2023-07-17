import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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
// import RelatedVideo from "../compenents/RelatedVideo";
import { addLikedVideo, removeLikedVideo } from "../Redux/Slices/LikedVideos";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formatNumber } from "./../Utils/FormatNumber";
import { fetchChannelById } from "../Redux/Slices/ChannelSlice";
import {
  addWatchLaterVideo,
  removeWatchLaterVideo,
} from "../Redux/Slices/WatchLater";
import {
  addSubscriptions,
  removeSubscriptions,
} from "../Redux/Slices/SubscribtionVideos";
import { fetchComments, getComments } from "../Redux/Slices/CommentSlice";
import { addDisLikedVideo, removeDisLikedVideo } from "../Redux/Slices/DislikeVideo";

const VideoPage = () => {
  const currentVideo = useSelector(singleVideo);
  const status = useSelector(selectVideosStatus);
  const { id } = useParams();
  const likedVideos = useSelector((state) => state.likedVideos);
  const dislikedVideos = useSelector((state) => state.dislike);
  const watchLater = useSelector((state) => state.watchLater);
  const comments = useSelector(getComments);
  const isSaved =
    currentVideo && watchLater.some((video) => video.id === currentVideo.id);
  const isLiked =
    currentVideo &&
    likedVideos.some((likedVideo) => likedVideo.id === currentVideo.id);
  const isDisLiked =
    currentVideo &&
    dislikedVideos.some(
      (dislikedVideo) => dislikedVideo.id === currentVideo.id
    );
  const subscribes = useSelector((state) => state.subscribtionVideos);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchChannelById(id));
    dispatch(fetchVideoById(id));
    dispatch(fetchComments(id));
  }, [dispatch, id]);
  const handleWatchLaterVideo = () => {
    dispatch(addWatchLaterVideo(currentVideo));
    toast.success("video is saved !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const handleRemoveWatchLaterVideo = () => {
    dispatch(removeWatchLaterVideo(currentVideo.id));
    toast.error("The video has been removed !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const handleDisLikedVideo = () => {
    dispatch(addDisLikedVideo(currentVideo));
    toast.success("you are Disliked this video !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const handleLikedVideo = () => {
    dispatch(addLikedVideo(currentVideo));
    toast.success("you are liked this video !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const handleUnDislike = () => {
    dispatch(removeDisLikedVideo(currentVideo.id));
    toast.error("The Dislike video has been removed  !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const handleUnlike = () => {
    dispatch(removeLikedVideo(currentVideo.id));
    toast.error("The like has been removed  !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const addSubscribe = () => {
    dispatch(addSubscriptions(currentVideo));
    toast.success("You are subscribed !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const isSubscribe =
    currentVideo &&
    subscribes.find(
      (subscribe) =>
        subscribe?.snippet?.channelTitle ===
          currentVideo?.snippet?.channelTitle ||
        subscribe?.snippet?.title === currentVideo?.snippet?.channelTitle
    ) !== undefined;

  const removeSubscribe = () => {
    const subscribedVideo = subscribes.find(
      (subscribe) =>
        subscribe?.snippet?.channelTitle ===
          currentVideo?.snippet?.channelTitle ||
        subscribe?.snippet?.title === currentVideo?.snippet?.channelTitle
    );

    if (subscribedVideo) {
      dispatch(removeSubscriptions(subscribedVideo?.id));
      toast.error("You are not subscribed!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  const likeButtonClassName = isLiked
    ? "fs-3 chip-action text-warning p-1 bg-dark button "
    : "fs-3 chip-action button Button";
  const dislikeButtonClassName = isDisLiked
    ? "fs-3 chip-action text-warning p-1 bg-dark button "
    : "fs-3 chip-action button Button";
  const saveButtonClassName = isSaved
    ? "fs-3 chip-action text-warning p-1 bg-dark button "
    : "fs-3 chip-action button Button";
  return (
    <>
      <Container fluid style={{ marginTop: "90px" }}>
        <ToastContainer />
        {status === "loading" && <Loading/>}
        <Row>
          {status === "loading" ? (
            <Loading />
          ) : (
            <>
              <Col xs={12} sm={12} md={12} lg={7} xl={7} xxl={7}>
                <iframe
                  className="w-100 rounded"
                  style={{ height: "480px" }}
                  src={`https://www.youtube.com/embed/${id} `}
                  title={currentVideo?.snippet?.title}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
                <h2 className="mt-2 card-title text">
                  {currentVideo?.snippet?.title}
                </h2>

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
                        src={currentVideo?.snippet?.thumbnails?.default?.url}
                      />
                      <div className="d-flex flex-column">
                        <Link
                          to={`/channel/${currentVideo?.snippet?.channelId}`}
                          className="text-dark text LINK"
                        >
                          <h6 className="mb-0 fw-bold  LINK text">
                            {currentVideo?.snippet?.channelTitle}
                          </h6>
                        </Link>
                        <span className="mb-0 text">
                          {" "}
                          {formatNumber(
                            currentVideo?.statistics?.viewCount
                          )}{" "}
                        </span>
                      </div>
                    </div>
                    {/* <Button variant="dark">Subscribe</Button> */}
                    {isSubscribe ? (
                      <>
                        <Button variant="warning" onClick={removeSubscribe}>
                          Subscribed
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          className="Button"
                          onClick={addSubscribe}
                          variant="dark"
                        >
                          Subscribe
                        </Button>
                      </>
                    )}
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
                        className="Button text textdark "
                        avatar={
                          <Avatar>
                            <IoMdShareAlt className="fs-3 Button " />
                          </Avatar>
                        }
                        label="share"
                      />
                      {isLiked ? (
                        <>
                          <Chip
                            className="Button text textdark"
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
                            className="Button text textdark"
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

                
                       {isDisLiked ? (
                        <>
                          <Chip
                            className="Button text textdark"
                            avatar={
                              <Avatar>
                                <AiOutlineDislike
                                  onClick={handleUnDislike}
                                  className={dislikeButtonClassName}
                                />
                              </Avatar>
                            }
                            label="undislike"
                          />
                        </>
                      ) : (
                        <>
                          <Chip
                            className="Button text textdark"
                            avatar={
                              <Avatar>
                                <AiOutlineDislike
                                  onClick={handleDisLikedVideo}
                                  className={dislikeButtonClassName}
                                />
                              </Avatar>
                            }
                            label="dislike"
                          />
                        </>
                      )}

                      {isSaved ? (
                        <>
                          <Chip
                            className="Button text textdark"
                            avatar={
                              <Avatar>
                                <BiSave
                                  onClick={handleRemoveWatchLaterVideo}
                                  className={saveButtonClassName}
                                />
                              </Avatar>
                            }
                            label="unsave"
                          />
                        </>
                      ) : (
                        <>
                          <Chip
                            className="Button text textdark"
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
                        </>
                      )}
                    </Stack>
                  </Col>
                </Row>
                {/* here the part of description and views */}

                <Row className="mb-4 shadow-sm ">
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        <div>
                          <p className="card-title">
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
                          <p className="card-title">see description </p>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body className="card-title">
                        {currentVideo?.snippet?.description}
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Row>

                {/* here the part of comments */}
                <Row>
                  <Col className="mb-3">
                    <Accordion defaultActiveKey="0">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>
                          <h6 className="card-title">see comments</h6>
                        </Accordion.Header>
                        <Accordion.Body className="card-title">
                          {comments.map((comment, index) => {
                            return (
                              <>
                                <Comments key={index} comment={comment} />
                              </>
                            );
                          })}
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </Col>
                </Row>
              </Col>
            </>
          )}
          {/* here the part of related videos on the other side of the page */}

          {/* <Col xs={12} sm={12} md={12} lg={5} xl={5} xxl={5}>
            <RelatedVideo />
          </Col> */}
        </Row>
      </Container>
    </>
  );
};

export default VideoPage;
