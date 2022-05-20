import React from "react";
import { Link } from "react-router-dom";

export default function Books({ book }) {
  const { bookname, author, desc } = book;
  return (
    <>
      <div className="card" style={{ width: "18rem" }}>
        <img
          src="https://m.media-amazon.com/images/I/51-nXsSRfZL.jpg"
          className="card-img-top"
          height="220"
          width="200"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{bookname}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{author}</h6>
          <p className="card-text">{desc}</p>
          <Link to="/cart" className="btn btn-primary">
            Add to cart
          </Link>
        </div>
      </div>
    </>
  );
}
