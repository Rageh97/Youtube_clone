import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Sidebar from "./../compenents/Sidebar";
import UploadVideo from "../compenents/UploadVideo"
const UserChannel = () => {
 
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
                <img
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                  }}
                  src="https://media.istockphoto.com/id/476085198/photo/businessman-silhouette-as-avatar-or-default-profile-picture.jpg?b=1&s=612x612&w=0&k=20&c=PdCpqqV_hmKlW0o8t2TPwDEnOWBGSybOE4NiB8CvwoE="
                  alt="Channel Profile Picture"
                />

                <div className="mx-2">
                  <>
                    <h4 className="fw-bold">mmmmmmmmmmm</h4>
                    <span>645 subscribers 67 video</span>
                  </>
                </div>
              </div>
              <div>
              {/* <UploadVideo/> */}
                {/* <Button className="me-5" variant="dark">
                <input id="video" type="file" />
                  Upload video
                </Button> */}
                {/* <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                />
                 <input type="text" placeholder="Enter video title" value={title} onChange={handleTitleChange} />
                <button onClick={handleUpload}>Upload</button> */}
              </div>
            </div>

            {/* Links of profile videos and playlists */}
            <div className="mt-3 d-flex justify-content-center w-50 gap-5">
              <Link>Videos</Link>
              <Link>Playlists</Link>
            </div>
            <hr />
          </Col>
       
        </Row>
      </Container>
    </>
  );
};

export default UserChannel;
