import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const adminLogin = localStorage.getItem("adminLogin");
    if (!adminLogin) {
      navigate("/");
      return;
    }
  }, [navigate]);

  const adminCards = [
    {
      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
      title: "All Orders",
      description: "View all orders placed by users.",
      link: "/allorders",
      linkText: "Go to Orders",
    },
    {
      icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
      title: "All Users",
      description: "Manage and view user accounts.",
      link: "/admin/all-users",
      linkText: "Go to Users",
    },
    {
      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
      title: "Book Requests",
      description: "Manage book requests from users.",
      link: "/admin/book-request",
      linkText: "Go to Requests",
    },
    {
      icon: "M12 6v6m0 0v6m0-6h6m-6 0H6",
      title: "Add Book",
      description: "Add a new book to the inventory.",
      link: "/addbook",
      linkText: "Add Book",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-[#114B5F] mb-12">
          Admin Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {adminCards.map((card, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-center mb-4">
                  <svg
                    className="h-12 w-12 text-[#1A936F]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={card.icon}
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-[#114B5F] text-center mb-2">
                  {card.title}
                </h2>
                <p className="text-[#114B5F] text-center mb-4">
                  {card.description}
                </p>
                <Link
                  to={card.link}
                  className="block w-full text-center px-4 py-2 border border-transparent text-sm font-medium  rounded-md text-white bg-[#1A936F] hover:bg-[#114B5F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1A936F] transition duration-150 ease-in-out"
                >
                  {card.linkText}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
