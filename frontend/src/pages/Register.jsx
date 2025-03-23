import axiosInstance from "@/utils/Axios";
import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "@/utils/AxiosToastError";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!validateValues) {
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await axiosInstance({
        ...SummaryApi.register,
        data,
      });

      if (res.data.error) {
        toast.error(res.data.error);
      }

      if (res.data.success) {
        toast.success(res.data.message);
        setData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/login");
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
            Create an Account
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                autoComplete="off"
                placeholder="Enter Your Name"
                autoFocus
                name="name"
                value={data.name}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded outline-none focus-within:border-blue-500"
              />
            </div>
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
            </div>
            <div className="flex flex-col gap-2 relative">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                autoComplete="off"
                placeholder="Confirm Your Password"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded outline-none focus-within:border-blue-500"
              />
              <div>
                {showConfirmPassword ? (
                  <FaEyeSlash
                    className="absolute right-2 top-10 text-xl cursor-pointer"
                    onClick={() => setShowConfirmPassword(false)}
                  />
                ) : (
                  <FaEye
                    className="absolute right-2 top-10 text-xl cursor-pointer"
                    onClick={() => setShowConfirmPassword(true)}
                  />
                )}
              </div>
            </div>
            <button
              disabled={!validateValues}
              className={`${
                !validateValues
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
              } w-full text-xl tracking-wide text-white p-2 rounded `}
            >
              Register
            </button>
            <p className="text-center mt-2">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
