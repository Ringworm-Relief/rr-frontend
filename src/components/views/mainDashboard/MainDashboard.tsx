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

interface Props {
  user: any;
  savedArticles: string[]
  handleSaves: (id: string) => void; 
  pets: any[];
  setTargetPetFunc: (pet: any) => void;
  pet: any;
}

function MainDashboard({ user, savedArticles, handleSaves, pets, setTargetPetFunc, pet }: Props) {
  const navigate = useNavigate();
  return (
    <>
      {user.data.id ? (
        <Grid
        padding="10%"
        // display="flex"
        // justifyContent="center"
        >
          <Grid container spacing={2} columns={2} zIndex={20}>
            <PetCards user={user} pets={pets} setTargetPetFunc={setTargetPetFunc}/>
              <Calendar user={user} pet={pet} pets={pets}/> 
            <SavedArticlesCard savedArticles={savedArticles} handleSaves={handleSaves}/>
          </Grid>
        </Grid>
      ) : (
        navigate("/account/signin")
      )}
    </>
  );
}

export default MainDashboard;
