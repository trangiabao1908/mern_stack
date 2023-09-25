/* eslint-disable react/prop-types */
import { Modal, Box, TextField, Button } from "@mui/material";
import React, { useState, useContext } from "react";
import { PostContext } from "../../contexts/PostProvider";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const ModalCreatePost = (props) => {
  const { createPost } = useContext(PostContext);
  const { openModal, setOpenCreatePost } = props;
  const handleClose = () => {
    setOpenCreatePost(!openModal);
    setNewPost({ title: "", description: "", url: "", status: "TO LEARN" });
  };
  const handleCloseModal = () => {
    handleClose();
  };
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    status: "TO LEARN",
    url: "",
  });
  const { title, description, url } = newPost;
  const handleChangeValue = (event) => {
    setNewPost({ ...newPost, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newpost = await createPost(newPost);
    if (newpost.success) {
      handleClose();
    }
  };
  return (
    <React.Fragment>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, textAlign: "center" }}>
          <h2 id=" parent-modal-title">Create Post</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Title"
              sx={{ mt: "20px", width: "100%" }}
              variant="outlined"
              value={title}
              name="title"
              type="text"
              required
              onChange={handleChangeValue}
            ></TextField>
            <TextField
              label="Description"
              multiline
              rows={4}
              value={description}
              name="description"
              sx={{ mt: "20px", width: "100%" }}
              variant="outlined"
              type="text"
              onChange={handleChangeValue}
            ></TextField>
            <TextField
              label="Url"
              name="url"
              value={url}
              sx={{ mt: "20px", width: "100%" }}
              variant="outlined"
              type="text"
              onChange={handleChangeValue}
            ></TextField>
            <Box display={"flex"} justifyContent={"center"} mt={3}>
              <Button
                variant="outlined"
                color="primary"
                type="button"
                onClick={handleCloseModal}
                sx={{ marginRight: "10px" }}
              >
                Close
              </Button>
              <Button variant="outlined" color="primary" type="submit">
                CREATE
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default ModalCreatePost;
