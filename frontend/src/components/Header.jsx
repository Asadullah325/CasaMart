import React, { useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import Search from "./Search";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import useMobile from "../hooks/UseMobile";
import { useSelector } from "react-redux";
import UserMenu from "./UserMenu";

const Header = () => {
  const isMobile = useMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const searchPage = location.pathname === "/search";

  const user = useSelector((state) => state.user);

  const [openUserMenu, setOpenUserMenu] = useState(false);

  const redirectToLoginPage = () => {
    navigate("/login");
  };

  const handleCloseUserMenu = () => {
    setOpenUserMenu(false);
  };

  const handleMobileLogin = () => {
    if (!user._id) redirectToLoginPage();
    else navigate("/user-menu");
  };

  return (
    <>
      {!(isMobile && searchPage) && (
        <header className="py-2 md:shadow-md sticky top-0 flex items-center justify-between px-5 bg-white">
          <div className="flex items-center justify-between w-full">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="android-chrome-192x192.png"
                alt=""
                className="w-8 h-8 md:w-12 md:h-12 rounded-full"
              />
              <h1 className="text-xl md:text-3xl font-bold text-blue-600">
                CasaMart
              </h1>
            </Link>
            <button onClick={handleMobileLogin} className="block md:hidden">
              <FaRegUserCircle className="text-2xl hover:text-blue-500 cursor-pointer" />
            </button>
            <div className="hidden md:flex items-center gap-4 w-80">
              <Search />
            </div>
            <div className="hidden md:flex items-center gap-6">
              {user?._id ? (
                <div className="relative">
                  <div
                    onClick={() => setOpenUserMenu(!openUserMenu)}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <p>Account</p>
                    {openUserMenu ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
                  </div>
                  {openUserMenu && (
                    <div className="absolute top-12 right-0">
                      <div className="bg-white p-2 rounded-lg min-w-50 shadow-md lg:shadow-lg">
                        <UserMenu close={handleCloseUserMenu} />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button
                    onClick={redirectToLoginPage}
                    className="cursor-pointer text-lg p-2"
                  >
                    Login
                  </button>
                </>
              )}

              <Link
                to="/cart"
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 p-3 rounded-xl text-white"
              >
                <IoCartOutline className="text-2xl cursor-pointer animate-pulse font-bold" />
                <div className="flex flex-col items-center">
                  <p>My Cart</p>
                </div>
              </Link>
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
