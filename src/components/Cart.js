import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import shortid from "shortid";
import { useNavigate, useParams } from "react-router-dom";
import { cartBook, getBook } from "../actions/bookaction";

export default function Cart() {
  let { id } = useParams();

  let history = useNavigate();

  const book = useSelector((state) => state.book.book);

  const [bookname, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [desc, setDesc] = useState("");
  const [imgurl, setImgUrl] = useState("");
  const [price, setPrice] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (book != null) {
      setBookName(book.bookname);
      setAuthor(book.author);
      setDesc(book.desc);
      setImgUrl(book.imgurl);
      setPrice(book.price);
    }
    dispatch(getBook(id));
  }, [book]);

  return (
    <div>
      <div className="container  text-center">
        <div className="card mb-3 border-primary" style={{ maxWidth: "540px" }}>
          <div className="row g-0">
            <div className="col-md-4">
              <img src={imgurl} className="img-fluid rounded-start" alt="..." />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{bookname}</h5>
                <p className="card-text">{author}</p>
                <p className="card-text">
                  <small class="text-muted">{desc}</small>
                </p>
                <p className="card-text">₹ {price} /per month</p>
                <Link to="/books/order">
                  <button className="btn btn-primary">Rent Book</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
