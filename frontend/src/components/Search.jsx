import React, { useEffect, useState } from "react";
import { FaSearch, FaRegArrowAltCircleLeft } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import useMobile from "../hooks/UseMobile";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMobile();
  const [searchPage, setSearchPage] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setSearchPage(location.pathname === "/search");
  }, [location]);

  const handleSearchPage = () => {
    if (!searchPage) navigate("/search");
  };

  return (
    <div
      onClick={handleSearchPage}
      className="flex items-center gap-2 py-2 p-3 w-full border-2 border-slate-400 rounded-xl cursor-pointer bg-slate-50 focus-within:border-blue-500"
    >
      <div className="m-0 flex items-center justify-center">
        {isMobile && searchPage ? (
          <button onClick={() => navigate(-1)} aria-label="Back">
            <FaRegArrowAltCircleLeft className="text-xl cursor-pointer hover:text-blue-500" />
          </button>
        ) : (
          <button type="button" aria-label="Search">
            <FaSearch className="text-xl cursor-pointer hover:text-blue-500" />
          </button>
        )}
      </div>

      {!searchPage ? (
        <TypeAnimation
          sequence={[
            "Search for Pizza",
            1000,
            "Search for Burger",
            1000,
            "Search for Fries",
            1000,
            "Search for Pasta",
            1000,
          ]}
          speed={50}
          style={{ fontSize: "1em" }}
          repeat={Infinity}
        />
      ) : (
        <input
          type="text"
          placeholder="Search for Pizza"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoFocus
          className="w-full border-0 outline-0 bg-transparent"
          onClick={(e) => e.stopPropagation()} // Prevent div click event
        />
      )}
    </div>
  );
};

export default Search;
