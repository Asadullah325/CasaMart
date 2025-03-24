import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import fetchYserDetails from "./utils/FetchUserDetails";
import { setUserDetails } from "./store/userSlice";
import { useDispatch } from "react-redux";
import axiosInstance from "./utils/Axios";
import SummaryApi from "./common/SummaryApi";
import AxiosToastError from "./utils/AxiosToastError";
import { setAllCatagories } from "./store/productSlice";

const App = () => {
  const dispatch = useDispatch();

  const fetchUser = async () => {
    const userData = await fetchYserDetails();
    dispatch(setUserDetails(userData));
  };

  const fetchCatagories = async () => {
    try {
      const res = await axiosInstance({
        ...SummaryApi.allCatagory,
      });

      if (res?.data?.success) {
        dispatch(setAllCatagories(res?.data?.catagory));
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    fetchCatagories();
    fetchUser();
  }, []);

  return (
    <>
      <Header />
      <div className="mx-2 min-h-[78vh]">
        <Outlet />
      </div>
      <Footer />
      <ToastContainer
        theme="colored"
        autoClose={2000}
        position="bottom-right"
      />
    </>
  );
};

export default App;
