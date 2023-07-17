import React, { useEffect, useState } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { AiFillHome, AiFillLike } from "react-icons/ai";
import { MdSubscriptions } from "react-icons/md";
import { BsFillStopwatchFill } from "react-icons/bs";
import { BsPlusCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
const MobileFooter = () => {
  const [value, setValue] = React.useState("recents");

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const navigate = useNavigate();
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);
  return (
    <div className="mobile-footer d-block d-lg-none p-3 shadow ">
      <BottomNavigation
        sx={{ width: "100%" }}
        value={value}
        onChange={handleChange}
      >
        <Link to={"watch-later"}>
        <BottomNavigationAction
          label="Recents"
          value="recents"
          icon={
            <BsFillStopwatchFill
              className={
                currentPath === "watch-later"
                  ? "active fs-1"
                  : "text-dark fs-1"
              }
            />
          }
        />
        </Link>

       <Link to={"subscribtions"}>
       <BottomNavigationAction
          label="Subscribtions"
          value="subscribtions"
          icon={
            <MdSubscriptions
              className={
                currentPath === "subscribtions"
                  ? "active fs-1"
                  : "text-dark fs-1"
              }
            />
          }
        />
       </Link>
       <Link to={"/upload-video"}>
       <BottomNavigationAction
          label="Add"
          value="add"
          icon={<BsPlusCircle className="fs-1" />}
        />
       </Link>
        <Link to={"videos-i-liked"}>
        
        <BottomNavigationAction
          
          label="Like"
          value="like"
          icon={
            <AiFillLike
              className={
                currentPath === "videos-i-liked"
                  ? "active fs-1"
                  : "text-dark fs-1"
              }
            />
          }
        />
        </Link>

        <Link to={"/"}>
          <BottomNavigationAction
            label="Home"
            value="home"
            icon={
              <AiFillHome
                className={
                  currentPath === "/" ? "active fs-1" : "text-dark fs-1"
                }
              />
            }
          />
        </Link>
      </BottomNavigation>
    </div>
  );
};

export default MobileFooter;
