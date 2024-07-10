import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { SinglePetChange } from "./SinglePetChangeREFORMAT";
import { Pet } from "../../../utils/interfaces";

interface Props {
  pets: Pet[];
  user: any;
  getUserPets: () => void;
}

export default function AllPetsManagement({ user, pets, getUserPets }: Props) {
  useEffect(() => {
    getUserPets();
  }, []);

  const navigate = useNavigate();
  const petCard = pets.map((pet: any) => {
    return <SinglePetChange pet={pet} key={pet.id} />;
  });

  return (
    <>
      <Typography variant="h4" sx={{ textAlign: "center", mt: 6 }}>
        Manage Pet Information
      </Typography>
      {pets.length ? (
        <Typography variant="body1" sx={{ textAlign: "center", mt: 2 }}>
          Adjust pet information like name, diagnosis, and medications.
        </Typography>
      ) : (
        <Stack
          sx={{
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center", // Ensures text is centered
            mt: 2,
          }}
        >
          <Typography variant="body1" sx={{ textAlign: "center", mt: 2 }}>
            You don't have any pets currently listed. Visit the Pet Intake Form
            to add pets.
          </Typography>
          <Button
            sx={{ width: "10%", mt: 3 }}
            onClick={() => navigate(`/user/${user.data.id}/addpet`)}
          >
            Visit Form
          </Button>
        </Stack>
      )}
      <Stack direction="column" sx={{ mt: 5, height: "80vh" }}>
        <Grid
          container
          spacing={4}
          // columns={3}
          sx={{ justifyContent: "center" }}
        >
          {petCard}
        </Grid>
      </Stack>
    </>
  );
}
