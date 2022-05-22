import React from "react";
import { Link } from "react-router-dom";

export default function Books({ book }) {
  const { id, bookname, author, desc, imgurl, price } = book;
  return (
    <>
      <div class="col-lg-6 mb-4">
        <div className="card" style={{ width: "18rem" }}>
          <img
            src={imgurl}
            className="card-img-top"
            width="100"
            height="170"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{bookname}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{author}</h6>
            <p className="card-text">{desc}</p>
            <p className="card-text">{price}/-</p>
            <Link to={`/books/cart/${id}`} className="btn btn-primary">
              Add to cart
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
