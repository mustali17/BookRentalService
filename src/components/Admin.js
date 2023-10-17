import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function admin() {
  let history = useNavigate();
  const [records, setRecords] = useState({});
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    // Fetch data from backend API and set it to the state
    const fetchData = async () => {
      const response = await fetch(
        "https://rentandread.onrender.com/api/admin"
      );
      const result = await response.json();
      setRecords(result);
      
    };
    fetchData();
  }, []);
  function auth(e) {
    e.preventDefault();
    if (username == records[0].username && password == records[0].password) {
      localStorage.setItem("adminLogin", true);
      history("/adminpage");
    } else {
      toast.error("Invalid Credentials");
      setUserName("");
      setPassword("");
    }
  }

  return (
    <div>
      <ToastContainer />
      <h3 style={{ textAlign: "center", fontFamily: "yellowtail" }}>
        Authenticate Your self!
      </h3>
      <div
        className="container card border-info shadow text-center"
        style={{ width: "25rem" }}
      >
        <div className="card-header">Login</div>
        <div className="card-body">
          <form onSubmit={(e) => auth(e)}>
            <div className="form-group">
              <div className="mb-3">
                <input
                  type="text"
                  onChange={function changename(event) {
                    setUserName(event.target.value);
                  }}
                  className="form-control"
                  placeholder="Enter User Name"
                  value={username}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  onChange={function changename(event) {
                    setPassword(event.target.value);
                  }}
                  className="form-control"
                  placeholder="Enter Password"
                  value={password}
                />
              </div>
              <div className="mb-3">
                <input
                  type="submit"
                  className="btn btn-primary"
                  name="login"
                  value="Login"
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
