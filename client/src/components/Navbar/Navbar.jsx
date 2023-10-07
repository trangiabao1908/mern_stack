import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SearchIcon from "@mui/icons-material/Search";
import {
  AppBar,
  Box,
  Button,
  InputBase,
  ListItemIcon,
  Popper,
  Toolbar,
  Typography,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { urlServer } from "../../contexts/constants";
import { useDebounce } from "../../hooks/useDebounce";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const ClearsearchWrapper = styled("div")(({ theme }) => ({
  position: "absolute",
  cursor: "pointer",
  right: 3,
  top: "50%",
  display: "flex",
  transform: "translateY(-50%)",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(0, 2),
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Navbar = () => {
  const { logoutUser, isUser } = useContext(AuthContext);
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const searchRef = useRef();
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    if (searchResult.length > 0) {
      setAnchorEl(searchRef.current);
    } else {
      setAnchorEl(null);
    }
  }, [searchResult]);

  const handleChangeSearchValue = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(" ")) {
      setSearchValue(searchValue);
    }
  };
  const debounceValue = useDebounce(searchValue, 500);
  useEffect(() => {
    const accessToken = localStorage.getItem("AccessToken");
    if (!debounceValue.trim()) {
      setSearchResult([]);
      return;
    }
    const fecthSearch = async () => {
      if (debounceValue !== "") {
        const res = await axios.get(
          `${urlServer}/api/posts/search/${debounceValue}`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: ` Bearer ${accessToken} `,
            },
          }
        );
        if (res.data.success) {
          setSearchResult(res.data.searchPost);
        }
      }
    };
    fecthSearch();
  }, [debounceValue]);
  const handleClearSearchValue = () => {
    setSearchValue("");
    setSearchResult([]);
  };
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
              <Search ref={searchRef}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  value={searchValue}
                  onChange={handleChangeSearchValue}
                  placeholder="Search..."
                />
                {searchValue && (
                  <ClearsearchWrapper onClick={handleClearSearchValue}>
                    <HighlightOffOutlinedIcon></HighlightOffOutlinedIcon>
                  </ClearsearchWrapper>
                )}
              </Search>
              <Popper id={id} open={open} anchorEl={anchorEl}>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  minHeight={"100px"}
                  width={"300px"}
                  maxWidth={"500px"}
                  sx={{
                    borderRadius: "4px",
                    bgcolor: "#FEACD2",
                    border: "2px solid #FEACD2",
                    mt: "20px",
                    boxShadow: "rgb(0 0 0 / 12%) 0px 2px 12px",
                  }}
                >
                  <Typography
                    mt={1}
                    variant="h4"
                    component={"div"}
                    sx={{
                      padding: "5px 12px",
                      color: "rgba(22,24,35,0.5)",
                      fontSize: "1.2rem",
                      fontWeight: "500",
                    }}
                  >
                    Posts
                  </Typography>
                  {searchResult.map((post) => {
                    return (
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                            "&:hover": { bgcolor: "rgba(22, 24, 35, 0.03)" },
                            padding: "6px 16px",
                          }}
                        >
                          <Box flex={"1"}>
                            <Typography>
                              <span>Title: {post.title}</span>
                            </Typography>
                            <Typography>
                              <span>Description: {post.description}</span>
                            </Typography>
                          </Box>
                          <Box>
                            <Typography>Status: {post.status}</Typography>
                          </Box>
                        </Box>
                      </>
                    );
                  })}
                </Box>
              </Popper>
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
