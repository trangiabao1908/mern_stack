import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Fab,
  Container,
  Typography,
  Theme,
  SxProps,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Navbar from "../components/Navbar/Navbar";
import SinglePost from "../components/SingePost/SinglePost";
import { PostContext } from "../contexts/PostProvider";
import { AuthContext } from "../contexts/AuthProvider";
import ModalCreatePost from "../components/ModalCreatePost/ModalCreatePost";
import ModalUpdate from "../components/ModalUpdate/ModalUpdate";
const MyStyles: SxProps<Theme> = (theme: Theme) => ({
  position: "fixed",
  bottom: "15rem",
  right: "3rem",
  backgroundColor: "#FEACD2",
});
const Home = () => {
  const { postState, getPosts } = useContext(PostContext);
  const { posts, isPostLoading } = postState;
  const [openModal, setOpenCreatePost] = useState(false);
  useEffect(() => {
    getPosts();
  }, []);
  const handleCreatePost = () => {
    setOpenCreatePost(!openModal);
  };

  return (
    <React.Fragment>
      <Navbar></Navbar>
      {/* Modal Create Post  */}
      <ModalCreatePost
        openModal={openModal}
        setOpenCreatePost={setOpenCreatePost}
      ></ModalCreatePost>
      {posts.length > 0 ? (
        <>
          <Box display={"flex"} flexWrap={"wrap"} justifyContent={"center"}>
            {posts.map((post, index) => {
              return (
                <React.Fragment key={index}>
                  <SinglePost post={post}></SinglePost>
                </React.Fragment>
              );
            })}
          </Box>
          <Fab
            color="primary"
            aria-label="add"
            sx={MyStyles}
            onClick={handleCreatePost}
          >
            <AddIcon />
          </Fab>
        </>
      ) : isPostLoading ? (
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"Center"}
          height={"100vh"}
        >
          <CircularProgress color="secondary" />
        </Box>
      ) : (
        <>
          <Container
            maxWidth="lg"
            sx={{ textAlign: "center", marginTop: "50px" }}
          >
            <Box display={"flex"} flexDirection={"column"}>
              <Card raised>
                <CardHeader
                  sx={{ backgroundColor: "#f3f6f4" }}
                  title={`Đây là website mearn-stack giúp cho việc học tập`}
                  titleTypographyProps={{
                    variant: "h5",
                    align: "center",
                    color: "#000",
                  }}
                ></CardHeader>
                <CardContent>
                  <Typography
                    component={"p"}
                    fontSize={"16px"}
                    color={"#999999"}
                    marginTop={"10px"}
                  >
                    Nhấn vào nút dưới đây để tạo post đầu tiên cho bạn
                  </Typography>
                  <Button
                    onClick={handleCreatePost}
                    sx={{
                      mt: "10px",
                      backgroundColor: "#93c47d",
                      minHeight: "50px",
                    }}
                    color="primary"
                    variant="contained"
                  >
                    Create First Post!!!
                  </Button>
                </CardContent>
              </Card>
            </Box>
          </Container>
        </>
      )}
    </React.Fragment>
  );
};

export default Home;
