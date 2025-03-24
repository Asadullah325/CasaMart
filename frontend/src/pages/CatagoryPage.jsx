import React, { useEffect, useState } from "react";
import UploadCatagoryModel from "../components/UploadCatagoryModel";
import AxiosToastError from "../utils/AxiosToastError";
import axiosInstance from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import Sekeleton from "../components/Sekeleton";
import NoData from "../components/NoData";

const CatagoryPage = () => {
  const [openModel, setOpenModel] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [catagories, setCatagories] = useState([]);

  const fetchCatagories = async () => {
    try {
      setIsLoading(true);
      const res = await axiosInstance({
        ...SummaryApi.allCatagory,
      });

      console.log(res.data);

      if (res?.data?.success) {
        setCatagories(res?.data?.catagory);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCatagories();
  }, []);

  return (
    <>
      <div>
        <div className="p-2 shadow-md flex items-center justify-between">
          <h1 className="text-xl font-bold">Catagories</h1>
          <button
            onClick={() => setOpenModel(true)}
            className="text-white bg-blue-500 hover:bg-blue-600 p-2 py-1 rounded cursor-pointer"
          >
            Add Catagory
          </button>
        </div>
        {isLoading && (
          <div className="grid grid-cols-3 gap-4 p-4">
            <Sekeleton />
            <Sekeleton />
            <Sekeleton />
          </div>
        )}
        {openModel && <UploadCatagoryModel fetch={fetchCatagories} close={() => setOpenModel(false)} />}

        {catagories && catagories.length === 0 && !isLoading ? (
          <NoData />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 p-4">
            {catagories &&
              catagories?.map((catagory) => (
                <div key={catagory._id} className="p-2 shadow-md flex items-center justify-between">
                  <img src={catagory.image} alt={catagory.name} className="w-50 h-50 border-b-2 border-red-500 object-contain" />
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CatagoryPage;
