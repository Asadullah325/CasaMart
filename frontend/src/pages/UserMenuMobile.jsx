import React from "react";
import UserMenu from "../components/UserMenu";
import { IoMdClose } from "react-icons/io";

const UserMenuMobile = () => {
  return (
    <div className="w-full h-screen bg-white">
      <button onClick={() => window.history.back()} className="p-3 mx-4 mt-2 rounded-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white">
        <IoMdClose />
      </button>
      <div className="p-5">
        <UserMenu />
      </div>
    </div>
  );
};

export default UserMenuMobile;
