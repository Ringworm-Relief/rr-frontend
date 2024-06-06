import {
  Grid,
  Stack,
} from "@mui/material";
import React from "react";
import { SinglePetChange } from "./SinglePetChange";

interface Props {
  setPets: React.Dispatch<any>;
  pets: any[];
  user: any;
}

export default function AllPetsManagement({ user, pets }: Props) {

  const petCard = pets.map((pet: any) => {
    return <SinglePetChange pet={pet} user={user} key={pet.id} />;
  });

  return (
    <Stack sx={{ mt: 20, height: "100vh"}}>
      <Grid container spacing={2} columns={3} sx={{justifyContent: "center"}}>
        {petCard}
      </Grid>
    </Stack>
  );
}
