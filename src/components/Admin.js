import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [records, setRecords] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://rentandread.onrender.com/api/admin"
        );
        const result = await response.json();
        setRecords(result);
      } catch (error) {
        console.error("Error fetching admin data:", error);
        toast.error("Failed to load admin data");
      }
    };
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      username === records[0]?.username &&
      password === records[0]?.password
    ) {
      localStorage.setItem("adminLogin", "true");
      navigate("/adminpage");
    } else {
      toast.error("Invalid Credentials");
      setUsername("");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-xl overflow-hidden max-w-md w-full"
      >
        <div className="bg-[#1A936F] text-white text-center py-4">
          <h2 className="text-2xl font-bold">Admin Login</h2>
        </div>
        <div className="p-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-[#114B5F] mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A936F]"
                placeholder="Enter Username"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#114B5F] mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A936F]"
                placeholder="Enter Password"
                required
              />
            </div>
            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-6 py-2 bg-[#1A936F] text-white rounded-full hover:bg-[#114B5F] transition duration-300"
              >
                Login
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
      <ToastContainer />
    </div>
  );
}
