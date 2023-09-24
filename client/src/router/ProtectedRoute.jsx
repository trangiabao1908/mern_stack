import { Outlet } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { CircularProgress, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const { isUser } = useContext(AuthContext);
  const { isLoading, isAuthenticated } = isUser;
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("AccessToken") && !isAuthenticated) {
      // return <Navigate to={"/login"}></Navigate>;
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage.getItem("AccessToken"), isAuthenticated]);
  return (
    <React.Fragment>
      {isLoading ? (
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"Center"}
          height={"100vh"}
        >
          <CircularProgress color="secondary" />
        </Box>
      ) : (
        <Outlet />
      )}
    </React.Fragment>
  );
};

export default ProtectedRoute;
