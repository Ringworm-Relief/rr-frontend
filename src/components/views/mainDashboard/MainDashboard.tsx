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
import PetCards from "./dashboardComponents/PetCards";
import SavedArticlesCard from "./dashboardComponents/SavedArticlesCard";
import CalendarMin from "./dashboardComponents/CalendarMin";
// import NewPetCard from "./dashboardComponents/NewPetCard";

import { useNavigate } from "react-router-dom";

interface Props {
  user: any;
  savedArticles: string[]
}

function MainDashboard({ user, savedArticles }: Props) {
  const navigate = useNavigate();
  return (
    <>
      {user.id ? (
        <Box
          padding={10}
          sx={{
            backgroundImage:
            "linear-gradient(147deg, #fea2a25a 0%, #ffc4a44f 74%)",
            "&:after": {

              opacity: 0.5,
            }
          // 16
          }}
        >
          <Grid container spacing={2} columns={2} zIndex={20}>
            <PetCards />
            <CalendarMin user={user}/>
            <SavedArticlesCard savedArticles={savedArticles} />
          </Grid>
        </Box>
      ) : (
        navigate("/account/signin")
      )}
    </>
  );
}

export default MainDashboard;
