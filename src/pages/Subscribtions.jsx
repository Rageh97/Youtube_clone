import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import Sidebar from "../compenents/Sidebar";
import { Link } from "react-router-dom";
import { formatNumber } from "../Utils/FormatNumber";
import { Avatar } from "@mui/material";
import MobileFooter from "../compenents/MobileFooter";

const Subscribtions = () => {
  const subscribtionVideos = useSelector((state) => state.subscribtionVideos);
  return (
    <Container style={{ marginTop: "100px" }} fluid>
      <Row>
        <Col className="d-none d-lg-block" md={2} lg={2} xl={2} xxl={2}>
          <Sidebar />
        </Col>

        <Col xs={12} md={12} lg={10} xl={10} xxl={10}>
          <Row >
            {subscribtionVideos?.map((video, index) => (
             
                <Row key={index} className="w-100 h-100 d-block d-md-flex mb-4">
                  <div className="h-100 col-12 col-md-4">
                    <Link className="w-100 h-100" to={`/videos/${video?.id}`}>
                      <Card.Img
                      style={{height:"250px", objectFit:"cover"}}
                        className="w-100 rounded"
                        variant="top"
                        src={video?.snippet?.thumbnails?.default?.url}
                      />
                    </Link>
                  </div>
                  <div  className="h-100 col-12 col-md-8">
                    <Card.Body className="d-flex w-100 h-100 mx-2 card-body-trans">
                      <div>
                        <Card.Title className="fw-bold fs-5 text">
                          {video?.snippet?.title}
                        </Card.Title>

                        <Card.Text className="text-muted fs-6">
                          {video?.snippet?.publishTime}
                          <span className="mx-1">
                            {formatNumber(video?.statistics?.viewCount)} Views
                          </span>
                        </Card.Text>
                        <div className="d-flex gap-2 align-items-center mb-2">
                          <Link to={`/channel/${video?.snippet?.channelId ? video?.snippet?.channelId : video?.id}`}>
                            <Card.Text className="fw-bold fs-6 mb-0 d-flex align-items-center ">
                              <Avatar
                                alt="Travis Howard"
                                src={video?.snippet?.thumbnails?.default?.url}
                              />

                              <span className="mx-2 LINK text text">
                              {video?.snippet?.channelTitle ? video?.snippet?.channelTitle : video?.snippet?.title}
                              </span>
                            </Card.Text>
                          </Link>
                        </div>
                      </div>
                    </Card.Body>
                  </div>
                </Row>
             
            ))}
          </Row>
        </Col>
      </Row>
      <MobileFooter />
    </Container>
  );
};

export default Subscribtions;
