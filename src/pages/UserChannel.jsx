import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./../compenents/Sidebar";
import {FaUpload} from "react-icons/fa"
import {CgProfile} from "react-icons/cg"
import {FcUpload} from "react-icons/fc"
import UploadVideo from "./UploadVideo";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
const UserChannel = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("profileData"));
  const formData = JSON.parse(localStorage.getItem("formData"));
  const videos = useSelector((state) => state.uservideos.videos.videos);
  const imageURL = useSelector((state) => state.image.imageURL);
  return (
    <>
      <Container fluid style={{ marginTop: "100px" }}>
        <Row>
          <Col className="d-none d-lg-block" md={2} lg={2} xl={2} xxl={2}>
            <Sidebar />
          </Col>
          <Col xs={12} md={12} lg={10} xl={10} xxl={10}>
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
                    <h4 className="fw-bold card-title text">
                      {userData?.name ? userData?.name : formData?.name}
                    </h4>
                    <h5 className="fw-bold card-title text">
                      {userData?.bio ? userData?.bio : formData?.email}
                    </h5>
                    <span>
                      {" "}
                      <span className="card-title card-title text">
                        {videos?.length ? videos.length : "No videos uploaded"}{" "}
                        videos
                      </span>{" "}
                     
                    </span>
                  </>
                </div>
              </div>
             
                <div className="d-block">
                <Button
                  onClick={() => navigate("/setting")}
                  className="mx-5 Button"
                 
                >
                  UPDATE YOUR PROFILE
                <CgProfile className="fs-5 text-center mx-2 "/>
                </Button>
              
             
                <Button
                  onClick={() => navigate("/upload-video")}
                  className="mx-5 Button"
                 
                >
                  UPLOAD VIDEO
                  <FaUpload className=" text-center mx-2"/>
                </Button>
                </div>
             
            </div>

            {/* Links of profile videos and playlists */}
            <div className="mt-3 d-flex justify-content-center w-50 gap-5">
              <Link className="LINK text" to={"/user-videos"}>Videos</Link>
              <Link className="LINK text">Playlists</Link>
            </div>
            <hr />
            <Row className="d-flex flex-column align-items-center ">
              <FcUpload  style={{width:"200px", height:"250px"}}/>
              <h3 className="text-center card-title text">Download video</h3>
              <p className="text-muted text-center mb-2 card-title">Start sharing your story and connecting with your viewers. Your uploaded videos will appear here.</p>
              <Button
              style={{width:"150px", marginBottom:"100px"}}
                  onClick={() => navigate("/upload-video")}
                  className=" Button"
                 
                >
                  UPLOAD VIDEO
                  <FaUpload className=" text-center mx-2"/>
                </Button>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserChannel;
