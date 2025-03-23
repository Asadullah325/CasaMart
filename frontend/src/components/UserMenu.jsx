import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Divider from "./Divider";
import { toast } from "react-toastify";
import SummaryApi from "../common/SummaryApi";
import axiosInstance from "../utils/Axios";
import { logout } from "../store/userSlice";
import AxiosToastError from "../utils/AxiosToastError";

const UserMenu = ({ close }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axiosInstance({
        ...SummaryApi.logout,
        withCredentials: true,
      });

      if (res.data.success) {
        if (close) {
          close();
        }
        dispatch(logout());
        localStorage.clear();
        navigate("/login");
        toast.success(res.data.message);
      }

      if (res.data.error) {
        toast.error(res.data.error);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <p className="font-semibold">My Account</p>
        <p className="text-xs text-gray-500">{user?.name}</p>
        <p className="text-xs text-gray-500">{user?.email}</p>
        <Divider />
        <div className="flex flex-col gap-2">
          <Link to="" className="hover:text-blue-500">
            My Orders
          </Link>
          <Link to="" className="hover:text-blue-500">
            Address
          </Link>
          <button
            onClick={handleLogout}
            type="button"
            className="p-2 py-1 cursor-pointer rounded-md bg-red-500 hover:bg-red-600 text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
