import React from "react";
import { useSelector } from "react-redux";
import isAdmin from "../utils/IsAdmin";

const AdminPermission = ({ children }) => {
  const user = useSelector((state) => state.user);

  return (
    <>
      {isAdmin(user.role) ? (
        children
      ) : (
        <>
          <h1 className="text-2xl font-bold text-red-500 bg-red-100 p-4 text-center">Access Denied</h1>
        </>
      )}
    </>
  );
};

export default AdminPermission;
