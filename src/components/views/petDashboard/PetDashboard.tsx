import { Box, Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import { Medication } from "../../../utils/interfaces";
import Pupper from "../../../assets/Pupper-profile.svg";
import Kitty from "../../../assets/Kitty-profile.svg";

const style = {
  mr: 1,
  mt: 2,
  borderRadius: 3,
  boxShadow: "0px 5px 10px rgba(34, 35, 58, 0.1)",
  bottom: 100,
  left: -100,
  padding: 3,
  width: 272,
  height: 287,
  marginLeft: 0,
  overflow: "scroll",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  color: "#9A352F",
};

interface Props {
  pet: any;
  user: any;
  pets: any[];
}

export default function PetDashboard({ pet, user, pets }: Props) {
  if (!pet) {
    return <div>Loading...</div>;
  }

  console.log("PET:", pet);

  return (
    <div className="pet-dashboard">
      <Box
        padding={10}
        sx={{
          backgroundImage: "linear-gradient(147deg, #fea2a25a 0%, #ffc4a44f 74%)",
          "&:after": {
            opacity: 0.5,
          },
        }}
      >
        <Box sx={{display: "flex"}}> 
        <h1>{pet.name}</h1>
              <img  src={pet.type === "Dog" ? Pupper : Kitty} />
              </Box>
        <Grid container spacing={2} columns={2} zIndex={20}>
          <Card sx={style}>
            <CardHeader title={`About ${pet.name}`} />
            <CardContent>
              <Typography>Breed: {pet.breed}</Typography>
              <Typography>Birthday: {pet.birthday}</Typography>
            </CardContent>
          </Card>
          <Card sx={style}>
            <CardHeader title="Diagnosis" />
            <CardContent>
              <Typography>Ringworm Type: {pet.ringworm?.ringworm_type || "N/A"}</Typography>
              <Typography>Diagnosis Date: {pet.ringworm?.diagnosis_date || "N/A"}</Typography>
            </CardContent>
          </Card>
          <Card sx={style}>
            <CardHeader title="Medications" />
            <CardContent>
              {pet.medications && pet.medications.length > 0 ? (
                pet.medications.map((med: Medication, index: number) => (
                  <Card key={index} sx={{ marginBottom: 2 }}>
                    <CardContent>
                      <Typography variant="h5">{med.name}</Typography>
                      <Typography variant="body1">{med.medication_type}</Typography>
                      <Typography variant="body1">{med.dosage}</Typography>
                      <Typography variant="body1">{med.frequency}</Typography>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Typography>No medications listed.</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Box>
    </div>
  );
}




