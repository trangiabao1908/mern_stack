import { Box, IconButton } from "@mui/material";
import React, { useState } from "react";
import SmartDisplayOutlinedIcon from "@mui/icons-material/SmartDisplayOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ModalUpdate from "../ModalUpdate/ModalUpdate";
const ButtonActionPost = () => {
  const [OpenUpdateModal, setOpenUpdateModal] = useState(false);
  const handleOpenUpdateModal = () => {
    setOpenUpdateModal(true);
    console.log(OpenUpdateModal);
  };
  return (
    <React.Fragment>
      <Box display={"flex"} flexDirection={"row"}>
        <IconButton color="success">
          <SmartDisplayOutlinedIcon></SmartDisplayOutlinedIcon>
        </IconButton>
        <IconButton color="secondary" onClick={handleOpenUpdateModal}>
          <ModeEditOutlinedIcon></ModeEditOutlinedIcon>
        </IconButton>
        <ModalUpdate
          openModal={OpenUpdateModal}
          setOpenUpdateModal={setOpenUpdateModal}
        ></ModalUpdate>
        <IconButton color="error">
          <DeleteForeverOutlinedIcon></DeleteForeverOutlinedIcon>
        </IconButton>
      </Box>
    </React.Fragment>
  );
};

export default ButtonActionPost;
