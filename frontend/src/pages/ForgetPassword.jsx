import axiosInstance from "@/utils/Axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "@/utils/AxiosToastError";
import { Link, useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
  });

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
        ...SummaryApi.forgetPassword,
        data,
      });

      if (res.data.error) {
        toast.error(res.data.error);
      }

      if (res.data.success) {
        toast.success(res.data.message);
        setData({
          email: "",
        });
        navigate("/verify-otp", {
          state: {
            email: data.email,
          },
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <>
      <div className="px-2 py-4">
        <div className="bg-white w-full max-w-lg mx-auto shadow-md rounded-lg p-4">
          <h1 className="text-2xl font-bold text-center">Forget Password</h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 py-2">
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
            <button
              disabled={!validateValues}
              className={`${
                !validateValues
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
              } w-full text-xl tracking-wide text-white p-2 rounded `}
            >
              Recive Otp
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

export default ForgetPassword;
