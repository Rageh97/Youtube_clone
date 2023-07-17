import React, { useEffect } from "react";
import { Button, Col, Container, NavLink, Row } from "react-bootstrap";
import Sidebar from "../compenents/Sidebar";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getChannel, fetchChannelById } from "../Redux/Slices/ChannelSlice";
import { formatNumber } from "../Utils/FormatNumber";
import "../App.css";
import {
  addSubscriptions,
  removeSubscriptions,
} from "../Redux/Slices/SubscribtionVideos";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChannelPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const channel = useSelector(getChannel);
  const subscribes = useSelector((state) => state.subscribtionVideos);


  useEffect(() => {
    dispatch(fetchChannelById(id));
  }, [id, dispatch]);
  const addSubscribe = () => {
    dispatch(addSubscriptions(channel));
    toast.success("You are subscribed !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };


  const isSubscribe =
    channel &&
    subscribes.find(
      (subscribe) =>
        subscribe?.id === channel?.id ||
        subscribe?.snippet?.channelId === channel?.id
    ) !== undefined;

  const removeSubscribe = () => {
    const subscribedChannel = subscribes.find(
      (subscribe) =>
        subscribe?.id === channel?.id ||
        subscribe?.snippet?.channelId === channel?.id
    );

    if (subscribedChannel) {
      dispatch(removeSubscriptions(subscribedChannel?.id));

      toast.error("You are not subscribed!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <>
      <Container fluid style={{ marginTop: "100px" }}>
        <ToastContainer />
        <Row>
          <Col className="d-none d-lg-block" md={2} lg={2} xl={2} xxl={2}>
            <Sidebar />
          </Col>
          <Col xs={12} md={12} lg={10} xl={10} xxl={10}>
            {/* Banner of the channel */}
            <div className="mb-3" style={{ width: "100%", height: "300px" }}>
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
                  <h4 className="fw-bold text">{channel?.snippet?.title}</h4>
                  <span>
                    {formatNumber(channel?.statistics?.subscriberCount)}{" "}
                    subscribers {channel?.statistics?.videoCount} video
                  </span>

                  {isSubscribe ? (
                    <Button
                      className="mx-0 mx-sm-5"
                      onClick={removeSubscribe}
                      variant="warning"
                    >
                      Subscribed
                    </Button>
                  ) : (
                    <Button
                      className="mx-0 mx-sm-5 Button"
                      onClick={addSubscribe}
                      variant="dark"
                    >
                      Subscribe
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Links of profile videos and playlists */}
            <div className="mt-3 d-flex justify-content-center w-50 gap-5">
              <Link className="text LINK" to={`/channel/${id}/videos`}>
                Videos
              </Link>
              <Link className="text LINK" to={`/channel/${id}/playlists`}>
                Playlists
              </Link>
            </div>
            <hr />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ChannelPage;
