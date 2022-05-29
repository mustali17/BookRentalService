import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div
        className="container text-center"
        style={{
          height: "80vh",
          alignItems: "center",
          justifyContent: "center",
          display: "flex"
        }}
      >
        <div>
          <h1 style={{ fontFamily: "cambria", color: "#00539CFF" }}>
            Books on Rent
          </h1>
          <h3 style={{ fontFamily: "cambria", color: "#00539CFF" }}>
            Books on your doorstep
          </h3>
          <Link to="/books">
            <button type="button" className="btn btn-outline-primary">
              Rent Books
            </button>
          </Link>
          <br />
          <br />
          <br />
          <h6 style={{ fontFamily: "garamond" }}>
            If you want to give your books on rent kindly email the details of
            your book at:{" "}
            <a href="mailto:mustalichunawala@gmail.com?subject=Mail from website&body=Hey! Thanks for connecting with us. Please fill out the following details of your book.%0d%0aBook Name:%0d%0aAuthor Name: %0d%0aYour Address: %0d%0aDuration:">
              mustalichunawala@gmail.com
            </a>
          </h6>
        </div>
        <img
          src="https://freepngimg.com/thumb/reading/146802-boy-reading-book-png-free-photo.png"
          alt="..."
          style={{ maxWidth: "100%", minWidth: "90px", height: "auto" }}
        />
      </div>
    </>
  );
}
