import React from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { AiFillHome, AiFillLike } from "react-icons/ai";
import { MdSubscriptions } from "react-icons/md";
import { BsFillStopwatchFill } from "react-icons/bs";
import { BsPlusCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
const MobileFooter = () => {
  const [value, setValue] = React.useState("recents");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="mobile-footer d-block d-lg-none p-4">
      <BottomNavigation
        sx={{ width: "100%" }}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          label="Recents"
          value="recents"
          icon={<BsFillStopwatchFill className="fs-5" />}
        />
        <BottomNavigationAction
          label="Subscribtions"
          value="subscribtions"
          icon={<MdSubscriptions className="fs-1" />}
        />
        <BottomNavigationAction
          label="Add"
          value="add"
          icon={<BsPlusCircle className="fs-1" />}
        />
        <BottomNavigationAction
          label="Like"
          value="like"
          icon={<AiFillLike className="fs-1" />}
        />

        <BottomNavigationAction
          label="Home"
          value="home"
          icon={<AiFillHome className="fs-1" />}
        />
      </BottomNavigation>
    </div>
  );
};

export default MobileFooter;
