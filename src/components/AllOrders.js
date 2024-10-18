import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AllOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const adminLogin = localStorage.getItem("adminLogin");
    if (!adminLogin) {
      toast.error("You are not authorized to access this page.");
      navigate("/");
      return;
    }
    fetchOrders();
  }, [navigate]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "https://rentandread.onrender.com/api/order",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      );
      setOrders(response.data);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch orders");
      setIsLoading(false);
      if (err.response && err.response.status === 401) {
        navigate("/signin");
      }
    }
  };

  const handleBookDelivered = async (orderId) => {
    try {
      await axios.put(
        `https://rentandread.onrender.com/api/bookdelivered/${orderId}`,
        { bookDelivered: true },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      );
      toast.success("Book Delivered successfully!");
      fetchOrders();
    } catch (err) {
      console.error(err);
      toast.error("Failed to deliver book!");
    }
  };

  const handleBookReceived = async (orderId, bookId) => {
    try {
      await axios.put(
        `https://rentandread.onrender.com/api/bookrecieved/${orderId}/${bookId}`,
        { bookReturend: true },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      );
      toast.success("Book Received successfully!");
      fetchOrders();
    } catch (err) {
      console.error(err);
      toast.error("Failed to receive book!");
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
      <h2 className="text-3xl font-bold text-[#114B5F] mb-6">All Orders</h2>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-[#F3E9D2] text-left text-xs font-semibold text-[#114B5F] uppercase tracking-wider">
                Book
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-[#F3E9D2] text-left text-xs font-semibold text-[#114B5F] uppercase tracking-wider">
                Customer
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-[#F3E9D2] text-left text-xs font-semibold text-[#114B5F] uppercase tracking-wider">
                Price
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-[#F3E9D2] text-left text-xs font-semibold text-[#114B5F] uppercase tracking-wider">
                Dates
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-[#F3E9D2] text-left text-xs font-semibold text-[#114B5F] uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <motion.tr
                key={order._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10">
                      <img className="w-full h-full rounded-full" src={order.imgurl} alt={order.bookname} />
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-900 whitespace-no-wrap">{order.bookname}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{order.name}</p>
                  <p className="text-gray-600 whitespace-no-wrap">{order.email}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">₹{order.price}/-</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">Order: {order.FDate}</p>
                  <p className="text-gray-600 whitespace-no-wrap">Return: {order.RDate}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {order.bookDelivered ? (
                    <>
                      {order.bookReturend ? (
                        <span className="text-green-600 font-semibold">Book Returned!</span>
                      ) : (
                        <>
                          <p>
                            Return Request:{" "}
                            {order.returnRequest ? (
                              <span className="text-green-600 font-semibold">Yes</span>
                            ) : (
                              <span className="text-red-600 font-semibold">No</span>
                            )}
                          </p>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-2 px-4 py-2 rounded-full bg-[#114B5F] hover:bg-[#1A936F] text-white transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={!order.returnRequest}
                            onClick={() => handleBookReceived(order._id, order.bookID)}
                          >
                            Book Received
                          </motion.button>
                        </>
                      )}
                    </>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 rounded-full bg-[#1A936F] hover:bg-[#114B5F] text-white transition duration-300 ease-in-out"
                      onClick={() => handleBookDelivered(order._id)}
                    >
                      Book Delivered
                    </motion.button>
                  )}
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

export default AllOrders;