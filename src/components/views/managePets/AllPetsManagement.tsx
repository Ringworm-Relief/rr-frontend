// import React from "react";
// import { Grid, Stack, Typography } from "@mui/material";
// import { SinglePetChange } from "./SinglePetChangeREFORMAT";

// interface Props {
//   setPets: React.Dispatch<any>;
//   pets: any[];
// }

// export default function AllPetsManagement({ pets }: Props) {
//   const petCard = pets.map((pet: any) => {
//     return <SinglePetChange pet={pet} key={pet.id} />;
//   });

//   return (
//     <>
//       <Typography variant="h4" sx={{ textAlign: "center", mt: 6 }}>
//         Manage Pet Information
//       </Typography>
//       <Typography variant="body1" sx={{ textAlign: "center", mt: 2 }}>
//         Adjust pet information like name, diagnosis, and medications.
//       </Typography>
//       <Stack sx={{ justifyContent: "center", mt: 20 }}>
//         <Grid
//           container
//           spacing={4}
//           columns={3}
//           sx={{ justifyContent: "center" }}
//         >
//           {petCard}
//         </Grid>
//       </Stack>
//     </>
//   );
// }

import {
  Button,
  Grid,
  Stack,
  Typography
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
//   import { postPet, postMedication, postRingworm, patchPet, patchRingworm, patchMedication } from "../../../apiCalls/petApiCalls";
import { SinglePetChange } from "./SinglePetChangeREFORMAT";
import { Pet } from "../../../utils/interfaces"
import { useEffect } from "react"


interface Props {
  // setPets: React.Dispatch<any>;
  pets: Pet[];
  user: any;
  getUserPets: () => void;
}

export default function AllPetsManagement({ user, pets, getUserPets }: Props) {
 

  useEffect(() => {
    getUserPets()
  }, [])
  
  const navigate = useNavigate();
  const petCard = pets.map((pet: any) => {
    return <SinglePetChange pet={pet} key={pet.id} />;
  });

  return (
    <>
    <Typography variant="h4" sx={{ textAlign: "center", mt: 6 }}>
        Manage Pet Information
      </Typography>
      { pets.length ? 
      (<Typography variant="body1" sx={{ textAlign: "center", mt: 2 }}>
        Adjust pet information like name, diagnosis, and medications.
      </Typography>) : (
        <Stack sx={{
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center', // Ensures text is centered
          mt: 2,
        }}>
        <Typography variant="body1" sx={{ textAlign: "center", mt: 2 }}>
        You don't have any pets currently listed. Visit the Pet Intake Form to add pets.
      </Typography>
      <Button sx={{width: "10%", mt: 3}} onClick={() => navigate(`/user/${user.data.id}/addpet`)}>Visit Form</Button>
      </Stack>
      )
}
    <Stack sx={{justifyContent: "center", mt: 5, mb: 50}}>
      <Grid container spacing={4} columns={3} sx={{justifyContent: "center"}}>
        {petCard}
      </Grid>
    </Stack>
    </>
  );
}
