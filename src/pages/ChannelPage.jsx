import React, { useEffect } from "react";
import { Button, Col, Container, NavLink, Row } from "react-bootstrap";
import Sidebar from "../compenents/Sidebar";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getChannel, fetchChannelById } from "../Redux/Slices/ChannelSlice";
import { formatNumber } from "../Utils/FormatNumber";

const ChannelPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const channel = useSelector(getChannel);

  useEffect(() => {
    dispatch(fetchChannelById(id));
  }, [id, dispatch]);

  return (
    <>
      <Container fluid style={{ marginTop: "100px" }}>
        <Row>
          <Col className="d-none d-lg-block" md={2} lg={2} xl={2} xxl={2}>
            <Sidebar />
          </Col>
          <Col xs={12} md={12} lg={10} xl={10} xxl={10}>
            {/* Banner of the channel */}
            <img
              style={{ height: "35%", objectFit: "cover" }}
              className="w-100 mb-3"
              src={channel?.brandingSettings?.image?.bannerExternalUrl}
              alt=""
            />
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

                <div className="mx-2 d-xs-flex align-items-center justify-content-between">
                  <h4 className="fw-bold">{channel?.snippet?.title}</h4>
                  <span>
                    {formatNumber(channel?.statistics?.subscriberCount)}{" "}
                    subscribers {channel?.statistics?.videoCount} video
                  </span>

                  <Button className="mx-0 mx-sm-5 " variant="dark">
                    Subscribe
                  </Button>
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
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ChannelPage;
