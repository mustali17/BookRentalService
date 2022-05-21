import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBook } from "../actions/bookaction";
import { useNavigate } from "react-router-dom";
import shortid from "shortid";
export default function AddBook() {
  let history = useNavigate();
  const [bookname, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [imgurl, setImgUrl] = useState("");
  const dispatch = useDispatch();

  function createBook(e) {
    e.preventDefault();
    const new_book = {
      id: shortid.generate(),
      bookname: bookname,
      author: author,
      desc: desc,
      price: price,
      imgurl: imgurl
    };
    dispatch(addBook(new_book));
    history("/books");
  }

  return (
    <div>
      <div className="card border-0 shadow">
        <div className="card-header">Add a Book</div>
        <div className="card-body">
          <form onSubmit={(e) => createBook(e)}>
            <div className="form-group">
              <div className="mb-3">
                <input
                  type="text"
                  onChange={function changename(event) {
                    setBookName(event.target.value);
                  }}
                  className="form-control"
                  placeholder="Enter Book Name"
                  value={bookname}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  onChange={function changephone(event) {
                    setAuthor(event.target.value);
                  }}
                  className="form-control"
                  placeholder="Enter Author Name"
                  value={author}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  onChange={function changename(event) {
                    setDesc(event.target.value);
                  }}
                  className="form-control"
                  placeholder="Enter book description"
                  value={desc}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  onChange={function changename(event) {
                    setPrice(event.target.value);
                  }}
                  className="form-control"
                  placeholder="Enter book Price"
                  value={price}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  onChange={function changename(event) {
                    setImgUrl(event.target.value);
                  }}
                  className="form-control"
                  placeholder="Enter book image url"
                  value={imgurl}
                />
              </div>
              <div className="mb-3">
                <input
                  type="submit"
                  className="btn btn-primary"
                  name="add"
                  value="Add"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
