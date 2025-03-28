import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgetPassword from "@/pages/ForgetPassword";
import OtpVerification from "@/pages/OtpVerification";
import ResetPassword from "@/pages/ResetPassword";
import UserMenuMobile from "../pages/UserMenuMobile";
import Dashboard from "../layouts/Dashboard";
import Profile from "../pages/Profile";
import MyOrder from "../pages/MyOrder";
import Address from "../pages/Address";
import CatagoryPage from "../pages/CatagoryPage";
import SubCatagoryPage from "../pages/SubCatagoryPage";
import UploadProductPage from "../pages/UploadProductPage";
import ProductsAdminPage from "../pages/ProductsAdminPage";
import AdminPermission from "../layouts/AdminPermission";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "verify-otp",
        element: <OtpVerification />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "user-menu",
        element: <UserMenuMobile />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "myorders",
            element: <MyOrder />,
          },
          {
            path: "address",
            element: <Address />,
          },
          {
            path: "catagories",
            element: (
              <AdminPermission>
                <CatagoryPage />
              </AdminPermission>
            ),
          },
          {
            path: "subCatagories",
            element: (
              <AdminPermission>
                <SubCatagoryPage />
              </AdminPermission>
            ),
          },
          {
            path: "products",
            element: (
              <AdminPermission>
                <ProductsAdminPage />
              </AdminPermission>
            ),
          },
          {
            path: "upload-product",
            element: (
              <AdminPermission>
                <UploadProductPage />
              </AdminPermission>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
