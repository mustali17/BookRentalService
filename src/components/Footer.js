import React from "react";
import { motion } from "framer-motion";

export default function Footer() {
  const socialLinks = [
    { name: "Facebook", icon: "facebook", url: "https://www.facebook.com/" },
    { name: "Twitter", icon: "twitter", url: "https://www.twitter.com/" },
    { name: "Instagram", icon: "instagram", url: "https://www.instagram.com/" },
    { name: "LinkedIn", icon: "linkedin", url: "https://www.linkedin.com/" },
    { name: "GitHub", icon: "github", url: "https://www.github.com/" },
  ];

  const footerLinks = [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Terms", href: "/terms" },
    { name: "Privacy", href: "/privacy" },
  ];

  return (
    <footer className="bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 text-[#114B5F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <a href="/" className="flex items-center">

              <span className="text-xl font-bold text-[#1A936F] font-['Yellowtail']">
                Rent&Read
              </span>
            </a>
          </div>
          <div className="flex flex-wrap justify-center space-x-4 mb-4 md:mb-0">
            {footerLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm hover:text-[#1A936F] transition duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="flex space-x-4">
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#114B5F] hover:text-[#1A936F] transition duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Visit our ${link.name} page`}
              >
                <i className={`bi bi-${link.icon} text-lg`}></i>
              </motion.a>
            ))}
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-[#114B5F] text-xs text-center text-[#114B5F]">
          <p>&copy; {new Date().getFullYear()} Rent&Read. All rights reserved.</p>
          <p className="mt-1">Developed by MustaliC</p>
        </div>
      </div>
    </footer>
  );
}