/* eslint-disable react-refresh/only-export-components */
import { Outlet, createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import ErrorLayout from "./ErrorLayout";
import AuthProvider from "../Context/AuthProvider";

const AuthLayout = () => {
  return (
    <AuthProvider>
      <Outlet></Outlet>
    </AuthProvider>
  );
};

const router = createBrowserRouter([
  {
    element: <AuthLayout></AuthLayout>,
    errorElement: <ErrorLayout />,
    children: [
      {
        element: <Login></Login>,
        path: "/login",
      },
      {
        element: <Register></Register>,
        path: "/register",
      },
      {
        element: <ProtectedRoute></ProtectedRoute>,
        children: [
          {
            element: <Home></Home>,
            path: "/",
          },
        ],
      },
    ],
  },
]);
export default router;
