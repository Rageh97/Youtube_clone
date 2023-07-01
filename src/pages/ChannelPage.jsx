import React, { useEffect } from "react";
import { Button, Col, Container, NavLink, Row } from "react-bootstrap";
import Sidebar from "../compenents/Sidebar";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getChannel,
  fetchChannelById,
 
} from "../Redux/Slices/ChannelSlice";
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
      <Container fluid className="mt-5">
        <Row>
          <Col xs={2}>
            <Sidebar />
          </Col>
          <Col xs={10}>
            {/* Banner of the channel */}
            <img
              className="w-100 h-50 mb-3"
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
               
                <div className="mx-2">
                 
                    <>
                      <h4 className="fw-bold">{channel?.snippet?.title}</h4>
                      <span>{formatNumber(channel?.statistics?.subscriberCount)} subscribers {" "} {channel?.statistics?.videoCount} {" "} video</span>
                    </>
                 
                </div>
              </div>
              <div>
                <Button className="me-5" variant="dark">
                  Subscribe
                </Button>
              </div>
            </div>

            {/* Links of profile videos and playlists */}
            <div className="mt-3 d-flex justify-content-center w-50 gap-5">
              <Link to={`/channel/${channel?.id}/videos`} >Videos</Link>
              <Link>Playlists</Link>
            </div>
            
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ChannelPage;
