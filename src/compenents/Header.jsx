import React, { useState } from "react";
import "../App.css";
import { Button, Col, Container, Row } from "react-bootstrap";
import { AiFillYoutube, AiOutlineSearch } from "react-icons/ai";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { Badge } from "@mui/material";

function Header() {
  const [showInput, setShowInput] = useState(false);

  const handleSearchClick = () => {
    setShowInput(!showInput);
  };

  return (
    <>
      <Container fluid>
        <Row className="header p-3 d-flex justify-content-between">
          {/* the part of logo  */}
          <Col xs={3}>
            <Link to={"/home"} className="d-flex align-items-center gap-2">
              <AiFillYoutube className="text-danger fs-1" />
              <h4 className="text-dark mb-0">Youtube</h4>
            </Link>
          </Col>
          {/* the part of input search with small screens */}
          <Col className="d-flex d-md-none justify-content-end align-items-center">
            <AiOutlineSearch className="fs-3" onClick={handleSearchClick} />
            {showInput && (
              <div className="d-flex gap-2">
                <input
                  className="form-control rounded-5 border border-2"
                  type="search"
                  placeholder="Search"
                />
                <Button variant="dark">Search</Button>
              </div>
            )}
          </Col>
          {/* the part of input search with large screens */}
          <Col className="d-flex d-none d-md-flex gap-2" xs={5}>
            <input
              className="form-control rounded-5 border border-2"
              type="search"
              placeholder="Search"
            />
            <Button variant="dark">Search</Button>
          </Col>
          {/* the part of profile and notification */}
          <Col
            className="d-flex align-items-center justify-content-end"
            xs={2}
            sm={2}
            md={2}
            lg={4}
            xl={4}
            xxl={4}
          >
            <Badge className="fs-2 mx-2" color="secondary" badgeContent={5}>
              <IoIosNotificationsOutline />
            </Badge>
            <img
              src="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp"
              class="rounded-circle shadow-4"
              style={{ width: "40px" }}
              alt="Avatar"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Header;
