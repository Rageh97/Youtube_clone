import React, { useEffect, useState } from "react";
import "../App.css";
import { AiFillHome, AiFillLike, AiOutlineDislike } from "react-icons/ai";
import { MdSubscriptions } from "react-icons/md";
import { BsFillStopwatchFill } from "react-icons/bs";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Sidebar() {
const channels = useSelector((state) => state.subscribtionVideos)

const [currentPath, setCurrentPath] = useState("");

useEffect(() => {
  setCurrentPath(window.location.pathname);
}, []);

  const channel = channels.map((channel, index) => {
    return (
      <>
       <Link className=" text-truncate w-100" to={`/channel/${channel?.snippet?.channelId ? channel?.snippet?.channelId : channel?.id}`}>
       
       <div
          key={index}
          className="d-flex w-100   align-items-center gap-2 mb-3 p-2 rounded sidebar-item"
        >
          <Avatar
            sx={{ width: 24, height: 24 }}
            alt="Remy Sharp"
            src={channel?.snippet?.thumbnails?.default?.url}
          />
          <li className="w-100 text-truncate">{channel?.snippet?.channelTitle ? channel?.snippet?.channelTitle : channel?.snippet?.title}</li>
        </div>
       </Link>
      </>
    );
  });

  return (
    <>
      <div className="sidebar carddark">
        <Link className={currentPath === "/" ? "active  activeDark" : " text "} to={"/"}>
          <div className="d-flex align-items-center gap-2 mb-2 p-2 rounded sidebar-item">
            <AiFillHome className="fs-5" />
            <p className="mb-0">Home Page</p>
          </div>
        </Link>
        <Link className={currentPath === "/subscribtions" ? "active activeDark" : "link text"} to={"/subscribtions"}>
          <div className="d-flex align-items-center gap-2 mb-2 p-2 rounded sidebar-item">
            <MdSubscriptions className="fs-5" />
            <p className="mb-0">Subscribtions</p>
          </div>
        </Link>
        <hr />

        <Link className={currentPath === "/watch-later" ? "active activeDark" : "link text"} to={"/watch-later"}>
          <div className="d-flex align-items-center gap-2 mb-2 p-2 rounded sidebar-item">
            <BsFillStopwatchFill className="fs-5" />
            <p className="mb-0">Watch later</p>
          </div>
        </Link>
        <Link className={currentPath === "/videos-i-liked" ? "active activeDark" : "link text"} to={"/videos-i-liked"}>
          <div className="d-flex align-items-center gap-2 mb-2 p-2 rounded sidebar-item">
            <AiFillLike className="fs-5" />
            <p className="mb-0">Videos I liked</p>
          </div>
        </Link>
        <Link className={currentPath === "/videos-i-liked" ? "active activeDark" : "link text"} to={"/dislike-videos"}>
          <div className="d-flex align-items-center gap-2 mb-2 p-2 rounded sidebar-item">
            <AiOutlineDislike className="fs-5" />
            <p className="mb-0 text-truncate">Dislike videos</p>
          </div>
        </Link>
        <hr />

        <ul className="w-100">
          <h6>Channels</h6>
          {channel}
          
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
