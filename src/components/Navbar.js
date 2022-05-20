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
      {/* <nav classNameName="navbar navbar-expand-lg navbar-dark bg-dark">
        <div classNameName="container-fluid">
          <button
            classNameName="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i classNameName="material-icons">list</i>
          </button>

          <div classNameName="collapse navbar-collapse" id="navbarSupportedContent">
            <ul classNameName="navbar-nav me-auto mb-2 mb-lg-0">
              <li classNameName="nav-item">
                <Link classNameName="nav-link" to="/">
                  Home
                  <i classNameName="material-icons">home</i>
                </Link>
              </li>
              <li classNameName="nav-item">
                <Link classNameName="nav-link" to="/about">
                  About us
                  <i classNameName="material-icons">info</i>
                </Link>
              </li>
              <li classNameName="nav-item">
                <Link classNameName="nav-link" to="/books">
                  Books
                  <i classNameName="material-icons">library_books</i>
                </Link>
              </li>
              <li classNameName="nav-item">
                <Link classNameName="nav-link" to="/addbook">
                  Add Books
                  <i classNameName="material-icons">add</i>
                </Link>
              </li>
              <li classNameName="nav-item">
                <Link classNameName="nav-link" to="/contact">
                  Conatact Us
                  <i classNameName="material-icons">contacts</i>
                </Link>
              </li>
            </ul>
          </div>

          <div classNameName="d-flex align-items-center">
            <Link classNameName="text-reset me-3" to="/cart">
              <i classNameName="material-icons">shopping_cart</i>
            </Link>

            <div classNameName="dropdown">
              <Link
                to="/profile"
                id="navbarDropdownMenuAvatar"
                role="button"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://avatars.githubusercontent.com/u/74243780?v=4"
                  classNameName="rounded-circle"
                  height="25"
                  alt="Black and White Portrait of a Man"
                  loading="lazy"
                />
              </Link>
            </div>
          </div>
        </div>
      </nav> */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            BookRental Service
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
