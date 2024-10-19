import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Thanks for contacting us!");
  };

  return (
    <div className="bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 text-[#114B5F] min-h-screen py-20">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold mb-8 text-center"
        >
          Contact Us
        </motion.h1>

        <p className="text-xl text-center mb-12 max-w-2xl mx-auto">
          Have questions about our book rental service? We're here to help!
          Reach out to us, and our team will get back to you promptly.
        </p>

        <div className="flex flex-col md:flex-row items-start justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <div className="relative">
              <motion.div
                initial={{ rotate: 0 }}
                whileHover={{ rotate: -5 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 bg-white p-4 rounded-lg shadow-lg"
              >
                <img
                  src={require("../5127314-removebg-preview.png")}
                  alt="Contact Us illustration"
                  className="w-full h-auto rounded-lg"
                />
              </motion.div>
              <div
                className="absolute top-4 left-4 w-full h-full bg-[#1A936F] rounded-lg"
                style={{ zIndex: 1 }}
              ></div>
            </div>

            <div className="mt-12 space-y-6 bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <Mail className="text-[#1A936F] mr-4" size={24} />
                <span className="text-lg">contact@rentandread.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="text-[#1A936F] mr-4" size={24} />
                <span className="text-lg">(123) 456-7890</span>
              </div>
              <div className="flex items-center">
                <MapPin className="text-[#1A936F] mr-4" size={24} />
                <span className="text-lg">
                  123 Book Street, Reading City, RC 12345
                </span>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="md:w-1/2 bg-white rounded-lg shadow-md p-8"
          >
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A936F]"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A936F]"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="subject"
                className="block text-sm font-medium mb-2"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A936F]"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A936F]"
                required
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full px-6 py-3 text-lg bg-[#1A936F] text-white rounded-lg hover:bg-[#114B5F] transition duration-300"
            >
              Send Message
            </motion.button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
