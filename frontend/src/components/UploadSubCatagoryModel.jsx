import React, { useState } from "react";
import { FaRegImage } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import imageUpload from "../utils/UploadImage";
import { useSelector } from "react-redux";
import AxiosToastError from "../utils/AxiosToastError";
import axiosInstance from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";

const UploadSubCatagoryModel = ({ close }) => {
  const [data, setData] = useState({
    name: "",
    image: "",
    catagory: [],
  });

  const validateValues = Object.values(data).every((value) => value);

  const allCatagories = useSelector((state) => state.product.allCatagories);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSelectChange = (e) => {
    const value = e.target.value;
    const categoryDetails = allCatagories.find((cat) => cat._id === value);

    // Check if category is already selected
    if (data.catagory.some((cat) => cat._id === value)) {
      toast.warn("Category already selected!");
      return;
    }

    setData((prev) => ({
      ...prev,
      catagory: [...prev.catagory, categoryDetails], // Add only if not duplicate
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      toast.error("Please Select File First");
      return;
    }
    const image = await imageUpload(file);

    setData((prev) => {
      return {
        ...prev,
        image: image?.data?.data?.url,
      };
    });

    toast.success(image?.data?.message);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateValues) {
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await axiosInstance({
        ...SummaryApi.addSubCatagory,
        data,
      });

      if (res?.data?.success) {
        toast.success(res?.data?.message);
        setData({
          name: "",
          image: "",
          catagory: [],
        });
        close();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  

  return (
    <>
      <div className="fixed top-0 bottom-0 right-0 left-0 z-100 bg-black/50 p-2 flex justify-center items-center">
        <div className="bg-white max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-4xl min-w-sm sm:min-w-xl md:min-w-2xl lg:min-w-4xl p-2 px-4 rounded flex flex-col relative">
          <div className="absolute top-2 right-2">
            <button
              onClick={close}
              className="bg-red-500 hover:bg-red-600 p-2 rounded-full text-white cursor-pointer"
            >
              <IoMdClose />
            </button>
          </div>
          <h1 className="text-xl font-bold">Upload Sub Catagory</h1>

          <form onSubmit={handleSubmit}>
            <div className="my-2 flex flex-col">
              <label htmlFor="name">Sub Catagory Name</label>
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={handleChange}
                id="name"
                placeholder="Sub Catagory Name"
                className="w-full p-2 border border-gray-300 rounded mt-2"
              />
            </div>
            <div className="my-1 flex flex-col gap-2">
              <p>Image</p>
              <div className="flex flex-col  md:flex-row gap-1 items-center">
                <div className="w-full h-full md:w-40 md:h-40 p-2 border border-gray-400 rounded flex items-center justify-center">
                  {data?.image ? (
                    <img
                      src={data.image}
                      alt={data.name}
                      className="w-full h-full object-cover rounded-md shadow-md"
                    />
                  ) : (
                    <div className="flex flex-col items-center">
                      <FaRegImage size={30} />
                      <p className="text-sm text-neutral-500">No Image</p>
                    </div>
                  )}
                </div>
                <label
                  htmlFor="image"
                  className={`
                    ${
                      !data.name
                        ? "bg-gray-400 cursor-not-allowed"
                        : " bg-blue-500 hover:bg-blue-600 cursor-pointer"
                    }
                     text-white px-4 py-2 rounded
                    `}
                >
                  Upload Image
                </label>
                <input
                  type="file"
                  disabled={!data.name}
                  onChange={handleImageUpload}
                  name="image"
                  id="image"
                  className="hidden"
                />
              </div>
            </div>
            <div className="my-2 flex flex-col">
              <label htmlFor="catagory">Catagories</label>

              <div className="flex flex-wrap gap-2">
                {data.catagory.map((catagory) => (
                  <p
                    className="text-sm bg-emerald-400 p-2 rounded text-white flex items-center"
                    key={catagory._id}
                  >
                    {catagory.name}
                    <span>
                      <IoMdClose
                        onClick={() =>
                          setData((prev) => ({
                            ...prev,
                            catagory: prev.catagory.filter(
                              (cat) => cat._id !== catagory._id
                            ),
                          }))
                        }
                        className="ml-2 cursor-pointer hover:text-red-500"
                      />
                    </span>
                  </p>
                ))}
              </div>

              <select
                onChange={handleSelectChange}
                name="catagory"
                id="catagory"
                className="w-full p-2 border border-gray-300 rounded mt-2"
              >
                <option value="" disabled>
                  Select Catagory
                </option>

                {allCatagories?.map((catagory) => (
                  <option key={catagory._id} value={catagory._id}>
                    {catagory.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end">
              <button
                disabled={!data.name || !data.image || !data.catagory}
                type="submit"
                className={`${
                  data.name && data.image && data.catagory
                    ? "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                    : "bg-gray-400 cursor-not-allowed"
                } text-white px-4 py-2 rounded`}
              >
                Submit{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UploadSubCatagoryModel;
