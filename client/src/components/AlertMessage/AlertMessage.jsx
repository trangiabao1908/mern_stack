/* eslint-disable react/prop-types */
import React from "react";
import { Alert, Snackbar } from "@mui/material";
const AlertMessage = ({ infoAlert, openAlert, setOpenAlert }) => {
  const handleClose = () => {
    setOpenAlert(!openAlert);
  };
  return (
    <React.Fragment>
      <Snackbar
        open={openAlert}
        onClose={handleClose}
        autoHideDuration={infoAlert.time}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        key={"bottom" + "right"}
      >
        <Alert
          severity={infoAlert.type}
          sx={{ width: "100%" }}
          onClose={handleClose}
        >
          {infoAlert.message}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default AlertMessage;
