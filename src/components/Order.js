import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Order() {
  let history = useNavigate();

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [emailid, setEmailId] = useState("");
  const [pincode, setPincode] = useState("");

  const book = useSelector((state) => state.book.book);

  function auth(e) {
    e.preventDefault();
    var mailid = book.ownermail;
    var bookname = book.bookname;
    var body =
      "You just got a order for your book " +
      bookname +
      "from " +
      name +
      ".\nFollowing are the details of your coustomer:\nCoustomer Name: " +
      name +
      "\nPhone Number: " +
      number +
      "\nCustomer Address: " +
      address +
      "\nPincode: " +
      pincode +
      "\nCustomer mailid: " +
      emailid;
    var link =
      "mailto:" +
      mailid +
      "?cc=admin@rentandread.com" +
      "&subject=" +
      encodeURIComponent("Order for " + bookname) +
      "&body=" +
      encodeURIComponent(body);
    window.location.href = link;
    history("/sucess");
  }
  return (
    <div>
      <div
        className="container card border-info shadow text-center"
        style={{ maxWidth: "25rem", minWidth: "10rem" }}
      >
        <div className="card-header">Enter Your Details</div>

        <div className="card-body">
          <form onSubmit={(e) => auth(e)}>
            <div className="form-group">
              <div className="mb-3">
                <input
                  type="text"
                  onChange={function changename(event) {
                    setName(event.target.value);
                  }}
                  className="form-control"
                  placeholder="Enter your Name"
                  value={name}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  onChange={function changename(event) {
                    setNumber(event.target.value);
                  }}
                  className="form-control"
                  placeholder="Enter your Phone Number"
                  value={number}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  onChange={function changename(event) {
                    setEmailId(event.target.value);
                  }}
                  className="form-control"
                  placeholder="Enter your Email Id"
                  value={emailid}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  onChange={function changename(event) {
                    setAddress(event.target.value);
                  }}
                  className="form-control"
                  placeholder="Enter your Address"
                  value={address}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  onChange={function changename(event) {
                    setPincode(event.target.value);
                  }}
                  className="form-control"
                  placeholder="Enter your Pincode"
                  value={pincode}
                />
              </div>

              <div className="mb-3">
                <input
                  type="submit"
                  className="btn btn-primary"
                  name="login"
                  value="Submit"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}
