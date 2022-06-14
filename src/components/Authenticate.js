import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Authenticate() {
  let history = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  function auth(e) {
    e.preventDefault();
    if (username == "mustali" && password == "admin") {
      history("/addbook");
    } else {
      history("/");
    }
  }

  return (
    <div>
      <h5>Authenticate Your self!!</h5>
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
