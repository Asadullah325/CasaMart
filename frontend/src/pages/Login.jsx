import axiosInstance from "@/utils/Axios";
import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "@/utils/AxiosToastError";
import { Link, useNavigate } from "react-router-dom";
import fetchYserDetails from "../utils/FetchUserDetails";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const validateValues = Object.values(data).every((value) => value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateValues) {
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await axiosInstance({
        ...SummaryApi.login,
        data,
      });

      if (res.data.error) {
        toast.error(res.data.error);
      }

      if (res.data.success) {
        toast.success(res.data.message);
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        const userData = await fetchYserDetails();
        dispatch(setUserDetails(userData));
        setData({
          email: "",
          password: "",
        });
        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <>
      <div className="px-2 py-4">
        <div className="bg-white w-full max-w-lg mx-auto shadow-md rounded-lg p-4">
          <h1 className="text-2xl font-bold text-center">
            Welcome to CasaMart
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                autoComplete="off"
                placeholder="Enter Your Email"
                name="email"
                value={data.email}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded outline-none focus-within:border-blue-500"
              />
            </div>
            <div className="flex flex-col gap-2 relative">
              <label htmlFor="password">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="off"
                placeholder="Enter Your Password"
                name="password"
                value={data.password}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded outline-none focus-within:border-blue-500"
              />
              <div>
                {showPassword ? (
                  <FaEyeSlash
                    className="absolute right-2 top-10 text-xl cursor-pointer"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <FaEye
                    className="absolute right-2 top-10 text-xl cursor-pointer"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
              <Link
                to="/forget-password"
                className="hover:text-blue-500 text-right pb-2"
              >
                forget password ?
              </Link>
            </div>
            <button
              disabled={!validateValues}
              className={`${
                !validateValues
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
              } w-full text-xl tracking-wide text-white p-2 rounded `}
            >
              Login
            </button>
            <p className="text-center mt-2">
              Dont have an account?{" "}
              <Link to="/register" className="text-blue-500">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
