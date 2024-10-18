import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

const StarRating = ({ rating, onRatingChange }) => {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-8 h-8 cursor-pointer ${
            star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          onClick={() => onRatingChange(star)}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
};

const Record = ({ record, onReturnRequest }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleReturnRequest = async () => {
    try {
      await onReturnRequest(record._id, record.bookID, rating, review);
      setIsModalOpen(false);
    } catch (error) {
      toast.error('Failed to process return request');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md overflow-hidden mb-6"
    >
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img
            className="h-48 w-full object-cover md:w-48"
            src={record.imgurl}
            alt={record.bookname}
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-[#1A936F] font-semibold">
            {record.bookname}
          </div>
          <p className="mt-2 text-[#114B5F]">Order Date: {new Date(record.FDate).toLocaleDateString()}</p>
          <p className="mt-2 text-[#114B5F]">Return Due: {new Date(record.RDate).toLocaleDateString()}</p>
          <p className="mt-2 text-[#114B5F]">Price: ₹{record.price}/-</p>
          {record.bookDelivered ? (
            record.bookReturned ? (
              <span className="mt-2 inline-block px-3 py-1 text-sm font-semibold text-[#114B5F] bg-[#C6DABF] rounded-full">
                Returned
              </span>
            ) : record.returnRequest ? (
              <span className="mt-2 inline-block px-3 py-1 text-sm font-semibold text-[#114B5F] bg-[#88D498] rounded-full">
                Return Requested
              </span>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsModalOpen(true)}
                className="mt-4 bg-[#1A936F] text-white px-6 py-2 rounded-md hover:bg-[#114B5F] transition duration-300"
              >
                Request Return
              </motion.button>
            )
          ) : (
            <span className="mt-2 inline-block px-3 py-1 text-sm font-semibold text-[#114B5F] bg-[#88D498] rounded-full">
              In Transit
            </span>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4 text-[#114B5F]">Request Return</h3>
            <p className="mb-6 text-[#114B5F]">Please return the book to the provided address. Don't forget to leave a review!</p>
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#114B5F] mb-2">Rating</label>
              <StarRating rating={rating} onRatingChange={setRating} />
            </div>
            <div className="mb-6">
              <label htmlFor="review" className="block text-sm font-medium text-[#114B5F] mb-2">
                Review
              </label>
              <textarea
                id="review"
                rows={3}
                className="w-full px-3 py-2 text-[#114B5F] border border-[#C6DABF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#88D498] focus:border-[#88D498] transition duration-150 ease-in-out"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              ></textarea>
            </div>
            <div className="flex justify-end space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-[#114B5F] bg-[#C6DABF] rounded-md hover:bg-[#88D498] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#88D498] transition duration-150 ease-in-out"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReturnRequest}
                className="px-4 py-2 text-sm font-medium text-white bg-[#1A936F] rounded-md hover:bg-[#114B5F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1A936F] transition duration-150 ease-in-out"
              >
                Request Return
              </motion.button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

const MyOrder = () => {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const fetchOrders = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        toast.error('You must be logged in!');
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://rentandread.onrender.com/api/order/${user._id}`,
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const data = await response.json();
        setRecords(data);
        setIsLoading(false);
      } catch (error) {
        toast.error('Failed to fetch orders');
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleReturnRequest = async (orderId, bookId, rating, review) => {
    try {
      const [returnResponse, reviewResponse] = await Promise.all([
        fetch(`https://rentandread.onrender.com/api/return/${orderId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
          },
          body: JSON.stringify({ returnRequest: true }),
        }),
        fetch(`https://rentandread.onrender.com/api/review/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
          },
          body: JSON.stringify({
            bookID: bookId,
            userId: JSON.parse(localStorage.getItem('user'))._id,
            review,
            rating,
          }),
        }),
      ]);

      if (!returnResponse.ok || !reviewResponse.ok) {
        throw new Error('Failed to process return request');
      }

      toast.success('Return requested and review added successfully!');
      // Refresh orders
      const updatedRecords = records.map(record =>
        record._id === orderId ? { ...record, returnRequest: true } : record
      );
      setRecords(updatedRecords);
    } catch (error) {
      toast.error('Failed to process return request');
    }
  };

  const filteredRecords = records.filter(record => {
    switch (activeTab) {
      case 'inTransit':
        return !record.bookDelivered;
      case 'delivered':
        return record.bookDelivered && !record.bookReturned;
      case 'returned':
        return record.bookReturned;
      default:
        return true;
    }
  });

  const tabClass = (tabName) =>
    `px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
      activeTab === tabName
        ? 'bg-[#1A936F] text-white'
        : 'text-[#114B5F] hover:bg-[#C6DABF]'
    }`;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#114B5F]"></div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-xl rounded-lg overflow-hidden">
      <div className="p-8 md:p-12">
        <h2 className="text-4xl font-bold mb-8 text-center text-[#114B5F]">My Orders</h2>
        
        <div className="flex justify-center space-x-4 mb-8">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setActiveTab('all')} className={tabClass('all')}>All</motion.button>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setActiveTab('inTransit')} className={tabClass('inTransit')}>In Transit</motion.button>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setActiveTab('delivered')} className={tabClass('delivered')}>Delivered</motion.button>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setActiveTab('returned')} className={tabClass('returned')}>Returned</motion.button>
        </div>

        <AnimatePresence>
          {filteredRecords.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <p className="text-2xl mb-6 text-[#114B5F]">No orders found in this category.</p>
              {records.length === 0 && (
                <Link to="/books">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 text-lg bg-[#C6DABF] text-[#114B5F] rounded-lg hover:bg-[#88D498] transition duration-300"
                  >
                    Explore Books
                  </motion.button>
                </Link>
              )}
            </motion.div>
          ) : (
            filteredRecords.map((record) => (
              <Record key={record._id} record={record} onReturnRequest={handleReturnRequest} />
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MyOrder;