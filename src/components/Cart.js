import { motion } from "framer-motion";
import { Loader, Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function BookDetails() {
  const [isLoading, setIsLoading] = useState(true);
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [selectedDays, setSelectedDays] = useState(30);
  const [price, setPrice] = useState(49);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const bookResponse = await fetch(
          `https://rentandread.onrender.com/api/record/${params.id}`
        );
        const reviewResponse = await fetch(
          `https://rentandread.onrender.com/api/review/${params.id}`
        );

        if (!bookResponse.ok || !reviewResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const bookData = await bookResponse.json();
        const reviewData = await reviewResponse.json();

        setBook(bookData);
        setReviews(reviewData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        navigate("/");
      }
    }

    fetchData();
  }, [params.id, navigate]);

  const handleDaysChange = (event) => {
    const days = parseInt(event.target.value);
    setSelectedDays(days);
    setPrice(days === 30 ? 49 : days === 60 ? 99 : 199);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100">
        <Loader className="w-12 h-12 text-[#1A936F] animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Book Details Section */}
          <div className="md:w-2/3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 p-4">
                  <img
                    src={book.imgurl}
                    alt={book.bookname}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <h2 className="text-3xl font-bold text-[#114B5F] mb-2">
                    {book.bookname}
                  </h2>
                  <h3 className="text-xl text-[#1A936F] mb-4">
                    {book.authorname}
                  </h3>
                  <p className="text-gray-600 mb-6">{book.desc}</p>
                  <div className="mb-6">
                    <label
                      htmlFor="days"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Rent for
                    </label>
                    <select
                      id="days"
                      value={selectedDays}
                      onChange={handleDaysChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A936F]"
                    >
                      <option value={30}>30 Days</option>
                      <option value={60}>60 Days</option>
                      <option value={90}>90 Days</option>
                    </select>
                  </div>
                  <p className="text-2xl font-bold text-[#114B5F] mb-4">
                    ₹ {price}
                  </p>
                  <Link
                    to={`/books/order/${params.id}?days=${selectedDays}&price=${price}`}
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full px-6 py-3 bg-[#1A936F] text-white rounded-lg hover:bg-[#114B5F] transition duration-300"
                    >
                      Rent Book
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Reviews Section */}
          <div className="md:w-1/3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h3 className="text-2xl font-bold text-[#114B5F] mb-6">
                Reviews
              </h3>
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <div
                    key={review._id}
                    className="mb-6 pb-6 border-b border-gray-200 last:border-b-0"
                  >
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 bg-[#1A936F] rounded-full flex items-center justify-center text-white font-bold mr-3">
                        {review.username.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#114B5F]">
                          {review.username}
                        </h4>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                              fill={i < review.rating ? "currentColor" : "none"}
                            />
                          ))}
                          <span className="ml-2 text-sm text-gray-600">
                            {review.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600">{review.review}</p>
                  </div>
                ))
              ) : (
                <div className="text-center">
                  <p className="text-gray-600 mb-4">No reviews available</p>
                  <img
                    src={require("../5385893-removebg-preview.png")}
                    alt="No reviews"
                    className="mx-auto w-3/4 h-auto rounded-lg"
                  />
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
