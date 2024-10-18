import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AllUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const adminLogin = localStorage.getItem("adminLogin");
    if (!adminLogin) {
      navigate("/");
      return;
    }
    fetchUsers();
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://rentandread.onrender.com/api/getusers"
      );
      setUsers(response.data);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch users");
      setIsLoading(false);
    }
  };

  const handleToggleBlocked = async (id, blocked) => {
    try {
      await axios.put(`https://rentandread.onrender.com/api/${id}`, {
        blocked: !blocked,
      });
      fetchUsers();
      toast.success(`User ${blocked ? 'unblocked' : 'blocked'} successfully`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update user status");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://rentandread.onrender.com/api/delete/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      toast.success("User deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete user");
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
      <h2 className="text-3xl font-bold text-[#114B5F] mb-6">All Users</h2>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-[#F3E9D2] text-left text-xs font-semibold text-[#114B5F] uppercase tracking-wider">
                Username
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-[#F3E9D2] text-left text-xs font-semibold text-[#114B5F] uppercase tracking-wider">
                Name
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-[#F3E9D2] text-left text-xs font-semibold text-[#114B5F] uppercase tracking-wider">
                Email
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-[#F3E9D2] text-left text-xs font-semibold text-[#114B5F] uppercase tracking-wider">
                Status
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-[#F3E9D2] text-left text-xs font-semibold text-[#114B5F] uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <motion.tr 
                key={user._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{user.username}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{user.name}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{user.email}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <span className={`relative inline-block px-3 py-1 font-semibold ${user.blocked ? 'text-red-900' : 'text-green-900'} leading-tight`}>
                    <span aria-hidden className={`absolute inset-0 ${user.blocked ? 'bg-red-200' : 'bg-green-200'} opacity-50 rounded-full`}></span>
                    <span className="relative">{user.blocked ? 'Blocked' : 'Active'}</span>
                  </span>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-full ${user.blocked ? 'bg-[#1A936F] hover:bg-[#114B5F]' : 'bg-[#114B5F] hover:bg-[#1A936F]'} text-white transition duration-300 ease-in-out mr-2`}
                    onClick={() => handleToggleBlocked(user._id, user.blocked)}
                  >
                    {user.blocked ? 'Unblock' : 'Block'}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition duration-300 ease-in-out"
                    onClick={() => handleDelete(user._id)}
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

export default AllUsers;