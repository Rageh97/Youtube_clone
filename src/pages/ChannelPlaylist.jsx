import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import {
  fetchPlaylistsByChannel,
  getPlaylistsOfChannel,
  getPlaylistItem,
  fetchPlaylistItem,
} from "../Redux/Slices/ChannelPlaylistSlice";
import { fetchChannelById, getChannel } from "../Redux/Slices/ChannelSlice";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Sidebar from "../compenents/Sidebar";
import { formatNumber } from "../Utils/FormatNumber";
import VideoCard from "../compenents/VideoCard";
import { Avatar } from "@mui/material";
const ChannelPlaylist = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const playlists = useSelector(getPlaylistsOfChannel);
  const channel = useSelector(getChannel);
  useEffect(() => {
    dispatch(fetchChannelById(id));
    dispatch(fetchPlaylistsByChannel(id));
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

            <Row className="d-flex">
              {playlists.map((playlist, index) => (
                <Col
                  key={index}
                  className="mb-4"
                  xs={12}
                  sm={6}
                  md={6}
                  lg={4}
                  xl={4}
                  xxl={3}
                >
                  <Card className="w-100 h-100">
                    <Link to={`/channel/${id}/playlists/${id}`}>
                      <Card.Img
                        variant="top"
                        src={playlist?.snippet?.thumbnails?.default?.url}
                      />
                    </Link>
                    <Card.Body className="d-flex w-100">
                      <div style={{ width: "15%" }} className="me-2">
                        <Avatar
                          alt="Travis Howard"
                          src={
                            playlist?.snippet?.channelThumbnails?.default.url
                          }
                        />
                      </div>
                      <div style={{ width: "85%" }}>
                        <Card.Title className="fw-bold fs-5">
                          {playlist?.snippet?.title}
                        </Card.Title>

                        <div className="d-flex gap-2 align-items-center mb-2">
                          <Link to={`/channel/${playlist?.snippet?.channelId}`}>
                            <Card.Text className="fw-bold fs-6 mb-0">
                              {playlist?.snippet?.channelTitle}
                            </Card.Text>
                          </Link>
                        </div>
                        <Card.Text className="text-muted fs-6">
                          {playlist?.snippet?.publishTime}
                          <span className="mx-1">
                            {formatNumber(playlist?.statistics?.viewCount)}{" "}
                            Views
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

export default ChannelPlaylist;
