/* eslint-disable react/prop-types */
import { Modal, Box, TextField } from "@mui/material";
import React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const ModalUpdate = ({ openModal, setOpenUpdateModal }) => {
  const handleClose = () => {
    setOpenUpdateModal(!openModal);
  };
  return (
    <React.Fragment>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id=" parent-modal-title">Want to update post?</h2>
          <TextField
            label="title"
            sx={{ mt: "20px", width: "100%" }}
            variant="outlined"
            type="text"
          ></TextField>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default ModalUpdate;
