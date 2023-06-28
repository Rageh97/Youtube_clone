import React, {  useEffect } from "react";

import { useParams } from "react-router-dom";

import { Accordion, Button, Col, Container, Row } from "react-bootstrap";
import { Avatar, Chip, Stack } from "@mui/material";
import Comments from "../compenents/Comments";
import { IoMdShareAlt } from "react-icons/io";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { selectVideosStatus, singleVideo } from "../Redux/Slices/VideoSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideoById } from "../Redux/Slices/VideoSlice";
import Loading from './../Utils/Loading';
import RelatedVideo from "../compenents/RelatedVideo"

const VideoPage = () => {
  const currentVideo = useSelector(singleVideo);
  const status = useSelector(selectVideosStatus)
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchVideoById(id));
  }, [dispatch, id]);
 
 

  return (
    <>
      <Container fluid style={{ marginTop: "90px" }}>
        <Row>
        {status === 'loading' ? <Loading/> : <>
        
        
        <Col xs={12} sm={12} md={12} lg={8} xl={8} xxl={8}>
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
                    <span className="mb-0">333 subscribe</span>
                  </div>
                </div>
                <Button variant="dark">Subscribe</Button>
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
                  <Chip
                    avatar={
                      <Avatar>
                        <AiOutlineLike className="fs-3 chip-action" />
                      </Avatar>
                    }
                    label="like"
                  />

                  <Chip
                    avatar={
                      <Avatar>
                        <AiOutlineDislike className="fs-3 chip-action" />
                      </Avatar>
                    }
                    label="dislike"
                  />
                </Stack>
              </Col>
            </Row>
            {/* here the part of description and views */}

            <Row className="mb-4">
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <div>
                      <p>View {currentVideo?.snippet?.publishTime}</p>
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
        </>}
          {/* here the part of related videos on the other side of the page */}

          <Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
       
            <RelatedVideo/>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default VideoPage;
