/* eslint-disable react/prop-types */
import { Card, Grid, Typography, CardContent, Box } from "@mui/material";
import ButtonActionPost from "../ButtonActionPost/ButtonActionPost";

const SinglePost = (props) => {
  const { post } = props;
  return (
    <Card
      raised
      sx={{
        margin: "20px",
        minWidth: "400px",
        maxWidth: "700px",
        "&:hover": {
          boxShadow: "md",
        },
        padding: "8px",
        border:
          post.status === "LEARNED"
            ? "2px solid #a7e7c3"
            : post.status === "LEARNING"
            ? "2px solid #f9a170"
            : "2px solid #D32F2F",
      }}
    >
      <CardContent>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          mb={"30px"}
        >
          <Grid container>
            <Grid item xs={8} sx={{ height: "100%" }}>
              <Typography variant="h6" mb={"5px"}>
                {post.title}
              </Typography>
              <Typography
                variant=""
                sx={
                  post.status == "LEARNED"
                    ? { bgcolor: "#a7e7c3" }
                    : post.status == "LEARNING"
                    ? { bgcolor: "#f9a170" }
                    : { bgcolor: "#D32F2F" }
                }
                color={"#fff"}
                borderRadius={"10px"}
                px={"7px"}
                py={"3px"}
              >
                {post.status}
              </Typography>
            </Grid>
            <Grid item xs={4} sx={{ height: "100%" }}>
              <ButtonActionPost postValue={post}></ButtonActionPost>
            </Grid>
          </Grid>
        </Box>
        <Typography component={"p"} fontSize={"14px"} sx={{ color: "#999999" }}>
          {post.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SinglePost;
