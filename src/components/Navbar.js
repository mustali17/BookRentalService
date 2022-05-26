import React from "react";
import { Link } from "react-router-dom";
import { Container, Nav, Navbar, NavItem } from "react-bootstrap";

export default function Navbr() {
  return (
    <div>
      <head>
        <link
          rel="stylesheet"
          to="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </head>

      {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQarEYDc2Nb8_EGg6UnXsJzAWbgPeIMQe4GkQ&usqp=CAU"
              height="45"
              alt="MDB Logo"
              loading="lazy"
            />
            <span style={{ fontFamily: "yellowtail" }}>Rent&Read</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav  ms-auto">
              <li className="nav-item mx-auto mx-md-2">
                <Link className="nav-link active" to="/">
                  <i className="bi bi-house"></i> Home
                </Link>
              </li>
              <li className="nav-item mx-auto mx-md-2">
                <Link className="nav-link active" to="/about">
                  <i className="bi bi-info-lg"></i> About
                </Link>
              </li>
              <li className="nav-item mx-auto mx-md-2">
                <Link className="nav-link active" to="/books">
                  <i className="bi bi-book"></i> Books
                </Link>
              </li>
              <li className="nav-item mx-auto mx-md-2">
                <Link className="nav-link active" to="/authenticate">
                  <i className="bi bi-plus"></i> Add Books
                </Link>
              </li>
              <li className="nav-item mx-auto mx-md-2">
                <Link className="nav-link active" to="contact">
                  <i className="bi bi-person"></i> Contact Us
                </Link>
              </li>
              <li className="nav-item mx-auto mx-md-2">
                <Link className="nav-link" to="/profile">
                  <img
                    src="https://avatars.githubusercontent.com/u/74243780?v=4"
                    className="rounded-circle"
                    height="25"
                    alt="Black and White Portrait of a Man"
                    loading="lazy"
                  />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav> */}
      <div class="shadow p-1 mb-5 bg-white rounded">
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
          <Container>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQarEYDc2Nb8_EGg6UnXsJzAWbgPeIMQe4GkQ&usqp=CAU"
              height="45"
              alt="Logo"
              loading="lazy"
            />
            <Link className="nav-link active" to="/">
              <Navbar.Brand style={{ fontFamily: "yellowtail" }}>
                Rent&Read
              </Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav style={{ fontFamily: "yellowtail", fontWeight: "bold" }}>
                <ul className="navbar-nav ">
                  <li className="nav-item mx-auto mx-md-2">
                    <Link className="nav-link active" to="/">
                      <NavItem>
                        <i className="bi bi-house"></i> Home
                      </NavItem>
                    </Link>
                  </li>
                  <li className="nav-item mx-auto mx-md-2">
                    <Link className="nav-link active" to="/about">
                      <NavItem>
                        <i className="bi bi-info-lg"></i> About us
                      </NavItem>
                    </Link>
                  </li>
                  <li className="nav-item mx-auto mx-md-2">
                    <Link className="nav-link active" to="/books">
                      <NavItem>
                        <i className="bi bi-book"></i> Books
                      </NavItem>
                    </Link>
                  </li>
                  <li className="nav-item mx-auto mx-md-2">
                    <Link className="nav-link active" to="/authenticate">
                      <NavItem>
                        <i className="bi bi-plus"></i> Add Books
                      </NavItem>
                    </Link>
                  </li>
                  <li className="nav-item mx-auto mx-md-2">
                    <Link className="nav-link active" to="/contact">
                      <NavItem>
                        <i className="bi bi-person"></i> Contact us
                      </NavItem>
                    </Link>
                  </li>
                  <li className="nav-item mx-auto mx-md-2">
                    <Link className="nav-link active" to="/profile">
                      <NavItem>
                        <img
                          src="https://avatars.githubusercontent.com/u/74243780?v=4"
                          className="rounded-circle"
                          height="25"
                          alt="Black and White Portrait of a Man"
                          loading="lazy"
                        />
                      </NavItem>
                    </Link>
                  </li>
                </ul>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </div>
  );
}
