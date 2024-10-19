import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Search, BookOpen, Loader2 } from "lucide-react";

const SearchEBook = ({ searchText }) => {
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    searchText(text);
  };

  return (
    <form onSubmit={onSubmit} className="mb-8">
      <div className="relative">
        <input
          onChange={(e) => setText(e.target.value)}
          className="w-full p-4 rounded-full bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-[#1A936F]"
          type="text"
          placeholder="Search eBooks..."
        />
        <button
          type="submit"
          className="absolute right-0 top-0 mt-3 mr-4 text-[#1A936F]"
        >
          <Search size={24} />
        </button>
      </div>
    </form>
  );
};

const EBooks = () => {
  const [details, setDetails] = useState([]);
  const [term, setTerm] = useState("Ruskin Bond");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      const resources = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${term}&maxResults=11`
      );
      setDetails(resources.data.items);
      setIsLoading(false);
    };
    fetchDetails();
  }, [term]);

  const loadMore = async () => {
    const resources = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${term}&maxResults=8&startIndex=${details.length}`
    );
    setDetails((oldDetails) => [...oldDetails, ...resources.data.items]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-[#114B5F] mb-8">
          eBooks
        </h2>
        <SearchEBook searchText={(text) => setTerm(text)} />
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-12 h-12 animate-spin text-[#1A936F]" />
          </div>
        ) : !details ? (
          <div className="text-center p-8 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-red-500">
              😞 Couldn't find books about {term}
            </h1>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {details.map((book, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  {book.volumeInfo.imageLinks &&
                  book.volumeInfo.imageLinks.thumbnail ? (
                    <img
                      src={book.volumeInfo.imageLinks.thumbnail}
                      alt="Book Cover"
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                      No Thumbnail Available
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-[#114B5F] truncate">
                      {book.volumeInfo.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      By{" "}
                      {book.volumeInfo.authors ||
                        "Author(s) name not available"}
                    </p>
                    <p className="text-xs text-gray-500 mb-4">
                      Published by:{" "}
                      {book.volumeInfo.publisher || "Publisher not available"}
                    </p>
                    <a
                      href={
                        book.volumeInfo.previewLink ||
                        "https://books.google.co.in/"
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-[#1A936F] text-white rounded-full hover:bg-[#114B5F] transition duration-300"
                    >
                      Read more <BookOpen className="ml-2 h-4 w-4" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <button
                onClick={loadMore}
                className="px-6 py-2 bg-[#1A936F] text-white rounded-full hover:bg-[#114B5F] transition duration-300"
              >
                Load More
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EBooks;