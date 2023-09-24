/* eslint-disable react-refresh/only-export-components */
import { Outlet, createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import ErrorLayout from "./ErrorLayout";
import AuthProvider from "../contexts/AuthProvider";
import PostProvider from "../contexts/PostProvider";
const AuthLayout = () => {
  return (
    <AuthProvider>
      <PostProvider>
        <Outlet></Outlet>
      </PostProvider>
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
