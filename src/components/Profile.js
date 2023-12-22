import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyOrder from "./MyOrder";
import Avatar from "react-avatar";

export default function Profile() {
  var userID;
  const [isLoading, setIsLoading] = useState(true);
  //   if(localStorage.length>0){
  //     const user=JSON.parse(localStorage.getItem("user"));
  //     userID=user._id;
  //   }else{
  // console.log("empty");
  // console.log("dcerj");
  //   }
  const params = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    lname: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    addr1: "",
    addr2: "",
    pin: "",
    state: "",
    country: "",
    userID: userID,
  });

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      userID = user._id;
    } else {
      console.log("empty");
      console.log("dcerj");
    }
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
        toast.error("You must be logged in!");
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
      setIsLoading(false);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  async function onSubmit(e) {
    e.preventDefault();

    const newPerson = { ...form };

    const response = await fetch(
      `http://rentandread.centralindia.cloudapp.azure.com:5000/api/user/update/${userID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify(newPerson),
      }
    ).catch((error) => {
      toast.error(error);
      return;
    });
    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      toast.error(message);
      return;
    }

    setForm({
      bookname: "",
      authorname: "",
      desc: "",
      price: "",
      imgurl: "",
      ownermail: "",
    });
    //  navigate("/");
  }

  return (
    <>
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
      ) : (
        <div className="container rounded bg-white mt-5 mb-5">
          <div className="row">
            <div className="col-md-3 border-right">
              <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                <Avatar
                  className="rounded-circle mt-5"
                  name={form.name}
                  size={130}
                />
                <br />
                <br />
                <span className="font-weight-bold">{form.name}</span>
                <span className="text-black-50">{form.email}</span>
                <span> </span>
              </div>
            </div>
            <div className="col-md-5 border-right">
              <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="text-right">Profile Settings</h4>
                </div>
                <div className="row mt-2">
                  <div className="col-md-6">
                    <label className="labels">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First name"
                      value={form.name}
                      onChange={(e) => updateForm({ name: e.target.value })}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="labels">Surname</label>
                    <input
                      type="text"
                      className="form-control"
                      value={form.lname}
                      onChange={(e) => updateForm({ lname: e.target.value })}
                      placeholder="Last name"
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <label className="labels">Mobile Number</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="enter phone number"
                      value={form.phone}
                      onChange={(e) => updateForm({ phone: e.target.value })}
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="labels">Address Line 1</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="enter address line 1"
                      value={form.addr1}
                      onChange={(e) => updateForm({ addr1: e.target.value })}
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="labels">Address Line 2</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="enter address line 2"
                      value={form.addr2}
                      onChange={(e) => updateForm({ addr2: e.target.value })}
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="labels">Postcode</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="enter address line 2"
                      value={form.pin}
                      onChange={(e) => updateForm({ pin: e.target.value })}
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="labels">Email ID</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="enter email id"
                      onChange={(e) => updateForm({ email: e.target.value })}
                      value={form.email}
                    />
                  </div>
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
                  <button
                    className="btn btn-primary profile-button"
                    type="button"
                    onClick={onSubmit}
                  >
                    Save Profile
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3 py-5">
                <MyOrder />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
