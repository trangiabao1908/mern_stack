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
import { urlServer } from "./constants";
import postReducer from "../reducer/postReducer";
import configAxios from "../utils/apiAxiosHeader";
import AlertMessage from "../components/AlertMessage/AlertMessage";
export const PostContext = createContext();

const PostProvider = ({ children }) => {
  const [OpenUpdateModal, setOpenUpdateModal] = useState(false);
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
  const { posts } = postState;
  // function getPosts
  const getPosts = async () => {
    const config = configAxios();
    try {
      const res = await axios.get(`${urlServer}/api/posts`, config);
      if (res.data.success === true) {
        dispatch({ type: get_Posts, payload: res.data.posts });
        return res.data;
      }
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

  // function createPost
  const createPost = async (postValue) => {
    const config = configAxios();
    try {
      const res = await axios.post(`${urlServer}/api/posts`, postValue, config);
      if (res.data.success) {
        dispatch({ type: Create_Post, payload: res.data.newPost });
        setOpenAlert(true);
        setInfoAlert({
          type: "success",
          message: res.data.message,
          time: 3000,
        });
        return res.data;
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  //function find post to get value
  const findPost = (postId) => {
    const post = posts.find((post) => post._id === postId);
    if (post) {
      dispatch({ type: find_Post, payload: post });
    }
  };
  //function to updatr post
  const updatePostLogic = async (postid, postNewValue) => {
    const config = configAxios();
    try {
      const res = await axios.put(
        `${urlServer}/api/posts/${postid}`,
        postNewValue,
        config
      );
      if (res.data.success === true) {
        dispatch({ type: update_Post, payload: res.data.updatePost });
        setOpenAlert(true);
        setInfoAlert({
          type: "success",
          message: res.data.message,
          time: 3000,
        });
        return res.data;
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  //function to delete a post
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
        return res.data;
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <PostContext.Provider
      value={{
        postState,
        getPosts,
        deletePost,
        createPost,
        findPost,
        updatePostLogic,
        OpenUpdateModal,
        setOpenUpdateModal,
      }}
    >
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
