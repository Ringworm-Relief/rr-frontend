import {
  Container,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Button,
  FormHelperText,
  Modal,
  Grid,
  Stack,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import React, { useState } from "react";
import bacteria from "../../../assets/bacteria.png";
import pill from "../../../assets/pill.png";
import paw from "../../../assets/paw.png";
import MedicationsCard from "../../subComps/medicationsCard/MedicationsCard";
//   import { postPet, postMedication, postRingworm, patchPet, patchRingworm, patchMedication } from "../../../apiCalls/petApiCalls";
import { Pet, Medication, Ringworm } from "../../../utils/interfaces";
import { SinglePetChange } from "./SinglePetChange";

interface Props {
  pets: any[];
  setPets: React.Dispatch<any>;
  user: any;
}

export default function AllPetsManagement({ pets, setPets, user }: Props) {
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
