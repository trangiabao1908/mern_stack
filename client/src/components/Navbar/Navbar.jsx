import React, { useContext } from "react";
import {
  AppBar,
  Box,
  Button,
  ListItemIcon,
  Toolbar,
  Typography,
} from "@mui/material";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { AuthContext } from "../../contexts/AuthProvider";
const Navbar = () => {
  const { logoutUser, isUser } = useContext(AuthContext);
  const handleLogout = () => {
    logoutUser();
  };
  return (
    <React.Fragment>
      <AppBar position="fixed" sx={{ backgroundColor: "#FEACD2" }}>
        <Toolbar>
          <Box
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            top={0}
            sx={{ overflow: "hidden" }}
            width={1}
            py={2}
            height={"70px"}
          >
            <Box flex={1} display={"flex"}>
              <Typography variant="h5" component={"div"} color={"black"}>
                Mern-Stack Web
              </Typography>
              <Typography
                variant="h6"
                color={"black"}
                component={"div"}
                ml={"20px"}
              >
                About
              </Typography>
            </Box>
            <Box
              display={"flex"}
              justifyContent={"right"}
              alignItems={"center"}
            >
              <Typography variant="h6" color={"black"} mr={"20px"}>
                {isUser?.user?.username && `Welcome ${isUser.user.username}`}
              </Typography>
              <Button
                onClick={handleLogout}
                sx={{
                  backgroundColor: "#e6f8fb",
                  border: "1px solid #e6f8fb",
                  borderRadius: "5px",
                  marginRight: "10px",
                  maxWidth: "100%",
                  minWidth: "100px",
                }}
              >
                {
                  <ListItemIcon>
                    <LogoutOutlinedIcon
                      fontSize="small"
                      sx={{ marginRight: "5px", marginTop: "1px" }}
                    ></LogoutOutlinedIcon>
                    Logout
                  </ListItemIcon>
                }
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Navbar;
