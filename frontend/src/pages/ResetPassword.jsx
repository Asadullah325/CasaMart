import SummaryApi from "@/common/SummaryApi";
import axiosInstance from "@/utils/Axios";
import AxiosToastError from "@/utils/AxiosToastError";
import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const [data, setData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateValues = Object.values(data).every((value) => value);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.newPassword !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!validateValues) {
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await axiosInstance({
        ...SummaryApi.resetPassword,
        data,
      });

      if (res.data.error) {
        toast.error(res.data.error);
      }

      if (res.data.success) {
        toast.success(res.data.message);
        setData({
          email: "",
          newPassword: "",
          confirmPassword: "",
        });
        navigate("/login");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    if (!location?.state?.email && !location?.state?.data?.success) {
      navigate("/forget-password");
      toast.error("Please enter your email");
    }

    if (location?.state?.email) {
      setData((prev) => ({
        ...prev,
        email: location?.state?.email,
      }));
    }
  }, [location, navigate]);

  return (
    <>
      <div className="px-2 py-4">
        <div className="bg-white w-full max-w-lg mx-auto shadow-md rounded-lg p-4">
          <h1 className="text-2xl font-bold text-center">
            Enter Your New Password
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 relative">
              <label htmlFor="newPassword">New Password</label>
              <input
                type={showPassword ? "text" : "password"}
                id="newPassword"
                autoComplete="off"
                placeholder="Enter Your Password"
                name="newPassword"
                value={data.newPassword}
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
              Reset Password
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

export default ResetPassword;
