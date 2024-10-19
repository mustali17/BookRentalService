import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyOrder from "./MyOrder";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser) {
        toast.error("You must be logged in!");
        navigate("/signin");
        return;
      }

      try {
        const response = await fetch(
          `https://rentandread.onrender.com/api/user/${storedUser._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await response.json();
        setUser(userData);
        setForm(userData);
        setIsLoading(false);
      } catch (error) {
        toast.error("An error occurred while fetching data");
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://rentandread.onrender.com/api/user/update/${user._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      setUser(form);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#114B5F]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 text-[#114B5F] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Avatar */}
              <div className="flex flex-col items-center md:order-2">
                <div className="w-40 h-40 bg-[#88D498] rounded-full flex items-center justify-center text-5xl font-bold text-white shadow-lg">
                  {user.name.charAt(0)}
                </div>
                <p className="mt-4 text-2xl font-semibold text-[#114B5F]">
                  {user.name} {user.lname}
                </p>
                <p className="text-[#1A936F]">{user.email}</p>
              </div>

              {/* Profile Information */}
              <div className="md:col-span-2 md:order-1">
                <h2 className="text-4xl font-bold mb-8 text-[#114B5F]">
                  Profile Information
                </h2>
                {isEditing ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-[#114B5F] mb-1"
                        >
                          First Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={form.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-[#C6DABF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#88D498] focus:border-[#88D498] transition duration-150 ease-in-out"
                          placeholder="First Name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="lname"
                          className="block text-sm font-medium text-[#114B5F] mb-1"
                        >
                          Last Name
                        </label>
                        <input
                          id="lname"
                          name="lname"
                          type="text"
                          value={form.lname}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-[#C6DABF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#88D498] focus:border-[#88D498] transition duration-150 ease-in-out"
                          placeholder="Last Name"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-[#114B5F] mb-1"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-[#C6DABF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#88D498] focus:border-[#88D498] transition duration-150 ease-in-out"
                        placeholder="Email"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-[#114B5F] mb-1"
                      >
                        Phone
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-[#C6DABF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#88D498] focus:border-[#88D498] transition duration-150 ease-in-out"
                        placeholder="Phone"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="addr1"
                        className="block text-sm font-medium text-[#114B5F] mb-1"
                      >
                        Address Line 1
                      </label>
                      <input
                        id="addr1"
                        name="addr1"
                        type="text"
                        value={form.addr1}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-[#C6DABF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#88D498] focus:border-[#88D498] transition duration-150 ease-in-out"
                        placeholder="Address Line 1"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="addr2"
                        className="block text-sm font-medium text-[#114B5F] mb-1"
                      >
                        Address Line 2
                      </label>
                      <input
                        id="addr2"
                        name="addr2"
                        type="text"
                        value={form.addr2}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-[#C6DABF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#88D498] focus:border-[#88D498] transition duration-150 ease-in-out"
                        placeholder="Address Line 2"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label
                          htmlFor="pin"
                          className="block text-sm font-medium text-[#114B5F] mb-1"
                        >
                          PIN Code
                        </label>
                        <input
                          id="pin"
                          name="pin"
                          type="text"
                          value={form.pin}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-[#C6DABF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#88D498] focus:border-[#88D498] transition duration-150 ease-in-out"
                          placeholder="PIN Code"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="state"
                          className="block text-sm font-medium text-[#114B5F] mb-1"
                        >
                          State
                        </label>
                        <input
                          id="state"
                          name="state"
                          type="text"
                          value={form.state}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-[#C6DABF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#88D498] focus:border-[#88D498] transition duration-150 ease-in-out"
                          placeholder="State"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium text-[#114B5F] mb-1"
                        >
                          Country
                        </label>
                        <input
                          id="country"
                          name="country"
                          type="text"
                          value={form.country}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-[#C6DABF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#88D498] focus:border-[#88D498] transition duration-150 ease-in-out"
                          placeholder="Country"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-4">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-6 py-2 text-sm font-medium text-[#114B5F] bg-[#C6DABF] rounded-md hover:bg-[#88D498] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#88D498] transition duration-150 ease-in-out"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 text-sm font-medium text-white bg-[#1A936F] rounded-md hover:bg-[#114B5F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1A936F] transition duration-150 ease-in-out"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6 text-lg"
                  >
                    <p>
                      <span className="font-semibold text-[#1A936F]">
                        Name:
                      </span>{" "}
                      <span className="text-[#114B5F]">
                        {user.name} {user.lname}
                      </span>
                    </p>
                    <p>
                      <span className="font-semibold text-[#1A936F]">
                        Email:
                      </span>{" "}
                      <span className="text-[#114B5F]">{user.email}</span>
                    </p>
                    <p>
                      <span className="font-semibold text-[#1A936F]">
                        Phone:
                      </span>{" "}
                      <span className="text-[#114B5F]">{user.phone}</span>
                    </p>
                    <p>
                      <span className="font-semibold text-[#1A936F]">
                        Address:
                      </span>{" "}
                      <span className="text-[#114B5F]">
                        {user.addr1}, {user.addr2}
                      </span>
                    </p>
                    <p>
                      <span className="font-semibold text-[#1A936F]">
                        PIN Code:
                      </span>{" "}
                      <span className="text-[#114B5F]">{user.pin}</span>
                    </p>
                    <p>
                      <span className="font-semibold text-[#1A936F]">
                        State:
                      </span>{" "}
                      <span className="text-[#114B5F]">{user.state}</span>
                    </p>
                    <p>
                      <span className="font-semibold text-[#1A936F]">
                        Country:
                      </span>{" "}
                      <span className="text-[#114B5F]">{user.country}</span>
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsEditing(true)}
                      className="px-6 py-2 text-sm font-medium text-white bg-[#1A936F] rounded-md hover:bg-[#114B5F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1A936F] transition duration-150 ease-in-out"
                    >
                      Edit Profile
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* My Orders */}
        <div className="mt-12">
          <MyOrder />
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Profile;
