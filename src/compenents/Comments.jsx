import { AccountCircle } from "@mui/icons-material";
import { Avatar, Box, TextField } from "@mui/material";
import React, { useState } from "react";
import { Accordion, Button, Col } from "react-bootstrap";


const Comments = ({ comment }) => {
  // const [comments, setComments] = useState([]);
  // const [currentComment, setCurrentComment] = useState("");



  // const handleAddComment = () => {
  //   const newComment = {
  //     username: "Night Sky",
  //     content: currentComment,
  //   };

  //   setComments([...comments, newComment]);

  //   setCurrentComment("");
  // };

  // const handleCommentChange = (event) => {
  //   setCurrentComment(event.target.value);
  // };

  return (
    <>
      {/* <Box
        sx={{ display: "flex", alignItems: "flex-end", marginBottom: "30px" }}
      >
        <Avatar
          className="me-2"
          alt="Travis Howard"
          src="https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <TextField
          value={currentComment}
          onChange={handleCommentChange}
          id="input-with-sx"
          label="Add a comment"
          variant="standard"
        />
        <Button className="mx-3" onClick={handleAddComment}>
          Comment
        </Button>
      </Box> */}

      <div className="d-flex align-items-center w-100">
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
