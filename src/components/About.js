import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 text-[#114B5F] min-h-screen py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold mb-12 text-center">About Us</h1>
        
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h2 className="text-3xl font-semibold mb-6">Our Mission</h2>
            <p className="text-lg mb-6">
              Welcome to our book rental service! Our mission is to make reading more accessible and affordable for everyone. We believe that knowledge should be accessible to all, and that's why we started this service.
            </p>
            <h3 className="text-2xl font-semibold mb-4">Meet the Founder</h3>
            <p className="text-lg mb-6">
              My name is Mustali, and I'm a college student in my third year of studies. I've always been passionate about reading, but I know how expensive it can be to buy books. That's why I started this website, to help others like me who love reading but can't always afford to buy new books.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 text-lg bg-[#C6DABF] text-[#114B5F] rounded-lg hover:bg-[#88D498] transition duration-300"
            >
              Get in Touch
            </motion.button>
          </div>
          
          <div className="md:w-1/2 relative h-64 md:h-96">
            <img
              src={require("../2672335-removebg-preview.png")}
              alt="About Us illustration"
              className="w-full h-full object-contain rounded-lg transform -rotate-6 hover:rotate-0 transition-transform duration-300"
              style={{
                filter: "drop-shadow(8px 5px 4px #303030)",
              }}
            />
          </div>
        </div>
        
        <div className="mt-16">
          <h2 className="text-3xl font-semibold mb-6">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Wide Selection</h3>
              <p className="text-lg">
                Our website offers a wide selection of books for rent, from classic literature to contemporary bestsellers. We believe that reading is not just a hobby, but a way to expand your mind and explore new ideas.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Flexible Options</h3>
              <p className="text-lg">
                We offer flexible rental options to fit your schedule and budget. You can rent a book for as little as a week or as long as a month. And if you decide you want to keep the book, we offer the option to purchase it at a discounted price.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-semibold mb-6">Our Commitment</h2>
          <p className="text-lg max-w-3xl mx-auto">
            At our book rental service, we're dedicated to providing the best possible experience for our customers. We're constantly adding new titles to our collection and improving our website to make it easier for you to find the books you want. Thank you for choosing our service, and happy reading!
          </p>
        </div>
      </div>
    </div>
  );
}