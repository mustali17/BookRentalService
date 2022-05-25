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
          <h1>Books on Rent</h1>
          <h3>Books on your doorstep</h3>
          <Link to="/books">
            <button type="button" className="btn btn-outline-primary">
              Rent Books
            </button>
          </Link>
          <br />
          <br />
          <br />
          <h5>
            If you want to give your books on rent kindly emial the details of
            your book at:{" "}
            <a href="mailto:mustalichunawala@gmail.com?subject=Mail from website&body=Hey!Thanks for connecting with us.Please fill out the following details of your book.%0d%0aBook Name:%0d%0aAuthor Name: %0d%0aYour Address: %0d%0aDuration:">
              mustalichunawala@gmail.com
            </a>
          </h5>
        </div>
      </div>
    </>
  );
}
