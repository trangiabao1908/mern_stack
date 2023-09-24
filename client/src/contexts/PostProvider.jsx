/* eslint-disable react/prop-types */
import { createContext, useReducer, useState } from "react";
import {
  Create_Post,
  get_Posts,
  find_Post,
  delete_Post,
  update_Post,
} from "../reducer/constants";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { urlServer } from "./constants";
import postReducer from "../reducer/postReducer";
import configAxios from "../utils/apiAxiosHeader";
import AlertMessage from "../components/AlertMessage/AlertMessage";
export const PostContext = createContext();

const PostProvider = ({ children }) => {
  const [infoAlert, setInfoAlert] = useState({
    type: "success",
    time: 3000,
    message: "",
  });
  const [openAlert, setOpenAlert] = useState(false);
  const [postState, dispatch] = useReducer(postReducer, {
    post: null,
    posts: [],
    isPostLoading: true,
  });
  const { isPostLoading } = postState;
  const getPosts = async () => {
    const config = configAxios();
    try {
      const res = await axios.get(`${urlServer}/api/posts`, config);
      if (res.data.success === true) {
        dispatch({ type: get_Posts, payload: res.data.posts });
      }
      return res.data;
    } catch (err) {
      dispatch({
        type: get_Posts,
        payload: {
          post: null,
          posts: [],
          isPostLoading: true,
        },
      });
      console.log(err);
    }
  };

  const deletePost = async (postId) => {
    const config = configAxios();
    try {
      const res = await axios.delete(
        `${urlServer}/api/posts/${postId}`,
        config
      );
      if (res.data.success === true) {
        dispatch({ type: delete_Post, payload: postId });
        setOpenAlert(true);
        setInfoAlert({
          type: "success",
          message: res.data.message,
          time: 3000,
        });
      }
      return res.data;
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <PostContext.Provider value={{ postState, getPosts, deletePost }}>
      <AlertMessage
        openAlert={openAlert}
        infoAlert={infoAlert}
        setOpenAlert={setOpenAlert}
      ></AlertMessage>
      {children}
    </PostContext.Provider>
  );
};
export default PostProvider;
