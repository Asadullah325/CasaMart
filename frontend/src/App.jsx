import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import fetchYserDetails from "./utils/FetchUserDetails";
import { setUserDetails } from "./store/userSlice";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  const fetchUser = async () => {
    const userData = await fetchYserDetails();
    dispatch(setUserDetails(userData));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <Header />
      <div className="container mx-auto min-h-[78vh]">
        <Outlet />
      </div>
      <Footer />
      <ToastContainer theme="colored" autoClose={2000} position="bottom-right" />
    </>
  );
};

export default App;
