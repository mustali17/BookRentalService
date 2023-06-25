import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdsComponent from "./AdsComponent";
import { motion } from "framer-motion";
const imageVariants = {
  hover: {
    scale: 1.1,
    boxShadow: "0px 0px 8px #000",
    transition: {
      duration: 0.5,
      type: "spring",
      delay: 0.15,
    },
  },
};
const Record = (props) => (
  <div>
    <div className="col">
      <div className="container card border shadow" style={{ width: "18rem" }}>
        <motion.img
          src={props.record.imgurl}
          className="card-img-top"
          width="100"
          height="220"
          variants={imageVariants}
          whileHover="hover"
          alt="..."
          style={{
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.record.bookname}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            {props.record.authorname}
          </h6>
          <p className="card-text mb-1" style={{ color: "green" }}>
            ₹{props.record.price}/pm
          </p>
          {props.record.onRent ? (
            <>
              <p className="card-text" style={{ color: "red" }}>
                Out of Stock
              </p>
              <button className="btn btn-primary" disabled={true}>
                Rent Now!
              </button>
            </>
          ) : (
            <Link to={`/books/cart/${props.record._id}`}>
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.1 }}
                className="btn btn-primary"
              >
                Rent Now!{" "}
              </motion.button>
            </Link>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default function RecordList() {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(
        "https://rentandread.onrender.com/api/record"
      );

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText} Please Refresh this page`;
        toast.error(message);
        setIsLoading(false);
        return;
      }

      const records = await response.json();
      setRecords(records);
      setSearchResults(records); // Initialize searchResults with all records
      setIsLoading(false); // set isLoading to false once data is fetched
    }

    getRecords();
  }, []);

  function recordList() {
    return searchResults.map((record) => {
      return <Record record={record} key={record._id} />;
    });
  }

  function searchBooks(event) {
    const query = event.target.value;
    setSearchQuery(query);

    const filteredRecords = records.filter((record) =>
      record.bookname.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredRecords);
  }

  return (
    <div>
      <h3 style={{ textAlign: "center", fontFamily: "yellowtail" }}>
        View Books:
      </h3>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}
      >
        <input
          type="search"
          value={searchQuery}
          onChange={searchBooks}
          placeholder="&#128269; Search books..."
          style={{
            padding: "8px",
            borderRadius: "20px",
            width: "300px",
            border: "none",
            outline: "none",
            background: "#f2f2f2",
          }}
        />
      </div>

      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
          }}
        >
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : searchResults.length > 0 ? (
        <div className="container" style={{ alignItems: "center" }}>
          <div className="row row-cols-1 row-cols-md-3 g-2">{recordList()}</div>
        </div>
      ) : (
        <>
          <p style={{ textAlign: "center", marginTop: "20px", color: "#fff" }}>
            No books found.
          </p>
          <p style={{ textAlign: "center", marginTop: "20px", color: "#fff" }}>
            Didn't find the book you were looking for? No worries, request it
            now.
          </p>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Link
              className="btn btn-primary"
              to={`/requestbook`}
              style={{ backgroundColor: "#fff", color: "rgb(76, 134, 226)" }}
            >
              Request a Book
            </Link>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <img
              src={require("../2672266-removebg-preview.png")}
              alt="No books found"
              style={{
                maxWidth: "100%",
                minWidth: "70px",
                height: "auto",
                transform: "rotateY(-20deg)",
                filter: "drop-shadow(8px 5px 4px #303030)",
              }}
            />
          </div>
        </>
      )}
      <ToastContainer />
    </div>
  );
}
