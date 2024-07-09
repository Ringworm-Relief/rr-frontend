import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import PetCards from "./dashboardComponents/PetCards";
import SavedArticlesCard from "./dashboardComponents/SavedArticlesCard";
import Calendar from "../calendar/Calendar";
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
  }, []);

  return (
    <>
      {user.data.id ? (
        // <Grid padding="5%">
          <Grid container spacing={2} zIndex={20} p={5} columns={{ xs: 4, sm: 8, md: 12 }}>
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
        // </Grid>
      ) : (
        navigate("/account/signin")
      )}
    </>
  );
}

export default MainDashboard;
