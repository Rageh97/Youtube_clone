import React, { useEffect } from "react";
import {
  fetchPlaylistItem,
  getPlaylistItem,
} from "../Redux/Slices/ChannelPlaylistSlice";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import VideoCard from "../compenents/VideoCard";
import { Card, Col } from "react-bootstrap";
import { Avatar } from "@mui/material";
import { formatNumber } from "../Utils/FormatNumber";
const PlaylistItem = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const playlistItem = useSelector(getPlaylistItem);
  useEffect(() => {
    dispatch(fetchPlaylistItem(id));
  }, [id, dispatch]);
  return (
    <>
      {playlistItem?.map((item, index) => (
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
            <Link to={`/videos/${item?.id?.videoId}}`}>
              <Card.Img
                variant="top"
                src={item?.snippet?.thumbnails?.default?.url}
              />
            </Link>
            <Card.Body className="d-flex w-100">
              <div style={{ width: "15%" }} className="me-2">
                <Avatar
                  alt="Travis Howard"
                  src={
                    item?.snippet?.channelThumbnails?.default.url
                  }
                />
              </div>
              <div style={{ width: "85%" }}>
                <Card.Title className="fw-bold fs-5">
                  {item?.snippet?.title}
                </Card.Title>

                <div className="d-flex gap-2 align-items-center mb-2">
                  <Link to={`/channel/${item?.snippet?.channelId}`}>
                    <Card.Text className="fw-bold fs-6 mb-0">
                      {item?.snippet?.channelTitle}
                    </Card.Text>
                  </Link>
                </div>
                <Card.Text className="text-muted fs-6">
                  {item?.snippet?.publishTime}
                  <span className="mx-1">
                    {formatNumber(item?.statistics?.viewCount)}{" "}
                    Views
                  </span>
                </Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </>
  );
};

export default PlaylistItem;
