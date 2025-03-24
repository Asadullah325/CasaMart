import React, { useEffect, useState } from "react";
import UploadCatagoryModel from "../components/UploadCatagoryModel";
import AxiosToastError from "../utils/AxiosToastError";
import axiosInstance from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import Sekeleton from "../components/Sekeleton";
import NoData from "../components/NoData";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import EdirCatagoryModel from "../components/EdirCatagoryModel";
import ConfirmationModel from "../components/ConfirmationModel";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const CatagoryPage = () => {
  const [openModel, setOpenModel] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [catagories, setCatagories] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteCat, setDeleteCat] = useState({
    catagoryId: "",
  });
  const [catagory, setCatagory] = useState({
    name: "",
    image: "",
  });

  const allcatagories = useSelector((state) => state.product.allCatagories);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const res = await axiosInstance({
        ...SummaryApi.deleteCatagory,
        data: deleteCat,
      });

      if (res?.data?.success) {
        toast.success(res?.data?.message);
        setOpenDelete(false);
        setIsLoading(false);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    setCatagories(allcatagories);
  }, [allcatagories]);

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
        {openModel && <UploadCatagoryModel close={() => setOpenModel(false)} />}

        {openEdit && (
          <EdirCatagoryModel close={() => setOpenEdit(false)} data={catagory} />
        )}

        {openDelete && (
          <ConfirmationModel
            close={() => setOpenDelete(false)}
            cancel={() => setOpenDelete(false)}
            confirm={handleDelete}
          />
        )}

        {catagories && catagories.length === 0 && !isLoading ? (
          <NoData />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 p-4">
            {catagories &&
              catagories?.map((catagory) => (
                <div
                  key={catagory._id}
                  className="p-2 relative shadow-md rounded-md flex flex-col items-center justify-between"
                >
                  <img
                    src={catagory.image}
                    alt={catagory.name}
                    className="w-50 h-50 border-b-2 border-red-500 object-contain"
                  />
                  <h1 className="font-bold my-2">{catagory.name}</h1>
                  <div className="flex gap-2 absolute top-0 right-0">
                    <button
                      onClick={() => {
                        setOpenEdit(true);
                        setCatagory(catagory);
                      }}
                      className="cursor-pointer text-emerald-500 hover:text-emerald-600"
                    >
                      <FaEdit size={20} />
                    </button>
                    <button
                      onClick={() => {
                        setOpenDelete(true);
                        setDeleteCat({ catagoryId: catagory._id }); // Fix
                      }}
                      className="cursor-pointer text-red-500 hover:text-red-600"
                    >
                      <MdDelete size={20} />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CatagoryPage;
