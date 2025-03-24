import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Divider from "./Divider";
import { toast } from "react-toastify";
import SummaryApi from "../common/SummaryApi";
import axiosInstance from "../utils/Axios";
import { logout } from "../store/userSlice";
import AxiosToastError from "../utils/AxiosToastError";
import { HiOutlineExternalLink } from "react-icons/hi";

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

  const handleClose = () => {
    if (close) {
      close();
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <p className="font-semibold">My Account</p>
        <p className="text-sm text-gray-500 ">{user?.name}</p>
        <p className="text-sm text-red-500 ">{user?.role}</p>
        <div className="text-sm text-gray-500 flex items-center gap-2">
          {user?.email}
          <Link
            onClick={handleClose}
            to="/dashboard/profile"
            className="hover:text-blue-500"
          >
            <HiOutlineExternalLink className="inline text-xl" />
          </Link>
        </div>

        <Divider />
        <div className="flex flex-col gap-3 max-h-[50vh]">
          <Link
            onClick={handleClose}
            to="/dashboard/catagories"
            className="hover:text-blue-500"
          >
            Catagories
          </Link>
          <Link
            onClick={handleClose}
            to="/dashboard/subCatagories"
            className="hover:text-blue-500"
          >
            Sub Catagories
          </Link>
          <Link
            onClick={handleClose}
            to="/dashboard/products"
            className="hover:text-blue-500"
          >
            Products
          </Link>
          <Link
            onClick={handleClose}
            to="/dashboard/upload-product"
            className="hover:text-blue-500"
          >
            Upload Product
          </Link>
          <Link
            onClick={handleClose}
            to="/dashboard/myorders"
            className="hover:text-blue-500"
          >
            My Orders
          </Link>
          <Link
            onClick={handleClose}
            to="/dashboard/address"
            className="hover:text-blue-500"
          >
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
