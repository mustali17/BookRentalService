import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <head>
        <link
          rel="stylesheet"
          to="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </head>

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
                <Link className="nav-link active" to="/addbook">
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
      </nav>
    </div>
  );
}
