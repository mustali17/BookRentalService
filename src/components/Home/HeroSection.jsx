import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'

export function HeroSection() {
    return (
      <section className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-[#114B5F]">Books on Rent</h1>
          <h2 className="text-2xl md:text-3xl mb-8 text-[#1A936F]">Your Doorstep Library</h2>
          <Link to="/books">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 text-lg bg-[#1A936F] text-white rounded-lg hover:bg-[#114B5F] transition duration-300"
            >
              Explore Books
            </motion.button>
          </Link>
          <p className="mt-8 text-lg max-w-md">
            Want to share your books? Email us at:{' '}
            <a href="mailto:contact@rentalandread.tech" className="underline text-[#1A936F]">
              contact@rentalandread.tech
            </a>
          </p>
        </div>
        <div className="md:w-1/2 relative h-64 md:h-96">
          <img
            src={require("../../5836-removebg-preview.png")}
            alt="Stack of books"
            className="w-full h-full object-contain rounded-lg"
          />
        </div>
      </section>
    );
  }