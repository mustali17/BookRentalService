import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Testimonials from "./Testimonials";
import AdsComponent from "./AdsComponent";

export default function Home() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function getRecords() {
      const response = await fetch(
        "https://rentandread.onrender.com/api/record"
      );

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText} Please Refresh this page`;

        return;
      }

      const records = await response.json();
      setRecords(records);
    }

    getRecords();

    return;
  }, []);
  return (
    <>
      <div
        className="container text-center"
        style={{
          height: "80vh",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <div>
          <h1
            style={{ fontFamily: "cambria", color: "white", fontSize: "7.5vw" }}
          >
            Books on Rent
          </h1>
          <h3
            style={{ fontFamily: "cambria", color: "white", fontSize: "3.5vw" }}
          >
            Books on your doorstep
          </h3>
          <Link to="/books">
            <button type="button" className="btn btn-light">
              Rent Books
            </button>
          </Link>

          <br />
          <br />
          <br />
          <h5 style={{ fontFamily: "garamond", fontSize: "2vm" }}>
            If you want to give your books on rent kindly email the details of
            your book at:{" "}
            <a href="mailto:mustalichunawala@gmail.com?subject=Mail from website&body=Hey! Thanks for connecting with us. Please fill out the following details of your book.%0d%0aBook Name:%0d%0aAuthor Name: %0d%0aYour Address: %0d%0aDuration:">
              mustalichunawala@gmail.com
            </a>
          </h5>
        </div>
        <div
          id="sideimage"
          style={{
            perspective: "800px",
            transformStyle: "preserve-3d",
          }}
        >
          <img
            src={require("./5437683-removebg-preview.png")}
            alt="..."
            style={{
              maxWidth: "70%",
              minWidth: "70px",
              height: "auto",
              transform: "rotateY(20deg)",
              filter: "drop-shadow(8px 5px 4px #303030)",
            }}
          />
        </div>
      </div>
      <AdsComponent />
      {/* <Testimonials /> */}
    </>
  );
}
