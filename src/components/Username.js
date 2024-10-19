import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { User, Key } from "lucide-react";

export default function Username() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://rentandread.onrender.com/api/user/addusername/${state.email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
          body: JSON.stringify({
            username,
            password,
          }),
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
  }

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
            Complete Your Profile
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please choose a username and password to finish setting up your account.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <div className="relative">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#1A936F] focus:border-[#1A936F] focus:z-10 sm:text-sm"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <User className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#1A936F] focus:border-[#1A936F] focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Key className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#1A936F] hover:bg-[#114B5F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1A936F]"
            >
              Complete Sign Up
            </motion.button>
          </div>
        </form>
      </motion.div>
      <ToastContainer />
    </div>
  );
}