import React from "react";
import UserMenu from "../components/UserMenu";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Dashboard = () => {

  const user = useSelector((state) => state.user);
  
  console.log(user);
  

  return (
    <div className="bg-white mt-2">
      <div className="p-4">
        <div className="grid lg:grid-cols-[250px_1fr]">
          <div className="p-2 sticky top-0 overflow-y-auto hidden lg:block border-r-2">
            <UserMenu />
          </div>
          <div className="max-h-[72vh] min-h-[72vh] overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
