import React, { useContext, useEffect, useState } from "react";
import "../App.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Theme from "./Theme";
import DataContext from "../context/DataContext";
import ThemeContext from "../context/ThemeContext";

const NavBar = () => {
  const { theme } = useContext(ThemeContext);
  const { searchInput, handleSearch, value } = useContext(DataContext);
  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary container-fluid "
      data-bs-theme={theme}>
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto nav-container">
            <span className="left">
              {/* <Navbar.Brand href="#home">Video-Theatre</Navbar.Brand> */}

              <Nav.Link href="#" className="logo">
                <i className="bi bi-youtube" />
                <h1>YouTube</h1>
              </Nav.Link>
            </span>
            <div className="search">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control search-input"
                  id=""
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="button-addon2"
                  onChange={searchInput}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  id="button-addon2"
                  onClick={handleSearch}>
                  <i className="bi bi-search" style={{ fontSize: "20px" }} />
                </button>
              </div>
            </div>
            <span className="right">
              <Theme />
            </span>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
