import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import SearchEBook from "./SearchEBook";

const EBooks = () => {
  const [details, setDetails] = useState([]);
  const [term, setTerm] = useState("Ruskin Bond");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      const resources = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${term}&maxResults=11`
      );
      setDetails(resources.data.items);
      setIsLoading(false);
    };
    fetchDetails();
  }, [term]);

  const loadMore = async () => {
    const resources = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${term}&maxResults=8&startIndex=${details.length}`
    );
    setDetails((oldDetails) => [...oldDetails, ...resources.data.items]);
  };

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

  return (
    <>
      <h2
        style={{
          textTransform: "capitalize",
          color: "#FFFFFF",
          fontSize: "2.5rem",
          marginTop: "-3rem",
          marginBottom: "0.5rem",
          fontFamily: "Scheherazade New",
          textAlign: "center",
        }}
      >
        Ebooks
      </h2>
      <SearchEBook searchText={(text) => setTerm(text)}></SearchEBook>
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
      ) : !details ? (
        <h1
          className="loading-name"
          style={{
            background: "white",
            borderRadius: "1rem",
            color: "#DB4437",
            padding: "1rem",
            position: "absolute",
            top: "50%",
            left: "50%",
            fontSize: "2rem",
            fontFamily: "Inria Serif",
            transform: "translate(-50%,-50%)",
            textTransform: "capitalize",
            textAlign: "center",
          }}
        >
          😞 Couldn't find books about {term}
        </h1>
      ) : (
        <div className="container">
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {details.map((book, index) => (
              <div className="col" key={index}>
                <div className="card border shadow" style={{ width: "18rem" }}>
                  <motion.img
                    src={
                      book.volumeInfo.imageLinks
                        ? book.volumeInfo.imageLinks.thumbnail
                        : defaultBook
                    }
                    width="100%"
                    alt="Book Cover"
                    variants={imageVariants}
                    whileHover="hover"
                    style={{
                      objectFit: "cover",
                      height: "15rem",
                      borderTopLeftRadius: "10px",
                      borderTopRightRadius: "10px",
                    }}
                  />
                  <div className="card-body">
                    <h3
                      className="card-title"
                      style={{
                        marginBottom: "0.5rem",
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        color: "#333",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {book.volumeInfo.title}
                    </h3>
                    <h5
                      className="card-subtitle mb-2"
                      style={{
                        marginBottom: "0.5rem",
                        fontSize: "1.2rem",
                        fontWeight: "normal",
                        color: "#666",
                      }}
                    >
                      Author:{" "}
                      <span
                        style={{
                          fontWeight: "bold",
                          color: "#3B3B3B",
                        }}
                      >
                        {book.volumeInfo.authors ||
                          "Author(s) name not available"}
                      </span>
                    </h5>
                    <h6
                      className="card-subtitle mb-2 text-muted"
                      style={{
                        marginBottom: "0.5rem",
                        fontSize: "1rem",
                        fontWeight: "normal",
                      }}
                    >
                      Published by:{" "}
                      <span
                        style={{
                          fontWeight: "bold",
                          color: "#3B3B3B",
                        }}
                      >
                        {book.volumeInfo.publisher || "Publisher not available"}
                      </span>
                    </h6>
                    <a
                      href={
                        book.volumeInfo.previewLink ||
                        "https://books.google.co.in/"
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary"
                      style={{
                        textDecoration: "none",
                        backgroundColor: "#DB4437",
                        color: "white",
                        borderRadius: "5px",
                        fontSize: "1rem",
                        padding: "0.5rem 1rem",
                      }}
                    >
                      Read more <i className="bi bi-box-arrow-up-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div
            className="load-more"
            style={{ textAlign: "center", marginTop: "2rem" }}
          >
            <button
              onClick={() => loadMore()}
              className="btn btn-primary"
              style={{
                padding: "0.5rem 2rem",
                fontSize: "1rem",
                backgroundColor: "#DB4437",
                color: "white",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Load More!
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EBooks;
