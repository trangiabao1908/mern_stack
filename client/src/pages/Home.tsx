import React, { useContext, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Typography,
  CircularProgress,
} from "@mui/material";
import Navbar from "../components/Navbar/Navbar";
import SinglePost from "../components/SingePost/SinglePost";
import { PostContext } from "../contexts/PostProvider";
import { AuthContext } from "../contexts/AuthProvider";
const Home = () => {
  const { postState, getPosts } = useContext(PostContext);
  const { isUser } = useContext(AuthContext);
  const { post, posts, isPostLoading } = postState;
  console.log(postState);
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <React.Fragment>
      <Navbar></Navbar>

      {posts.length > 0 ? (
        <Box display={"flex"} flexWrap={"wrap"} justifyContent={"center"}>
          {posts.map((post, index) => {
            return (
              <React.Fragment key={index}>
                <SinglePost post={post}></SinglePost>
              </React.Fragment>
            );
          })}
        </Box>
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
      )}
    </React.Fragment>
  );
};

export default Home;
