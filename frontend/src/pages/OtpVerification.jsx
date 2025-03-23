import axiosInstance from "@/utils/Axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "@/utils/AxiosToastError";
import { Link, useLocation, useNavigate } from "react-router-dom";

const OtpVerification = () => {
  const navigate = useNavigate();
  const inputRef = useRef([]);
  const location = useLocation();

  useEffect(() => {
    if (!location?.state?.email) {
      navigate("/forget-password");
      toast.error("Please enter your email");
    }
  }, [location, navigate]);

  const [data, setData] = useState(["", "", "", "", "", ""]);

  const validateValues = data.every((value) => value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateValues) {
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await axiosInstance({
        ...SummaryApi.verifyOtp,
        data: {
          otp: data.join(""),
          email: location.state.email,
        },
      });

      if (res.data.error) {
        toast.error(res.data.error);
      }

      if (res.data.success) {
        toast.success(res.data.message);
        setData(["", "", "", "", "", ""]);
        navigate("/reset-password", {
          state: {
            data: res.data,
            email: location.state.email,
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
          <h1 className="text-2xl font-bold text-center">Enter Your OTP </h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 py-2">
              <p className="text-lg">OTP CODE</p>
              <div className="flex gap-2 w-full items-center justify-between">
                {data.map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    name="otp"
                    ref={(el) => (inputRef.current[index] = el)}
                    maxLength={1}
                    onChange={(e) => {
                      const value = e.target.value;
                      const newData = [...data];
                      newData[index] = value;
                      setData(newData);

                      if (value) {
                        inputRef.current[index + 1]?.focus();
                      }
                    }}
                    value={data[index]}
                    autoComplete="off"
                    className="max-w-[40px] md:max-w-[60px] flex-1 p-2 font-semibold text-2xl border text-center border-gray-300 rounded outline-none focus-within:border-blue-500"
                  />
                ))}
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
              Verify Otp
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

export default OtpVerification;
