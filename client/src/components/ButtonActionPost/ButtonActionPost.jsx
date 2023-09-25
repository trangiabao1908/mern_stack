/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Box, IconButton } from "@mui/material";
import React, { useContext } from "react";
import SmartDisplayOutlinedIcon from "@mui/icons-material/SmartDisplayOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ModalUpdate from "../ModalUpdate/ModalUpdate";
import { PostContext } from "../../contexts/PostProvider";
const ButtonActionPost = (props) => {
  const {
    OpenUpdateModal,
    setOpenUpdateModal,
    deletePost,
    findPost,
    postState: { post },
  } = useContext(PostContext);
  const { postValue } = props;

  const handleOpenUpdateModal = () => {
    setOpenUpdateModal(true);
    findPost(postValue._id);
  };
  const handleDelete = () => {
    deletePost(postValue._id);
  };
  return (
    <React.Fragment>
      <Box display={"flex"} flexDirection={"row"}>
        <IconButton color="success" href={postValue.url} target="_blank">
          <SmartDisplayOutlinedIcon></SmartDisplayOutlinedIcon>
        </IconButton>
        <IconButton color="secondary" onClick={handleOpenUpdateModal}>
          <ModeEditOutlinedIcon></ModeEditOutlinedIcon>
        </IconButton>
        {post !== null && (
          <ModalUpdate
            openModal={OpenUpdateModal}
            setOpenUpdateModal={setOpenUpdateModal}
          ></ModalUpdate>
        )}
        <IconButton color="error" onClick={handleDelete}>
          <DeleteForeverOutlinedIcon></DeleteForeverOutlinedIcon>
        </IconButton>
      </Box>
    </React.Fragment>
  );
};

export default ButtonActionPost;
