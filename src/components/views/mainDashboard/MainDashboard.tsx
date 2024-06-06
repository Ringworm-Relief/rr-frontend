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
// import CalendarMin from "./dashboardComponents/CalendarMin";
// import NewPetCard from "./dashboardComponents/NewPetCard";

import { useNavigate } from "react-router-dom";
import Calendar from "../calendar/Calendar";
import { useEffect } from "react";

interface Props {
  user: any;
  savedArticles: string[];
  handleSaves: (id: string) => void;
  pets: any[];
  getUserPets: () => void;
  setTargetPetFunc: (pet: any) => void;
}

function MainDashboard({
  user,
  savedArticles,
  handleSaves,
  pets,
  getUserPets,
  setTargetPetFunc,
}: Props) {
  const navigate = useNavigate();
  useEffect(() => {
    getUserPets();
  }, [])
  return (
    <>
      {user.data.id ? (
        <Grid
          padding="10%"
          // display="flex"
          // justifyContent="center"
        >
          <Grid container spacing={2} columns={2} zIndex={20}>
            <PetCards
              user={user}
              pets={pets}
              setTargetPetFunc={setTargetPetFunc}
            />
            <Calendar user={user} pets={pets} />
            <SavedArticlesCard
              savedArticles={savedArticles}
              handleSaves={handleSaves}
            />
          </Grid>
        </Grid>
      ) : (
        navigate("/account/signin")
      )}
    </>
  );
}

export default MainDashboard;
