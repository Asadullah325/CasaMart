import React, { useEffect, useState } from "react";
import UploadSubCatagoryModel from "../components/UploadSubCatagoryModel";
import SummaryApi from "../common/SummaryApi";
import axiosInstance from "../utils/Axios";
import { toast } from "react-toastify";
import AxiosToastError from "../utils/AxiosToastError";
import Table from "../components/Table";

const SubCatagoryPage = () => {
  const [openModel, setOpenModel] = useState(false);

  const [subCatagories, setSubCatagories] = useState([]);

  const fetchSubCatagories = async () => {
    try {
      const res = await axiosInstance({
        ...SummaryApi.getSubCatagory,
        withCredentials: true,
      });

      if (res?.data?.success) {
        setSubCatagories(res?.data?.subCatagory);
      }

      if (res?.data?.error) {
        toast.error(res?.data?.error);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    fetchSubCatagories();
  }, []);

  console.log(subCatagories);

  return (
    <div>
      <div className="p-2 shadow-md flex items-center justify-between">
        <h1 className="text-xl font-bold">Sub Catagories</h1>
        <button
          onClick={() => setOpenModel(true)}
          className="text-white bg-blue-500 hover:bg-blue-600 p-2 py-1 rounded cursor-pointer"
        >
          Add Sub Catagory
        </button>
      </div>

      {openModel && (
        <UploadSubCatagoryModel close={() => setOpenModel(false)} />
      )}

      <div>
        <Table data={subCatagories} />
      </div>
    </div>
  );
};

export default SubCatagoryPage;
