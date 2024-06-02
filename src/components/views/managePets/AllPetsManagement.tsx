import {
  Grid,
  Stack,
} from "@mui/material";
import React from "react";
//   import { postPet, postMedication, postRingworm, patchPet, patchRingworm, patchMedication } from "../../../apiCalls/petApiCalls";
import { SinglePetChange } from "./SinglePetChange";

interface Props {
  pets: any[];
  setPets: React.Dispatch<any>;
  user: any;
}

export default function AllPetsManagement({ pets, user }: Props) {

  const petCard = pets.map((pet) => {
    return <SinglePetChange pet={pet} user={user} key={pet.Id} />;
  });

  return (
    <Stack sx={{justifyContent: "center", mt: 20}}>
      <Grid container spacing={2} columns={3} sx={{justifyContent: "center"}}>
        {petCard}
      </Grid>
    </Stack>
  );
}
