import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Username() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();
  async function onSignUp(e) {
    e.preventDefault();
    const response = await fetch(
      `http://rentandread.centralindia.cloudapp.azure.com:5000/api/user/addusername/${state.email}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success("User Created Successfully");
          navigate("/signin");
        }
      });
  }
  return (
    <div>
      <ToastContainer />

      <div
        className="container text-center card border-dark shadow"
        style={{ width: "25rem" }}
      >
        <div className="card-header">Enter Username and password</div>
        <div className="card-body">
          <form onSubmit={onSignUp}>
            <div className="mb-3 form-group">
              <input
                type="text"
                className="form-control"
                id="email"
                placeholder="Enter Your Username"
                onChange={function changename(event) {
                  setUsername(event.target.value);
                }}
                value={username}
              />
            </div>
            <div className="mb-3 form-group">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter Your Password"
                onChange={function changename(event) {
                  setPassword(event.target.value);
                }}
                value={password}
              />
            </div>
            <div className="mb-3 form-group">
              <input type="submit" value="Submit" className="btn btn-primary" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
