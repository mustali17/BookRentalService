import axios from "axios";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUp() {
  const [form, setForm] = useState({
    name: "",
    lname: "",
    username: "",
    email: "",
    password: "",
    provider: "local",
  });

  const navigate = useNavigate();

  const updateForm = (value) => {
    setForm((prev) => ({ ...prev, ...value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(form.email)) {
      toast.error("Invalid Email ID");
      return;
    }

    try {
      const response = await fetch(
        "https://rentandread.onrender.com/api/user/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("User Created Successfully");
        navigate("/signin");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }

    setForm({ name: "", lname: "", username: "", email: "", password: "" });
  };

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const result = await firebase.auth().signInWithPopup(provider);
      const user = result.user;
      const [name, lname] = user.displayName.split(" ");

      const response = await axios.post(
        "https://rentandread.onrender.com/api/user/signup",
        {
          name,
          lname,
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
      toast.error("Google Sign Up failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-md"
      >
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[#114B5F]">
            Sign up for an account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="flex gap-4 mb-4">
              <div>
                <label htmlFor="name" className="sr-only">
                  First name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#1A936F] focus:border-[#1A936F] focus:z-10 sm:text-sm"
                  placeholder="First name"
                  value={form.name}
                  onChange={(e) => updateForm({ name: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="lname" className="sr-only">
                  Last name
                </label>
                <input
                  id="lname"
                  name="lname"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#1A936F] focus:border-[#1A936F] focus:z-10 sm:text-sm"
                  placeholder="Last name"
                  value={form.lname}
                  onChange={(e) => updateForm({ lname: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#1A936F] focus:border-[#1A936F] focus:z-10 sm:text-sm"
                placeholder="Username"
                value={form.username}
                onChange={(e) => updateForm({ username: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#1A936F] focus:border-[#1A936F] focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={form.email}
                onChange={(e) => updateForm({ email: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#1A936F] focus:border-[#1A936F] focus:z-10 sm:text-sm"
                placeholder="Password"
                value={form.password}
                onChange={(e) => updateForm({ password: e.target.value })}
              />
            </div>
          </div>

          <div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#1A936F] hover:bg-[#114B5F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1A936F]"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <User
                  className="h-5 w-5 text-[#114B5F] group-hover:text-[#1A936F]"
                  aria-hidden="true"
                />
              </span>
              Sign up
            </motion.button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={signInWithGoogle}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1A936F]"
            >
              {/* <Google className="h-5 w-5 mr-2" /> */}
              Sign up with Google
            </motion.button>
          </div>
        </div>

        <div className="text-sm text-center">
          <Link
            to="/signin"
            className="font-medium text-[#1A936F] hover:text-[#114B5F]"
          >
            Already have an account? Sign in
          </Link>
        </div>
      </motion.div>
      <ToastContainer />
    </div>
  );
}
