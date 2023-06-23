import React from "react";
import { Link } from "react-router-dom";
import { Container, Nav, Navbar, NavItem } from "react-bootstrap";
import Avatar from "react-avatar";

let status = "Login";
let linkto = "signin";
let user = JSON.parse(localStorage.getItem("user"));

export default function Navbr() {
  if (localStorage.getItem("loginStatus") === "true") {
    status = "Logout";
    linkto = "logout";
    console.log("logged in");
  }

  const closeMenu = () => {
    const navbarCollapse = document.querySelector(".navbar-collapse");
    if (navbarCollapse.classList.contains("show")) {
      navbarCollapse.classList.remove("show");
    }
  };

  return (
    <div>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </head>

      <div className="shadow p-1 mb-5 bg-white rounded">
        <Navbar collapseOnSelect expand="lg" bg="light">
          <Container>
            <Navbar.Brand style={{ fontFamily: "yellowtail" }}>
              <Link
                className="nav-link active"
                to="/"
                onClick={closeMenu}
                style={{ display: "flex", alignItems: "center" }}
              >
                <img
                  src={require("../components/logo1.jpg")}
                  height="45"
                  alt="Logo"
                  loading="lazy"
                  style={{ marginRight: "10px" }}
                />
                Rent&Read
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav style={{ fontFamily: "yellowtail" }}>
                <ul className="navbar-nav">
                  <li className="nav-item mx-auto mx-md-2">
                    <Link
                      className="nav-link active"
                      to="/"
                      onClick={closeMenu}
                    >
                      <NavItem>
                        <i className="bi bi-house"></i> Home
                      </NavItem>
                    </Link>
                  </li>
                  <li className="nav-item mx-auto mx-md-2">
                    <Link
                      className="nav-link active"
                      to="/about"
                      onClick={closeMenu}
                    >
                      <NavItem>
                        <i className="bi bi-info-lg"></i> About us
                      </NavItem>
                    </Link>
                  </li>
                  <li className="nav-item mx-auto mx-md-2">
                    <Link
                      className="nav-link active"
                      to="/books"
                      onClick={closeMenu}
                    >
                      <NavItem>
                        <i className="bi bi-book"></i> Books
                      </NavItem>
                    </Link>
                  </li>
                  {/* <li className="nav-item mx-auto mx-md-2">
                    <Link
                      className="nav-link active"
                      to="/authenticate"
                      onClick={closeMenu}
                    >
                      <NavItem>
                        <i className="bi bi-plus"></i> Add Books
                      </NavItem>
                    </Link>
                  </li> */}
                  <li className="nav-item mx-auto mx-md-2">
                    <Link
                      className="nav-link active"
                      to="/contact"
                      onClick={closeMenu}
                    >
                      <NavItem>
                        <i className="bi bi-person"></i> Contact us
                      </NavItem>
                    </Link>
                  </li>
                  <li className="nav-item mx-auto mx-md-2">
                    <Link
                      className="nav-link active"
                      to={`/${linkto}`}
                      onClick={closeMenu}
                    >
                      <NavItem>
                        <i className="bi bi-person-plus"></i> {status}
                      </NavItem>
                    </Link>
                  </li>
                  {user ? (
                    <li className="nav-item mx-auto mx-md-2">
                      <Link
                        className="nav-link active"
                        to="/profile"
                        onClick={closeMenu}
                      >
                        <NavItem>
                          <Avatar
                            name={user ? user.username : "R & R"}
                            round={true}
                            size="30"
                          />
                        </NavItem>
                      </Link>
                    </li>
                  ) : (
                    ""
                  )}
                </ul>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </div>
  );
}
