import {
  Grid,
  Stack,
  Typography
} from "@mui/material";
import React from "react";
//   import { postPet, postMedication, postRingworm, patchPet, patchRingworm, patchMedication } from "../../../apiCalls/petApiCalls";
import { SinglePetChange } from "../manageAccount/SinglePetChangeREFORMAT";
import { Pet } from "../../../utils/interfaces"
import { useState, useEffect } from "react"
import { fetchPets } from "../../../apiCalls/petApiCalls";

interface Props {
  setPets: React.Dispatch<any>;
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
