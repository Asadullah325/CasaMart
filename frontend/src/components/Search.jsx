import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchPage, setSearchPage] = useState(false);

  useEffect(() => {
    const isSearch = location.pathname === "/search";
    setSearchPage(isSearch);
  }, [location]);

  const handleSearchPage = () => {
    navigate("/search");
  };

  return (
    <div
      onClick={handleSearchPage}
      className="flex items-center gap-2 py-2 p-3 min-w-[300px] border-2 border-slate-400 rounded-xl cursor-pointer bg-slate-50 lg:min-w-[450px]  focus-within:border-blue-500"
    >
      <button>
        <FaSearch className="text-xl cursor-pointer hover:text-blue-500" />
      </button>
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
          autoFocus
          className="w-full border-0 outline-0"
        />
      )}
    </div>
  );
};

export default Search;
