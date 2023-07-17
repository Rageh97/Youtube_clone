import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchVideos } from "../Redux/Slices/UserVideos";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import { formatNumber } from "../Utils/FormatNumber";
import Sidebar from "../compenents/Sidebar";

const UserVideos = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.uservideos);
  const videos = useSelector((state) => state.uservideos.videos.videos);
  const token = JSON.parse(localStorage.getItem("accessToken"));
  const userData = JSON.parse(localStorage.getItem("profileData"));
  const formData = JSON.parse(localStorage.getItem("formData"));
  const imageURL = useSelector((state) => state.image.imageURL);
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(fetchVideos(token)); // Pass the access token stored in localStorage
  }, [dispatch]);

  if (status === "loading") {
    return <div style={{ marginTop: "200px" }}>Loading...</div>;
  }

  if (status === "failed") {
    return <div style={{ marginTop: "200px" }}>Error: {error}</div>;
  }

  return (
    <>
      <Container fluid style={{ marginTop: "100px" }}>
        <Row>
          <Col xs={2}>
            <Sidebar />
          </Col>
          <Col xs={10}>
            {/* Pic profile of the channel and content */}
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <Avatar
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                  }}
                  alt="Travis Howard"
                  src={imageURL}
                />

                <div className="mx-2">
                  <>
                    <h4 className="fw-bold">
                      {userData?.name ? userData?.name : formData?.name}
                    </h4>
                    <h5 className="fw-bold">
                      {userData?.bio ? userData?.bio : formData?.email}
                    </h5>
                    <span>{videos?.length ? videos.length : "No videos uploaded"} {" "} videos</span>
                  </>
                </div>
              </div>
              <div>
                <Button
                  onClick={() => navigate("/setting")}
                  className="mx-5 Button"
                 
                >
                  UPDATE YOUR PROFILE
                </Button>
              </div>
              <div>
                <Button
                  onClick={() => navigate("/upload-video")}
                  className="mx-5 Button"
                  
                >
                  UPLOAD VIDEO
                </Button>
              </div>
            </div>

            {/* Links of profile videos and playlists */}
            <div className="mt-3 d-flex justify-content-center w-50 gap-5">
              <Link className="LINK text" to={"/user-videos"}>Videos</Link>
              <Link className="LINK text">Playlists</Link>
            </div>
            <hr />
            <Row className="d-flex">
            {videos?.map((video) => (
            <Col className="mb-4" xs={12} sm={6} md={6} lg={4} xl={4} xxl={3}>
              <Card className="w-100 h-100 carddark shadowDark">
                <Link to={`/videos/${video?.id}`}>
                  <Card.Img
                    variant="top"
                    src={`https://youtube.softscope.net${video?.thumbnail_url}`}
                  />
                </Link>
                <Card.Body className="d-flex w-100">
                  <div style={{ width: "15%" }} className="me-2">
                    <Avatar
                      alt="Travis Howard"
                      src={`https://youtube.softscope.net${video?.thumbnail_url}`}
                    />
                  </div>
                  <div style={{ width: "85%" }}>
                    <Card.Title className="fw-bold fs-5 ">
                      {video?.title}
                    </Card.Title>

                    <div className="d-flex gap-2 align-items-center mb-2">
                      <Link to={`/channel/${video?.snippet?.channelId}`}>
                        <Card.Text className="fw-bold fs-6 mb-0 channeltitle">
                          {video?.snippet?.channelTitle}
                        </Card.Text>
                      </Link>
                    </div>
                    <Card.Text className="text-muted fs-6">
                      {video?.created_at}
                      <span className="mx-1 channeltitle">
                        {formatNumber(video?.statistics?.viewCount)} Views
                      </span>
                    </Card.Text>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
          {!videos && (<h3 className="logo text">No videos Uploaded !</h3>)}
            </Row>
          </Col>
         
       
    
       
       
        </Row>
      
      </Container>

      {/* <div style={{ marginTop: "200px" }}>
 {videos?.map((video) => (
    <Col className="mb-4" xs={12} sm={6} md={6} lg={4} xl={4} xxl={3}>
    <Card className="w-100 h-100 carddark shadowDark">
      <Link to={`/videos/${video?.id}`}>
        <Card.Img
          variant="top"
          src={`https://youtube.softscope.net${video?.thumbnail_url}`}
          
        />
      </Link>
      <Card.Body className="d-flex w-100">
        <div style={{ width: "15%" }} className="me-2">
          <Avatar
            alt="Travis Howard"
            src={`https://youtube.softscope.net${video?.thumbnail_url}`}
          />
        </div>
        <div style={{ width: "85%" }}>
          <Card.Title className="fw-bold fs-5 ">
            {video?.title}
          </Card.Title>

          <div className="d-flex gap-2 align-items-center mb-2">
            <Link to={`/channel/${video?.snippet?.channelId}`}>
              <Card.Text className="fw-bold fs-6 mb-0 channeltitle">
                {video?.snippet?.channelTitle}
              </Card.Text>
            </Link>
          </div>
          <Card.Text className="text-muted fs-6">
            {video?.created_at}
            <span className="mx-1 channeltitle">
              {formatNumber(video?.statistics?.viewCount)} Views
            </span>
          </Card.Text>
        </div>
      </Card.Body>
    </Card>
  </Col>
   ))}
 </div> */}
    </>
  );
};

export default UserVideos;
