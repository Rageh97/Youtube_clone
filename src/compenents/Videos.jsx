import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import { Badge, Col, Container, Row } from "react-bootstrap";
import axios from "axios";

const VideoList = () => {
  const [videos, setVideos] = useState([]);

  // const url =
  //   "https://youtube-v31.p.rapidapi.com/search?q=music&part=snippet%2Cid&regionCode=US&maxResults=50&order=date";
  // const options = {
  //   method: "GET",
  //   headers: {
  //     "X-RapidAPI-Key": "b7d2ae626amshc2966c521430c77p110255jsn4e2578d3e4a1",
  //     "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  //   },
  // };
  // useEffect(() => {
  //   async function fetchVideos() {
  //     const response = await fetch(url, options);
  //     const data = await response.json();
  //     console.log(data.items);
  //     setVideos(data.items);
  //   }

  //   fetchVideos();
  // }, []);
  useEffect(() => {
    // Fetch all videos
    axios
      .get("https://www.googleapis.com/youtube/v3/search", {
        params: {
          part: "snippet",
          chart: "music",
          maxResults: 10,
          key: "AIzaSyBc91am_Bx5R9ngk4nGqFm2xqCZkvvif2A",
        },
      })
      .then((response) => {
        setVideos(response.data.items);
        console.log(response.data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Row style={{marginTop:"70px"}}>
        <Col className=" p-3  mb-3 ">
          <Badge className="p-2 me-3" pill bg="dark">
            videos
          </Badge>
          <Badge className="p-2 me-3" pill bg="primary">
            New
          </Badge>
          <Badge className="p-2 me-3" pill bg="danger">
            suggestion
          </Badge>
          <Badge className="p-2 me-3" pill bg="dark">
            Trending
          </Badge>
          <Badge className="p-2 me-3" pill bg="dark">
            Next
          </Badge>
          <Badge className="p-2 me-3" pill bg="dark">
            Primary
          </Badge>
        </Col>
      </Row>
      <Row className="d-flex ">
        {videos.map((video) => (
          
            <VideoCard key={video.id} video={video} />
          
        ))}
      </Row>
    </>
  );
};

export default VideoList;
