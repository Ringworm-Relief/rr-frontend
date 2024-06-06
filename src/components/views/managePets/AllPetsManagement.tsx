import {
  Grid,
  Stack,
} from "@mui/material";
import React from "react";
//   import { postPet, postMedication, postRingworm, patchPet, patchRingworm, patchMedication } from "../../../apiCalls/petApiCalls";
import { SinglePetChange } from "./SinglePetChange";
import { Pet } from "../../../utils/interfaces"
import { useState, useEffect } from "react"
import { fetchPets } from "../../../apiCalls/petApiCalls";

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
