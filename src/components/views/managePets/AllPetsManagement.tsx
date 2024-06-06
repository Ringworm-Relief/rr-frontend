import React from "react";
import { Grid, Stack, Typography } from "@mui/material";
import { SinglePetChange } from "./SinglePetChangeREFORMAT";

interface Props {
  setPets: React.Dispatch<any>;
  pets: any[];
}

export default function AllPetsManagement({ pets }: Props) {
  const petCard = pets.map((pet: any) => {
    return <SinglePetChange pet={pet} key={pet.id} />;
  });

  return (
    <>
      <Typography variant="h4" sx={{ textAlign: "center", mt: 6 }}>
        Manage Pet Information
      </Typography>
      <Typography variant="body1" sx={{ textAlign: "center", mt: 2 }}>
        Adjust pet information like name, diagnosis, and medications.
      </Typography>
      <Stack sx={{ justifyContent: "center", mt: 20 }}>
        <Grid
          container
          spacing={4}
          columns={3}
          sx={{ justifyContent: "center" }}
        >
          {petCard}
        </Grid>
      </Stack>
    </>
  );
}
