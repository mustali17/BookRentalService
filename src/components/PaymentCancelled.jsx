import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function PaymentCancelled() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookId, setBookId] = useState(null);

  useEffect(() => {
    // Extract the book ID from the URL if it's not in the route params
    if (!id) {
      const urlParams = new URLSearchParams(window.location.search);
      const bookIdFromUrl = urlParams.get('bookID');
      setBookId(bookIdFromUrl);
    } else {
      setBookId(id);
    }
  }, [id]);

  const handleReturnToCart = () => {
    if (bookId) {
      navigate(`/books/cart/${bookId}`);
    } else {
      // Fallback to the main cart if no book ID is available
      navigate('/books/cart');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-xl overflow-hidden max-w-md w-full"
      >
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center"
            >
              <svg className="w-16 h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.div>
          </div>
          <h2 className="text-3xl font-bold text-[#114B5F] text-center mb-4">Payment Cancelled</h2>
          <p className="text-lg text-[#114B5F] text-center mb-6">
            Your payment has been cancelled. No charges have been made to your account.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReturnToCart}
              className="w-full sm:w-auto px-6 py-2 bg-[#1A936F] text-white rounded-full hover:bg-[#114B5F] transition duration-300"
            >
              Return to Cart
            </motion.button>
            <Link to="/checkout">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-6 py-2 bg-[#114B5F] text-white rounded-full hover:bg-[#1A936F] transition duration-300"
              >
                Try Again
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}