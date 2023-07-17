import { AccountCircle } from "@mui/icons-material";
import { Avatar, Box, TextField } from "@mui/material";
import React, { useState } from "react";
import { Accordion, Button, Col } from "react-bootstrap";


const Comments = ({ comment }) => {

  return (
    <>
   

      <div className="d-flex align-items-center w-100 ">
        <Avatar
          className="me-2"
          alt="Travis Howard"
          src={comment?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl}
        />
        <h6 className="mb-0 fw-bold">{comment?.snippet?.topLevelComment?.snippet?.authorDisplayName}</h6>
      </div>
      <p className="mx-5 text-muted w-100 text-truncate">{comment?.snippet?.topLevelComment?.snippet?.textDisplay}</p>

    
    </>
  );
};

export default Comments;
