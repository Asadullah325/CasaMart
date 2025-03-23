import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="sticky bottom-0 w-full border-t p-4 px-10 border-gray-300 flex flex-col md:flex-row  justify-between items-center gap-2 bg-white">
      <div className="flex items-center m-0">
        <p className="text-sm">&copy; 2023 CasaMart. All rights reserved.</p>
      </div>
      <div className="flex gap-4 text-xl">
        <a
          href="http://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-500"
        >
          <FaFacebook />
        </a>
        <a
          href="http://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-500"
        >
          <FaInstagramSquare />
        </a>
        <a
          href="http://www.youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-red-500"
        >
          <FaYoutube />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
