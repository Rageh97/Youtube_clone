import React, { useState } from "react";
import "../App.css";
import { Button, Col, Container, Offcanvas, Row } from "react-bootstrap";
import {  AiOutlineSearch } from "react-icons/ai";
import { IoIosNotificationsOutline } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { BsYoutube } from "react-icons/bs";
import { GrChannel } from "react-icons/gr";
import { FiSettings } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "@mui/material";
import { fetchSearchVideos } from "../Redux/Slices/SearchSlice";
import { useDispatch } from "react-redux";
function Header() {
  const [showInput, setShowInput] = useState(false);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const isLogged = localStorage.getItem("user");
  const user = JSON.parse(isLogged);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const navigat = useNavigate();
  const handleLogOut = () => {
    localStorage.clear();
    navigat("/sign-up");
  };
  const handleSearchClick = () => {
    setShowInput(!showInput);
  };
  const handleSearch = (name) => {
    dispatch(fetchSearchVideos(name));
    navigat("/search-result");
  };
  return (
    <>
      <Container fluid>
        <Row className="header p-3 d-flex justify-content-between">
          {/* the part of logo  */}
          <Col className="d-flex align-items-center">
            <Link to={"/"} className="d-flex align-items-center  w-50 gap-2">
              <BsYoutube style={{fontSize:"40px"}} className="text-danger " />
              <h4 className="text-dark mb-0">Youtube</h4>
            </Link>
          </Col>
          {/* the part of input search with small screens */}
          {isLogged ? (
            <Col className="d-flex d-md-none justify-content-end align-items-center">
              <AiOutlineSearch className="fs-3" onClick={handleSearchClick} />
              {showInput && (
                <div className="d-flex gap-2">
                  <input
                    className="form-control header-search rounded-5 border border-2"
                    type="search"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <Button onClick={() => handleSearch(search)} variant="dark">
                    Search
                  </Button>
                </div>
              )}
            </Col>
          ) : (
            ""
          )}
          {/* the part of input search with large screens */}
          <Col className="d-flex d-none d-md-flex gap-2" xs={5}>
            <input
              className="form-control header-search rounded-5 border border-2"
              type="search"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button onClick={() => handleSearch(search)} variant="dark">
              Search
            </Button>
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
            {isLogged ? (
              <>
                <Badge className="fs-2 mx-2" color="secondary" badgeContent={5}>
                  <IoIosNotificationsOutline />
                </Badge>
                <img
                  onClick={handleShow}
                  src="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp"
                  class="rounded-circle shadow-4"
                  style={{ width: "40px" }}
                  alt="Avatar"
                />
              </>
            ) : (
              <>
                <Button
                  href="/sign-in"
                  className="mx-1"
                  variant="outline-danger"
                >
                  Sign in
                </Button>
                <Button
                  href="/sign-up"
                  className="mx-1"
                  variant="outline-danger"
                >
                  Sign up
                </Button>
              </>
            )}

            <Offcanvas placement="end" show={show} onHide={handleClose}>
              <Offcanvas.Header closeButton>
                <div className="d-block">
                  <Offcanvas.Title>{user?.username}</Offcanvas.Title>

                  <h4 className="fw-bold">{user?.email}</h4>
                </div>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <ul>
                  <Link className="text-dark" to={"/user-channel"}>
                    <li className="mb-3 p-2">
                      {" "}
                      <GrChannel className="fs-2 mx-2" /> Your channel
                    </li>
                  </Link>
                  <Link className="text-dark" to={"/setting"}>
                    <li className="mb-3 p-2">
                      {" "}
                      <FiSettings className="fs-2 mx-2" /> Settings
                    </li>
                  </Link>
                  <li onClick={handleLogOut} className="mb-3 p-2">
                    {" "}
                    <BiLogOut className="fs-2 mx-2" /> logout
                  </li>
                </ul>
              </Offcanvas.Body>
            </Offcanvas>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Header;
