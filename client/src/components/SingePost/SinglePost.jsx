import React from "react";
import { Card, Grid, Typography, CardContent, Box } from "@mui/material";
import ButtonActionPost from "../ButtonActionPost/ButtonActionPost";

const SinglePost = () => {
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
        border: "2px solid #f9a170",
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
                ReactJS
              </Typography>
              <Typography
                variant=""
                bgcolor={"#f9a170"}
                color={"#fff"}
                border={"1px solid #f9a170"}
                borderRadius={"10px"}
                px={"5px"}
                py={"2px"}
              >
                TO LEARN
              </Typography>
            </Grid>
            <Grid item xs={4} sx={{ height: "100%" }}>
              <ButtonActionPost></ButtonActionPost>
            </Grid>
          </Grid>
        </Box>
        <Typography component={"p"} fontSize={"14px"} sx={{ color: "#999999" }}>
          Description
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SinglePost;
