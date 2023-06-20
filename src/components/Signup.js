import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import axios from "axios";
export default function SignUp() {
  firebase.initializeApp({
    apiKey: "AIzaSyAik4-IVb4tTeH2Y4EzT0sE1feVWJVyJVQ",
    authDomain: "rentnread-e352c.firebaseapp.com",
    projectId: "rentnread-e352c",
    storageBucket: "rentnread-e352c.appspot.com",
    messagingSenderId: "189587809023",
    appId: "1:189587809023:web:0b9015132b739ed05622ca",
    measurementId: "G-EFZDZEEJTE",
  });
  const auth = firebase.auth();

  function SignInWithGoogle() {
    const navigate = useNavigate();

    const signInWithGoogle = async () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      try {
        const result = await auth.signInWithPopup(provider);
        const user = result.user;
        const uname = user.displayName;
        const nameArray = uname.split(" ");
        const name = nameArray[0];
        const lname = nameArray[1];
        const response = await axios.post(
          "https://rentandread.onrender.com/api/user/signup",
          {
            name: name,
            lname: lname,
            email: user.email,
            provider: "google",
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        );
        if (response.data.error) {
          toast.error(response.data.error);
        } else {
          toast.success(response.data.message);
          navigate("/username", { state: { email: user.email } });
        }
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <div style={{ backgroundColor: "#f2f2f2", padding: "10px" }}>
        <button
          style={{
            backgroundColor: "#dd4b39",
            color: "#fff",
            border: "none",
            padding: "10px",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
          onClick={signInWithGoogle}
        >
          SignUp with Google
        </button>
      </div>
    );
  }

  const [form, setForm] = useState({
    name: "",
    lname: "",
    username: "",
    email: "",
    password: "",
    provider: "local",
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        form.email
      )
    ) {
      toast.error("Invalid Email ID");
      return;
    }

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPerson = { ...form };

    const response = await fetch("http://localhost:5000/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify(newPerson),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success("User Created Successfully");
        }
      });

    setForm({ name: "", lname: "", username: "", email: "", password: "" });
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <div className="container text-center card border-dark shadow">
        <div className="card-header">FILL YOUR DETAILS</div>
        <div className="card-body">
          <form onSubmit={onSubmit}>
            {/* <div className="mb-3 form-group">
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.name}
           placeholder="Enter Your Name"
           onChange={(e) => updateForm({ name: e.target.value })}
         />
       </div> */}
            <div className="row mb-3">
              <div className="col-md-6">
                {/* <label className="labels">Name</label> */}
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="First name"
                  value={form.name}
                  onChange={(e) => updateForm({ name: e.target.value })}
                />
              </div>
              <div className="col-md-6">
                {/* <label className="labels">Surname</label> */}
                <input
                  type="text"
                  className="form-control"
                  value={form.lname}
                  onChange={(e) => updateForm({ lname: e.target.value })}
                  placeholder="Last name"
                />
              </div>
            </div>
            <div className="mb-3 form-group">
              <input
                type="text"
                className="form-control"
                id="username"
                value={form.username}
                placeholder="Enter User Name"
                onChange={(e) => updateForm({ username: e.target.value })}
              />
            </div>
            <div className="mb-3 form-group">
              <input
                type="text"
                className="form-control"
                id="email"
                value={form.email}
                placeholder="Enter your Mail ID"
                onChange={(e) => updateForm({ email: e.target.value })}
              />
            </div>
            <div className="mb-3 form-group">
              <input
                type="password"
                className="form-control"
                id="password"
                value={form.password}
                placeholder="Enter Password"
                onChange={(e) => updateForm({ password: e.target.value })}
              />
            </div>

            <div className="mb-3 form-group">
              <input
                type="submit"
                value="Sign Up"
                className="btn btn-primary"
              />
            </div>
          </form>
          <SignInWithGoogle />
          <h6>
            <Link to="/signin">Already have an account?</Link>
          </h6>

          <ToastContainer />
        </div>
      </div>
    </div>
  );
}
