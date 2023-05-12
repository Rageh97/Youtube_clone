import { AccountCircle } from "@mui/icons-material";
import { Avatar, Box, TextField } from "@mui/material";
import React, { useState } from "react";
import { Accordion, Button, Col } from "react-bootstrap";

const Comments = () => {
  const [comments, setComments] = useState([]);

  const [currentComment, setCurrentComment] = useState("");

  const handleAddComment = () => {
    const newComment = {
      username: "Night Sky",
      content: currentComment,
    };

    setComments([...comments, newComment]);

    setCurrentComment("");
  };

  const handleCommentChange = (event) => {
    setCurrentComment(event.target.value);
  };
  return (
    <>
      <Box
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
      </Box>
      <div className="mb-3">
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <h6>see comments</h6>
            </Accordion.Header>
            <Accordion.Body>
              {comments.map((comment) => {
                return (
                  <>
                    <div className="d-flex align-items-center ">
                      <Avatar
                        className="me-2"
                        alt="Travis Howard"
                        src="https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      />
                      <h6 className="mb-0">{comment.username}</h6>
                    </div>
                    <p className="mx-5">{comment.content}</p>
                  </>
                );
              })}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </>
  );
};

export default Comments;
