import { Box, Grid, Typography } from "@mui/material";
import styled from "@mui/system/styled";
import { Link } from "react-router-dom";

function MainDashboard() {
  const Item = styled("div")(({ theme }) => ({
    border: "1px solid",
    borderColor: theme.palette.mode === "dark" ? "#444d58" : "#ced7e0",
    padding: theme.spacing(20),
    margin: theme.spacing(2),
    borderRadius: "10px",
    textAlign: "center",
    backgroundImage: "linear-gradient(147deg, #fe8a39 0%, #fd3838 95%)",
    opacity: 0.5,
  }));

  return (
    <Box>
      <Grid container justifyContent={"center"}>
        <Grid xs={6} md={6}>
          <Link to={`/user/1/calendar`}>
          <Item>
            <Typography textAlign="center" variant="h3">
              Calendar
            </Typography>
          </Item>
          </Link>
        </Grid>
        <Grid xs={4}>
          {/* Map through pets after fetch is included
          instead of pets, each pet will be a card */}
          <Link to={`/user/1/addpet`}>
          <Item>
            <Typography textAlign="center" variant="h3">
              Pets
            </Typography>
          </Item>
          </Link>
        </Grid>
        <Grid xs={4}>
          <Item>
            <Typography textAlign="center" variant="h3">
              Account Management
            </Typography>
          </Item>
        </Grid>
        <Grid xs={6} md={6}>
          <Link to='/education'>
          <Item>
            <Typography textAlign="center" variant="h3">
              Saved Article
            </Typography>
          </Item>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MainDashboard;
