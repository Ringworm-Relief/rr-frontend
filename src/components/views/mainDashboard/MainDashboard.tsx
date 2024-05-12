import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Stack,
} from "@mui/material";
import styled from "@mui/system/styled";
import { Link } from "react-router-dom";
import { Pets } from "../../../utils/interfaces";
import Pupper from "../../../assets/pupper.jpg";

function MainDashboard() {
  const Item = styled("div")(({ theme }) => ({
    border: "1px solid",
    borderColor: theme.palette.mode === "dark" ? "#444d58" : "#ced7e0",
    padding: theme.spacing(20),
    margin: theme.spacing(2),
    borderRadius: "10px",
    textAlign: "center",
    backgroundImage: "linear-gradient(147deg, #fe8a39 0%, #fd3838 95%)",
    // backgroundImage: "linear-gradient(147deg, #fe8a39 0%, #A9AA72 95%)",
    opacity: 0.5,
  }));

  return (
    <Box padding={10}>
      <Grid container justifyContent={"center"}>
        {Pets.map((pet) => {
          return (
            <Grid xs={4} md={4} lg={4}>
              <Card
                sx={{
                  mb: 10,
                  mx: 2,
                  borderRadius: 10,
                  border: "1px solid #ced7e0",
                  boxShadow: "none",
                  position: "relative",
                  maxWidth: 400,
                  maxHeight: 200,
                  marginLeft: "auto",
                  overflow: "initial",
                  background: "rgba(255, 146, 98, 0.03)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  paddingBottom: 15,
                }}
              >
                <CardMedia
                  image={"https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*"}
                  sx={{
                    width: "50%",
                    marginLeft: .6,
                    marginRight: "auto",
                    marginTop: .6,
                    height: 0,
                    paddingBottom: "34%",
                    borderRadius: 10,
                    textAlign: "center",
                    // backgroundImage: "linear-gradient(147deg, #fe8a39 0%, #fd3838 95%)",
                    // opacity: 0.9,
                    color: "#9A352F",
                    "&:after": {
                      content: '" "',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      backgroundImage:
                        "linear-gradient(147deg, #fe8a39 0%, #fd3838 74%)",
                      borderRadius: 10,
                      // 16
                      opacity: 0.1,
                    },
                  }}
                >
                  <Typography textAlign="center" variant="h4" fontWeight="bold" sx={{ mt: "20%", marginTop: 5, marginRight: -43 }}>
                    {pet.pet_name}
                  </Typography>
                </CardMedia>
                <CardContent>
                  <Typography textAlign="center" variant="h5" sx={{ mt: 5 }}>
                    {pet.medication_name}
                  </Typography>
                  <Typography textAlign="center" variant="h5">
                    {pet.medication_dosage + " " + pet.medication_frequency}
                  </Typography>
                </CardContent>
              </Card>
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
        {/* <Grid xs={4} sm={4} md={4}> */}
          {/* Map through pets after fetch is included
          instead of pets, each pet will be a card */}
          {/* <Link to={`/user/1/addpet`}>
            <Item>
              <Typography textAlign="center" variant="h3">
                Add Pet
              </Typography>
            </Item>
          </Link>
        </Grid> */}
        <Grid xs={4} md={4}>
          <Link to="/education">
            <Item>
              <Typography textAlign="center" variant="h5">
                Saved Articles
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
      </Grid>
    </Box>
  );
}

export default MainDashboard;
