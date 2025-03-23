import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t p-4 border-gray-300 flex justify-between container mx-auto">
      <div className="flex items-center">
        <p>&copy; 2023 CasaMart. All rights reserved.</p>
      </div>
      <div className="flex gap-4">
        <a
          href="http://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook />
        </a>
        <a
          href="http://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagramSquare />
        </a>
        <a
          href="http://www.youtube.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaYoutube />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
