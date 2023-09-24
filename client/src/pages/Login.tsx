import {
  Box,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  FormGroup,
  Button,
  Typography,
} from "@mui/material";
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import { Navigate } from "react-router-dom";
import AlertMessage from "../components/AlertMessage/AlertMessage";
const Login = () => {
  const [infoAlert, setInfoAlert] = useState({
    type: "success",
    message: "",
    time: 3000,
  });
  const [openAlert, setOpenAlert] = useState(false);
  const { loginUser, isUser } = useContext(AuthContext);
  const [loginValue, setLoginValue] = useState({
    username: "",
    password: "",
  });
  const { isAuthenticated } = isUser;
  const handleLogin = async () => {
    try {
      const user = await loginUser(loginValue);
      if (!user.success) {
        setOpenAlert(true);
        setInfoAlert({ type: "error", message: user.message, time: 3000 });
      }
      console.log(user);
    } catch (err) {
      console.log(err);
    }
  };
  const handleChangeValueLogin = (event) => {
    setLoginValue({ ...loginValue, [event.target.name]: event.target.value });
  };
  if (localStorage.getItem("AccessToken") && isAuthenticated) {
    return <Navigate to="/"></Navigate>;
  }
  return (
    <React.Fragment>
      <AlertMessage
        openAlert={openAlert}
        infoAlert={infoAlert}
        setOpenAlert={setOpenAlert}
      ></AlertMessage>
      <Box
        sx={{ userSelect: "none" }}
        height={"100vh"}
        display={"flex"}
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        bgcolor={"#fef3f8"}
      >
        <Box bgcolor={"#fff"} border={"none"} borderRadius={7}>
          <FormGroup
            sx={{ maxWidth: "600px", padding: "35px", width: "400px" }}
          >
            <FormControl sx={{ mb: "15px" }}>
              <InputLabel htmlFor="username" sx={{ userSelect: "none" }}>
                Username
              </InputLabel>
              <Input
                id="username"
                aria-describedby="my-helper-text"
                type="text"
                fullWidth
                name="username"
                onChange={handleChangeValueLogin}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                aria-describedby="my-helper-text"
                type="password"
                fullWidth
                name="password"
                onChange={handleChangeValueLogin}
              />
              <FormHelperText id="my-helper-text">
                We'll never share your password.
              </FormHelperText>
            </FormControl>
            <Button
              onClick={handleLogin}
              type="submit"
              sx={{
                bgcolor: "#b1ddf9",
                marginTop: "25px",
                color: "#fff",
                "&:hover": { backgroundColor: "grey" },
              }}
            >
              Login
            </Button>
            <Box
              display={"flex"}
              flexDirection={"row"}
              alignItems={"center"}
              mt={2}
            >
              <Typography component={"span"} fontSize={"15px"}>
                You don't have account?
              </Typography>
              <Link to="/register" style={{ textDecoration: "none" }}>
                <Typography
                  component={"span"}
                  fontSize={"15px"}
                  ml={"10px"}
                  sx={{ "&:hover": { color: "black" } }}
                  color={"#999999"}
                >
                  REGISTER ACCOUNT
                </Typography>
              </Link>
            </Box>
          </FormGroup>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default Login;
