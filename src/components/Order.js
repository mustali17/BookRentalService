import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Checkout from "./Checkout";
import axios from "axios";

export default function Order() {
  const params = useParams();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const days = parseInt(searchParams.get("days")) || 30;
  const price = parseInt(searchParams.get("price")) || 49;
  // const [name, setName] = useState("");
  // const [number, setNumber] = useState("");
  // const [address, setAddress] = useState("");
  // const [emailid, setEmailId] = useState("");
  // const [pincode, setPincode] = useState("");
  const [form1, setForm1] = useState({
    bookname: "",
    authorname: "",
    desc: "",
    imgurl: "",
    price: "",
    ownermail: "",
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    addr1: "",
    addr2: "",
    pin: "",
    state: "",
    country: "",
  });
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }
  var userID;
  var username;
  if (localStorage.getItem("user")) {
    const user = JSON.parse(localStorage.getItem("user"));
    username = user.username;
    userID = user._id;
  } else {
    navigate("/signin");
  }

  useEffect(() => {
    async function fetchData() {
      // const id = params.id.toString();
      const response = await fetch(
        `http://rentandread.centralindia.cloudapp.azure.com:5000/api/user/${userID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      );

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        toast.error(message);
        navigate("/signin");
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(record);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(
        `http://rentandread.centralindia.cloudapp.azure.com:5000/api/record/${params.id.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      );

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        toast.error(message);
        navigate("/signin");
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm1(record);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  // const book = useSelector((state) => state.book.book);
  var name = form.name;
  var phone = form.phone;
  var email = form.email;
  var addr1 = form.addr1;
  var addr2 = form.addr2;
  var pin = form.pin;
  var state = form.state;
  var country = form.country;
  var bookname = form1.bookname;
  var imgurl = form1.imgurl;
  // var price = form1.price;
  var bookID = params.id;
  async function onSubmit(e) {
    e.preventDefault();
    axios
      .post(
        "http://rentandread.centralindia.cloudapp.azure.com:5000/api/stripe/create-checkout-session",
        {
          form1,
          form,
          price: price,
          days: days,
          userID: userID,
          username: username,
          bookID: bookID,
        }
      )
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  }

  //  navigate("/");

  return (
    <div>
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="card-header text-center">Enter Your Details</div>

        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <div className="mb-3">
                <label className="labels">Name</label>
                <input
                  type="text"
                  onChange={(e) => updateForm({ name: e.target.value })}
                  className="form-control"
                  placeholder="Enter your Name"
                  value={form.name}
                />
              </div>
              <div className="mb-3">
                <label className="labels">Phone Number</label>
                <input
                  type="text"
                  onChange={(e) => updateForm({ phone: e.target.value })}
                  className="form-control"
                  placeholder="Enter your Phone Number"
                  value={form.phone}
                />
              </div>
              <div className="mb-3">
                <label className="labels">Email ID</label>
                <input
                  type="text"
                  onChange={(e) => updateForm({ email: e.target.value })}
                  className="form-control"
                  placeholder="Enter your Email Id"
                  value={form.email}
                />
              </div>
              <div className="mb-3">
                <label className="labels">Address line 1</label>
                <input
                  type="text"
                  onChange={(e) => updateForm({ addr1: e.target.value })}
                  className="form-control"
                  placeholder="Address line 1"
                  value={form.addr1}
                />
              </div>
              <div className="mb-3">
                <label className="labels">Address line 2</label>
                <input
                  type="text"
                  onChange={(e) => updateForm({ addr2: e.target.value })}
                  className="form-control"
                  placeholder="Address line 2"
                  value={form.addr2}
                />
              </div>
              <div className="mb-3">
                <label className="labels">Pincode</label>
                <input
                  type="text"
                  onChange={(e) => updateForm({ pin: e.target.value })}
                  className="form-control"
                  placeholder="Enter your Pincode"
                  value={form.pin}
                />
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <label className="labels">Country</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="country"
                    value={form.country}
                    onChange={(e) => updateForm({ country: e.target.value })}
                  />
                </div>
                <div className="col-md-6">
                  <label className="labels">State/Region</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form.state}
                    onChange={(e) => updateForm({ state: e.target.value })}
                    placeholder="state"
                  />
                </div>
              </div>

              <div className="mt-5 text-center">
                <input
                  type="submit"
                  className="btn btn-primary"
                  name="login"
                  value="Checkout"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
      <br />
      <br />
    </div>
  );
}
