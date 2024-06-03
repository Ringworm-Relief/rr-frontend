import {
  Grid,
  Stack,
} from "@mui/material";
import React from "react";
//   import { postPet, postMedication, postRingworm, patchPet, patchRingworm, patchMedication } from "../../../apiCalls/petApiCalls";
import { SinglePetChange } from "./SinglePetChange";
import {Pets, Pet} from "../../../utils/interfaces"

interface Props {
  pets: any[];
  setPets: React.Dispatch<any>;
  user: any;
}

export default function AllPetsManagement({ pets, user }: Props) {

  const petCard = Pets.data.pets.map((pet: any) => {
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
