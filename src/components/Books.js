import React from "react";

export default function Books({ book }) {
  const { bookname, author, desc } = book;
  return (
    <>
      <div className="card" style={{ width: "18rem" }}>
        <img src="..." class="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{bookname}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{author}</h6>
          <p className="card-text">{desc}</p>
          <a href="#" className="btn btn-primary">
            Add to cart
          </a>
        </div>
      </div>
    </>
  );
}
