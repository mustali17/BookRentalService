import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Logout() {
  const navigate = useNavigate();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    localStorage.clear();
    navigate("/");
    window.location.reload();
  }

  return (
    <div className="min-h-screen bg-[#F3E9D2] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-xl rounded-lg overflow-hidden w-full max-w-md"
      >
        <div className="bg-[#1A936F] text-white text-center py-4">
          <h2 className="text-2xl font-bold">LOGOUT</h2>
        </div>
        <div className="p-8">
          <form onSubmit={onSubmit}>
            <div className="text-center mb-6">
              <span className="text-6xl text-[#114B5F]">!</span>
              <p className="mt-4 text-lg text-[#114B5F]">Are you sure you want to logout?</p>
            </div>
            <div className="flex justify-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-6 py-2 bg-[#1A936F] text-white rounded-md hover:bg-[#114B5F] transition duration-300"
              >
                Logout
              </motion.button>
              <Link to="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  className="px-6 py-2 bg-[#C6DABF] text-[#114B5F] rounded-md hover:bg-[#88D498] transition duration-300"
                >
                  Cancel
                </motion.button>
              </Link>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}