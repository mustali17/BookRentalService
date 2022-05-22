import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import shortid from "shortid";
import { useNavigate, useParams } from "react-router-dom";
import { cartBook, getBook } from "../actions/bookaction";

export default function EditContact() {
  let { id } = useParams();

  let history = useNavigate();

  const book = useSelector((state) => state.book.book);

  const [bookname, setName] = useState("");
  const [author, setPhone] = useState("");
  const [desc, setEmail] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
     
    dispatch(getBook(id));
  }, [book]);

  return (
    <div>
      <div className="card mb-3" style={{ maxWidth: "540px" }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img src="..." className="img-fluid rounded-start" alt="..." />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{bookname}</h5>
              <p className="card-text">{desc}</p>
              <p className="card-text">
                <small class="text-muted">{author}</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
