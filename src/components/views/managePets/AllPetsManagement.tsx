import {
  Grid,
  Stack,
  Typography
} from "@mui/material";
import React from "react";
//   import { postPet, postMedication, postRingworm, patchPet, patchRingworm, patchMedication } from "../../../apiCalls/petApiCalls";
import { SinglePetChange } from "./SinglePetChangeREFORMAT";
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
    <>
    <Typography variant="h4" sx={{ textAlign: "center", mt: 6 }}>
        Manage Pet Information
      </Typography>
      <Typography variant="body1" sx={{ textAlign: "center", mt: 2 }}>
        Adjust pet information like name, diagnosis, and medications.
      </Typography>
    <Stack sx={{justifyContent: "center", mt: 20}}>
      <Grid container spacing={4} columns={3} sx={{justifyContent: "center"}}>
        {petCard}
      </Grid>
    </Stack>
    </>
  );
}
