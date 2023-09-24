import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Typography,
} from "@mui/material";
import Navbar from "../components/Navbar/Navbar";
import SinglePost from "../components/SingePost/SinglePost";
const Home = () => {
  const posts = [1, 2, 3, 4, 5];
  return (
    <React.Fragment>
      <Navbar></Navbar>
      <Container maxWidth="lg" sx={{ textAlign: "center", marginTop: "50px" }}>
        <Box display={"flex"} flexDirection={"column"}>
          <Card raised>
            <CardHeader
              sx={{ backgroundColor: "#f3f6f4" }}
              title="Hello TranGiaBao"
              titleTypographyProps={{
                variant: "h5",
                align: "center",
                color: "#000",
              }}
            ></CardHeader>
            <CardContent>
              <Typography component={"p"} fontSize={"18px"}>
                Đây là website mearn-stack giúp cho việc học tập
              </Typography>
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
      <Box display={"flex"} flexWrap={"wrap"} justifyContent={"center"}>
        {posts.map((post, index) => {
          return (
            <React.Fragment key={index}>
              <SinglePost></SinglePost>
            </React.Fragment>
          );
        })}
      </Box>
    </React.Fragment>
  );
};

export default Home;
