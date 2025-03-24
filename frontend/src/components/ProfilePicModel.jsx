import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { toast } from "react-toastify";
import { IoMdClose } from "react-icons/io";
import { uploadProfile } from "../store/userSlice";

const ProfilePicModal = ({ close }) => {
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleImage = async (e) => {
    const image = e.target.files[0];

    if (!image) {
      toast.error("Please Select File First");
    }

    const formData = new FormData();
    formData.append("avatar", image);

    try {
      setIsLoading(true);

      const res = await axiosInstance({
        ...SummaryApi.uploadProfile,
        data: formData,
      });
      const profileImage = res?.data?.data?.avatar;
      dispatch(uploadProfile(profileImage));
      toast.success(res?.data?.message);
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setIsLoading(false);
      close();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="fixed top-0 bottom-0 right-0 left-0 bg-black/50 p-5 flex justify-center items-center">
        <div className="bg-white min-w-sm p-4 rounded flex flex-col items-center relative">
          <div className="absolute top-2 right-2">
            <button
              onClick={close}
              className="bg-red-500 hover:bg-red-600 p-2 rounded-full text-white cursor-pointer"
            >
              <IoMdClose />
            </button>
          </div>
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
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col mt-2 gap-1">
            <input
              onChange={handleImage}
              type="file"
              accept="image/*"
              id="upload-profile"
              className="hidden"
            />
            <label
              htmlFor="upload-profile"
              className={`text-center px-2 py-1 text-white tracking-wide bg-blue-500 hover:bg-blue-600 cursor-pointer rounded-lg ${
                isLoading ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {isLoading ? "Uploading..." : "Select From Galley"}
            </label>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfilePicModal;
