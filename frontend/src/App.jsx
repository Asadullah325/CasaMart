import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <Header />
      <div className="container mx-autom min-h-[76vh]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default App;
