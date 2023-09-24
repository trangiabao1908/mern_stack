/* eslint-disable react/prop-types */
import { createContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthReducer from "../reducer/AuthReducer";
import AlertMessage from "../components/AlertMessage/AlertMessage";
import { urlServer } from "./constants";
import configAxios from "../utils/apiAxiosHeader";
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [infoAlert, setInfoAlert] = useState({
    type: "success",
    time: 3000,
    message: "",
  });
  const [openAlert, setOpenAlert] = useState(false);
  const [isUser, dispatch] = useReducer(AuthReducer, {
    isLoading: true,
    isAuthenticated: false,
    user: null,
  });
  //get info user
  const getUser = async () => {
    const config = configAxios();
    try {
      const infoUser = await axios.get(`${urlServer}/api/auth`, config);
      console.log(infoUser.data);
      if (infoUser.data.success) {
        dispatch({
          type: "GET_USER",
          payload: { isAuthenticated: true, user: infoUser.data.user },
        });
      }
    } catch (error) {
      localStorage.clear();
    }
  };
  console.log(isUser);

  // UseEffect to get user
  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // function Login logic
  const loginUser = async (userValue) => {
    try {
      const res = await axios.post(`${urlServer}/api/auth/login`, userValue);
      if (res.data.success === true) {
        localStorage.setItem("AccessToken", res.data.accessToken);
        setOpenAlert(true);
        setInfoAlert({ message: res.data.message, time: 3000 });
      }
      await getUser();
      return res.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  //function to register new user
  const registerUser = async (userValue) => {
    try {
      const response = await axios.post(
        `${urlServer}/api/auth/register`,
        userValue
      );
      if (response.data.success === true) {
        setOpenAlert(true);
        setInfoAlert({ message: response.data.message, time: 2000 });
        navigate("/login");
      }
      console.log(userValue);
      return response;
    } catch (err) {
      if (err.response.data) return err.response.data;
      else return { success: false, message: err.message };
    }
  };

  // function to logout
  const logoutUser = () => {
    localStorage.clear();
    dispatch({
      type: "GET_USER",
      payload: { isAuthenticated: false, user: null },
    });
  };
  return (
    <AuthContext.Provider
      value={{ loginUser, isUser, logoutUser, registerUser }}
    >
      <>
        <AlertMessage
          openAlert={openAlert}
          infoAlert={infoAlert}
          setOpenAlert={setOpenAlert}
        ></AlertMessage>
        {children}
      </>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
