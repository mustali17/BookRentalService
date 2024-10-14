import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const bookVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const Record = ({ record, index }) => (
  <motion.div
    className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4"
    variants={bookVariants}
    initial="hidden"
    animate="visible"
    custom={index}
  >
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:shadow-2xl hover:-translate-y-2">
      <div className="relative">
        <img
          src={record.imgurl}
          className="w-full h-64 object-cover"
          alt={record.bookname}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          <p className="text-white text-center px-4">{record.bookname}</p>
        </div>
      </div>
      <div className="p-6">
        <h5 className="text-xl font-bold mb-2 text-gray-800 truncate">
          {record.bookname}
        </h5>
        <h6 className="text-sm text-gray-600 mb-3">{record.authorname}</h6>
        <p className="text-green-600 font-semibold mb-4">₹{record.price}/pm</p>
        {record.onRent ? (
          <p className="text-red-600 mb-3 font-semibold">Out of Stock</p>
        ) : (
          <Link to={`/books/cart/${record._id}`} className="block">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-full transition duration-300 shadow-md hover:shadow-lg"
            >
              Rent Now!
            </motion.button>
          </Link>
        )}
      </div>
    </div>
  </motion.div>
);

export default function RecordList() {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    async function getRecords() {
      const response = await fetch(
        "https://rentandread.onrender.com/api/record"
      );

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText} Please Refresh this page`;
        toast.error(message);
        setIsLoading(false);
        return;
      }

      const records = await response.json();
      setRecords(records);
      setSearchResults(records);
      setIsLoading(false);
    }

    getRecords();
  }, []);

  function searchBooks(event) {
    const query = event.target.value;
    setSearchQuery(query);

    const filteredRecords = records.filter((record) =>
      record.bookname.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredRecords);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h3
          className="text-5xl text-center font-yellowtail mb-12 text-indigo-800"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Discover Your Next Read
        </motion.h3>
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="relative w-full max-w-xl">
            <input
              type="search"
              value={searchQuery}
              onChange={searchBooks}
              placeholder="Search for your favorite books..."
              className="w-full pr-12 pl-6 py-4 rounded-full bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 placeholder-gray-500 text-lg"
            />
            <svg
              className="absolute right-4 inset-y-0 my-auto h-6 w-6 text-indigo-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <motion.div
              className="h-16 w-16 border-t-4 border-indigo-600 border-solid rounded-full animate-spin"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        ) : searchResults.length > 0 ? (
          <AnimatePresence>
            <div className="flex flex-wrap -mx-4">
              {searchResults.map((record, index) => (
                <Record record={record} key={record._id} index={index} />
              ))}
            </div>
          </AnimatePresence>
        ) : (
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-3xl mb-6 text-indigo-800 font-semibold">
              Oops! No books found.
            </p>
            <p className="text-xl mb-8 text-indigo-700">
              Can't find what you're looking for? Let us know and we'll try to
              get it for you!
            </p>
            <Link
              to="/requestbook"
              className="inline-block bg-indigo-600 text-white hover:bg-indigo-700 py-3 px-8 rounded-full font-semibold transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Request a Book
            </Link>
            <motion.div
              className="mt-12 flex justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <img
                src={require("../2672266-removebg-preview.png")}
                alt="No books found"
                className="max-w-full h-auto filter drop-shadow-xl"
              />
            </motion.div>
          </motion.div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
