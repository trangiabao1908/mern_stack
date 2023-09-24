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

const Register = () => {
  const [infoAlert, setInfoAlert] = useState({
    type: "success",
    time: 3000,
    message: "",
  });
  const [openAlert, setOpenAlert] = useState(false);
  const { registerUser } = useContext(AuthContext);
  const [registerValue, setRegistervalue] = useState({
    username: "",
    password: "",
  });
  const handleChangeValueRegister = (event) => {
    setRegistervalue({
      ...registerValue,
      [event.target.name]: event.target.value,
    });
  };
  const handleRegister = async () => {
    try {
      const register = await registerUser(registerValue);
      if (!register.success) {
        setOpenAlert(true);
        setInfoAlert({ type: "error", message: register.message, time: 3000 });
      }
    } catch (err) {
      console.log(err);
    }
  };
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
                onChange={handleChangeValueRegister}
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
                onChange={handleChangeValueRegister}
              />
              <FormHelperText id="my-helper-text">
                We'll never share your password.
              </FormHelperText>
            </FormControl>
            <Button
              onClick={handleRegister}
              type="submit"
              sx={{
                bgcolor: "#b1ddf9",
                marginTop: "25px",
                color: "#fff",
                "&:hover": { backgroundColor: "grey" },
              }}
            >
              REGISTER
            </Button>
            <Box
              display={"flex"}
              flexDirection={"row"}
              alignItems={"center"}
              mt={2}
            >
              <Typography component={"span"} fontSize={"15px"}>
                You have account?
              </Typography>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Typography
                  component={"span"}
                  fontSize={"15px"}
                  ml={"10px"}
                  sx={{ "&:hover": { color: "black" } }}
                  color={"#999999"}
                >
                  LOGIN
                </Typography>
              </Link>
            </Box>
          </FormGroup>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default Register;
