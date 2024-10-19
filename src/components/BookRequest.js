import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookRequest = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const adminLogin = localStorage.getItem("adminLogin");
    if (!adminLogin) {
      navigate("/");
      return;
    }
    fetchRequests();
  }, [navigate]);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(
        "https://rentandread.onrender.com/api/getbookrequest"
      );
      setRequests(response.data);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch book requests");
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://rentandread.onrender.com/api/deleterequest/${id}`
      );
      setRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== id)
      );
      toast.success("Book request deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete book request");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#1A936F]"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-[#114B5F] mb-6">
        Books Requested by Users
      </h2>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 text-left text-xs font-semibold text-[#114B5F] uppercase tracking-wider">
                Book Name
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 text-left text-xs font-semibold text-[#114B5F] uppercase tracking-wider">
                Author Name
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 text-left text-xs font-semibold text-[#114B5F] uppercase tracking-wider">
                Book Description
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 text-left text-xs font-semibold text-[#114B5F] uppercase tracking-wider">
                User Email
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 text-left text-xs font-semibold text-[#114B5F] uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <motion.tr
                key={request._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {request.bookname}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {request.authorname}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {request.desc}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {request.email}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition duration-300 ease-in-out"
                    onClick={() => handleDelete(request._id)}
                  >
                    Delete
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default BookRequest;
