import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import Search from "./Search";
import { Link, useLocation } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import useMobile from "../hooks/UseMobile";

const Header = () => {
  const isMobile = useMobile();
  const location = useLocation();
  const searchPage = location.pathname === "/search";

  return (
    <>
      {!(isMobile && searchPage) && (
        <header className="h-20 md:shadow-md sticky top-0 flex items-center justify-between px-5 bg-white">
          <div className="flex items-center justify-between w-full">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="android-chrome-192x192.png"
                alt=""
                className="w-8 h-8 md:w-15 md:h-15 rounded-full"
              />
              <h1 className="text-xl md:text-3xl font-bold text-blue-600">
                CasaMart
              </h1>
            </Link>
            <button>
              <FaRegUserCircle className="block md:hidden text-2xl hover:text-blue-500 cursor-pointer" />
            </button>
            <div className="hidden md:flex items-center gap-4 ">
              <Search />
            </div>
            <div className="hidden md:flex items-center gap-4">
              <FaRegUserCircle className="text-2xl hover:text-blue-500 cursor-pointer" />
              <IoCartOutline className="text-2xl hover:text-blue-500 cursor-pointer" />
              <IoIosLogOut className="text-2xl hover:text-red-500 cursor-pointer" />
            </div>
          </div>
        </header>
      )}

      <div className="md:hidden container mx-auto px-4 py-2">
        <Search />
      </div>
    </>
  );
};

export default Header;
