import axios from "axios";
import { motion } from "framer-motion";
import { Loader, ShoppingBag } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = "https://rentandread.onrender.com/api";

export default function Order() {
  const { id: bookId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    addr1: "",
    addr2: "",
    pin: "",
    state: "",
    country: "",
  });

  const [bookData, setBookData] = useState({
    bookname: "",
    authorname: "",
    desc: "",
    imgurl: "",
    price: "",
    ownermail: "",
  });

  const [isLoading, setIsLoading] = useState(true);

  const days = parseInt(searchParams.get("days")) || 30;
  const price = parseInt(searchParams.get("price")) || 49;

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const { username, _id: userId } = user;

  useEffect(() => {
    if (!userId) {
      navigate("/signin");
      return;
    }

    const fetchData = async () => {
      try {
        const [userResponse, bookResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/user/${userId}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }),
          fetch(`${API_BASE_URL}/record/${bookId}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }),
        ]);

        if (!userResponse.ok || !bookResponse.ok) {
          throw new Error(`An error has occurred`);
        }

        const userData = await userResponse.json();
        const bookData = await bookResponse.json();

        const { password, blocked, ...filteredUserData } = userData;

        setFormData(filteredUserData);
        setBookData(bookData);
        setIsLoading(false);
      } catch (error) {
        toast.error(error.message);
        navigate("/");
      }
    };

    fetchData();
  }, [userId, bookId, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_BASE_URL}/stripe/create-checkout-session`,
        {
          form1: bookData,
          form: formData,
          price,
          days,
          userID: userId,
          username,
          bookID: bookId,
        }
      );

      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error(error);
      toast.error("Error creating checkout session");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F3E9D2]">
        <Loader className="w-12 h-12 text-[#1A936F] animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-[#F3E9D2] min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div className="p-6">
            <h2 className="text-3xl font-bold text-[#114B5F] mb-6 flex items-center">
              <ShoppingBag className="mr-2" /> Order Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-[#1A936F] mb-4">
                  Book Information
                </h3>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <img
                    src={bookData.imgurl}
                    alt={bookData.bookname}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <h4 className="text-lg font-semibold text-[#114B5F]">
                    {bookData.bookname}
                  </h4>
                  <p className="text-gray-600">{bookData.authorname}</p>
                  <p className="text-[#1A936F] font-semibold mt-2">
                    Rental Period: {days} days
                  </p>
                  <p className="text-xl font-bold text-[#114B5F] mt-2">
                    ₹ {price}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#1A936F] mb-4">
                  Your Information
                </h3>
                <form onSubmit={handleSubmit}>
                  {Object.entries(formData).map(([key, value]) => (
                    <div className="mb-4" key={key}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </label>
                      <input
                        type="text"
                        name={key}
                        value={value}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A936F]"
                        placeholder={`Enter your ${key}`}
                        required
                      />
                    </div>
                  ))}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="w-full mt-6 px-6 py-3 bg-[#1A936F] text-white rounded-lg hover:bg-[#114B5F] transition duration-300"
                  >
                    Proceed to Payment
                  </motion.button>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <ToastContainer />
    </div>
  );
}
