import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { getsearchvideos } from "../Redux/Slices/SearchSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import { formatNumber } from "./../Utils/FormatNumber";
import Sidebar from "../compenents/Sidebar";
import MobileFooter from "../compenents/MobileFooter";
const SearchPage = () => {
  const videos = useSelector(getsearchvideos);
  return (
    <>
      <Container style={{ marginTop: "100px" }} fluid>
        <Row>
          <Col className="d-none d-lg-block" md={2} lg={2} xl={2} xxl={2}>
            <Sidebar />
          </Col>

          <Col xs={12} md={12} lg={10} xl={10} xxl={10}>
            <Row className="d-flex">
              {videos?.map((video) => {
                return (
                  <>
                    <Col
                      className="mb-4"
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                      xxl={12}
                    >
                      <div className="w-100 h-100 d-flex">
                        <div className="w-25 h-100">
                          <Link className="w-100 h-100" to={`/videos/${video?.id?.videoId}`}>
                            <Card.Img
                            className="w-100 h-100"
                              variant="top"
                              src={video?.snippet?.thumbnails?.default?.url}
                            />
                          </Link>
                        </div>
                        <div className="w-75 h-100">
                          <Card.Body className="d-flex w-100 h-100 mx-2">
                            <div >
                              <Card.Title className="fw-bold fs-5">
                                {video?.snippet?.title}
                              </Card.Title>

                            
                              <Card.Text className="text-muted fs-6">
                                {video?.snippet?.publishTime}
                                <span className="mx-1">
                                  {formatNumber(video?.statistics?.viewCount)}{" "}
                                  Views
                                </span>
                              </Card.Text>
                              <div className="d-flex gap-2 align-items-center mb-2">
                                <Link
                                  to={`/channel/${video?.snippet?.channelId}`}
                                >
                                  <Card.Text className="fw-bold fs-6 mb-0 d-flex align-items-center ">
                                    <Avatar
                                      alt="Travis Howard"
                                      src={
                                        video?.snippet?.channelThumbnails
                                          ?.default.url
                                      }
                                    />

                                    <span className="mx-2">{video?.snippet?.channelTitle}</span>
                                  </Card.Text>
                                </Link>
                              </div>
                            </div>
                          </Card.Body>
                        </div>
                      </div>
                    </Col>
                  </>
                );
              })}
            </Row>
          </Col>
        </Row>
        <MobileFooter />
      </Container>
    </>

  );
};

export default SearchPage;
