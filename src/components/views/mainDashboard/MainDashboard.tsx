import { Box, Grid, Typography, Card,
  CardContent,
  CardActions,
  CardMedia,
  Stack, } from "@mui/material";
import styled from "@mui/system/styled";
import { Link } from "react-router-dom";
import { Pets } from "../../../utils/interfaces";

function MainDashboard() {
  const Item = styled("div")(({ theme }) => ({
    border: "1px solid",
    borderColor: theme.palette.mode === "dark" ? "#444d58" : "#ced7e0",
    // padding: theme.spacing(20),
    margin: theme.spacing(2),
    borderRadius: "10px",
    textAlign: "center",
    backgroundImage: "linear-gradient(147deg, #fe8a39 0%, #fd3838 95%)",
    opacity: 0.5,
  }));

  return (
    <Box padding={10}>
      <Grid container justifyContent={"center"}>
          {Pets.map((pet) => {
            return (
              <Grid xs={4} md={4} lg={4}>
              <Item sx={{padding: 10}}>
                <Typography textAlign="center" variant="h4">
                  {pet.pet_name}
                </Typography>
                <Typography textAlign="center" variant="h5">
                  {pet.medication_name}
                </Typography>
                <Typography textAlign="center" variant="h5">
                  {pet.medication_dosage  + " " + pet.medication_frequency} 
                </Typography>
              </Item>
              </Grid>
            );
          })}
        <Grid xs={8} sm={8} md={8}>
          <Link to={`/user/1/calendar`}>
          <Item>
            <Typography textAlign="center" variant="h3">
              Calendar
            </Typography>
          </Item>
          </Link>
        </Grid>
        <Grid xs={4} sm={4} md={4}>
          {/* Map through pets after fetch is included
          instead of pets, each pet will be a card */}
          <Link to={`/user/1/addpet`}>
          <Item>
            <Typography textAlign="center" variant="h3">
              Add Pet
            </Typography>
          </Item>
          </Link>
        </Grid>
        <Grid xs md>
          <Item>
            <Typography textAlign="center" variant="h5">
              Account Management
            </Typography>
          </Item>
        </Grid>
        <Grid xs md>
          <Link to='/education'>
          <Item>
            <Typography textAlign="center" variant="h5">
              Saved Articles
            </Typography>
          </Item>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MainDashboard;
