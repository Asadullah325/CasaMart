import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import ProfilePicModel from "../components/ProfilePicModel";
import { toast } from "react-toastify";
import AxiosToastError from "../utils/AxiosToastError";
import axiosInstance from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import fetchYserDetails from "../utils/FetchUserDetails";
import { setUserDetails } from "../store/userSlice";

const Profile = () => {
  const user = useSelector((state) => state.user);

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    name: user.name,
    mobile: user.mobile,
    email: user.email,
  });

  const validateValues = Object.values(userData).every((value) => value);

  const [openModel, setOpenModel] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    setUserData({
      name: user.name,
      mobile: user.mobile,
      email: user.email,
    });
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateValues) {
      toast.error("All fields are required");
      return;
    }

    try {
      setIsLoading(true);

      const res = await axiosInstance({
        ...SummaryApi.updateUserDetails,
        data: userData,
      });

      if (res?.data?.success) {
        toast.success(res?.data?.message);
        const userData = await fetchYserDetails();
        dispatch(setUserDetails(userData));
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div>
        <div className="w-16 h-16 relative bg-gray-300 rounded-full flex items-center justify-center drop-shadow-lg">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full rounded-full"
            />
          ) : (
            <FaRegUserCircle size={60} />
          )}
          <div className="absolute -bottom-1 -right-1 z-20">
            <button
              onClick={() => setOpenModel(true)}
              className="bg-blue-500 hover:bg-blue-600 cursor-pointer mt-2 text-white rounded-full p-1 "
            >
              <FaEdit />
            </button>
          </div>
        </div>
        {openModel && <ProfilePicModel close={() => setOpenModel(false)} />}
        <form onSubmit={handleSubmit} className="mt-3 grid">
          <div className="grid">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter Yor Name"
              className="p-2 border my-1 rounded"
              value={userData.name}
              onChange={handleChange}
            />
          </div>
          <div className="grid">
            <label htmlFor="mobile">Mobile</label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              placeholder="Enter Your Mobile"
              value={userData.mobile}
              className="p-2 border my-1 rounded"
              onChange={handleChange}
            />
          </div>
          <div className="grid">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="p-2 border my-1 rounded"
              name="email"
              placeholder="Enter Your Mobile"
              value={userData.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-end">
            <button className="p-1 px-2 w-100 text-white text-lg cursor-pointer hover:bg-emerald-600 rounded bg-emerald-500 ">
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
