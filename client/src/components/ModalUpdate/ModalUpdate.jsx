/* eslint-disable react/prop-types */
import {
  Modal,
  Box,
  TextField,
  Button,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
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
const ModalUpdate = ({ openModal, setOpenUpdateModal }) => {
  const {
    updatePostLogic,
    postState: { post },
  } = useContext(PostContext);
  const handleClose = () => {
    setOpenUpdateModal(!openModal);
    setUpdatePost(post);
  };
  const [updatePost, setUpdatePost] = useState(post);
  useEffect(() => {
    setUpdatePost(post);
  }, [post]);
  const { title, description, status, url } = updatePost;
  const handleChangeValue = (event) => {
    setUpdatePost({ ...updatePost, [event.target.name]: event.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updatePostLogic(post._id, updatePost);
    handleClose();
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
          <h2 id=" parent-modal-title">Update Post</h2>
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
              id="outlined-multiline-static"
              label="Description"
              value={description}
              name="description"
              multiline
              rows={4}
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
            <FormControl fullWidth sx={{ mt: "20px" }}>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Status"
                name="status"
                onChange={handleChangeValue}
              >
                <MenuItem value={"TO LEARN"}>TO LEARN</MenuItem>
                <MenuItem value={"LEARNING"}>LEARNING</MenuItem>
                <MenuItem value={"LEARNED"}>LEARNED</MenuItem>
              </Select>
            </FormControl>
            <Box display={"flex"} justifyContent={"center"} mt={3}>
              <Button
                variant="outlined"
                color="primary"
                type="button"
                onClick={handleClose}
                sx={{ marginRight: "10px" }}
              >
                Close
              </Button>
              <Button variant="outlined" color="primary" type="submit">
                UPDATE
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default ModalUpdate;
