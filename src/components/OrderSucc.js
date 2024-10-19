import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";

export default function OrderSucc() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-xl overflow-hidden max-w-md w-full"
      >
        <div className="p-8">
          <div className="mx-auto w-24 h-24 bg-[#1A936F] rounded-full flex items-center justify-center mb-6">
            <svg
              className="w-16 h-16 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-[#114B5F] text-center mb-4">
            Success
          </h2>
          <p className="text-lg text-[#114B5F] text-center mb-6">
            We received your purchase request;
            <br /> we'll be in touch shortly!
          </p>
          <p className="text-sm text-[#114B5F] text-center mb-6">
            Check Profile section to know your order status.
          </p>
          <div className="flex justify-center">
            <Link to="/profile">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-[#1A936F] text-white rounded-full hover:bg-[#114B5F] transition duration-300"
              >
                My Profile
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
