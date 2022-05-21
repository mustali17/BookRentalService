import React from "react";
import { Link } from "react-router-dom";

export default function Carts({ book }) {
  const { bookname, author, imgurl, price } = book;
  return (
    <>
      <div className="Cart-Items">
        <div className="image-box">
          <img src={imgurl} style={{ height: "120px" }} alt={bookname} />
        </div>
        <div className="about">
          <h1 className="title">{bookname}</h1>
          <h3 className="subtitle">{author}</h3>
        </div>

        <div className="counter">
          <div className="btn">+</div>
          <div className="count">1</div>
          <div className="btn">-</div>
        </div>
        <div className="prices">
          <div className="amount">{price}/-</div>
          <div className="save">
            <u>Save for later</u>
          </div>
          <div className="remove">
            <u>Remove</u>
          </div>
        </div>
      </div>
    </>
  );
}
