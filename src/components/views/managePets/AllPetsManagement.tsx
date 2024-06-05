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
  // pets: Pet[];
  user: any;
}

export default function AllPetsManagement({ user }: Props) {
  const [pets, setPets] = useState<Pet[]>([])

  const displayPets = () => {
    fetchPets(user.data.id)
    .then((data: any) => {
      setPets(data.data.pets)
    })
  }

  useEffect(() => {
    displayPets()
  }, [])

  const petCard = pets.map((pet: any) => {
    return <SinglePetChange pet={pet} user={user} key={pet.id} />;
  });

  return (
    <Stack sx={{justifyContent: "center", mt: 20}}>
      <Grid container spacing={2} columns={3} sx={{justifyContent: "center"}}>
        {petCard}
      </Grid>
    </Stack>
  );
}
