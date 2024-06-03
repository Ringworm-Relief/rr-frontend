import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Calendar from "../calendar/Calendar";
import Pupper from "../../../assets/Pupper-profile.svg";
import Kitty from "../../../assets/Kitty-profile.svg";

interface Props {
  pet: any;
  user: any;
  pets: any[];
}

export default function PetDashboard({ pet, user, pets }: Props) {
  const style = {
    mr: 1,
    mt: 2,
    borderRadius: 3,
    boxShadow: "0px 5px 10px rgba(34, 35, 58, 0.1)",
    // position: "sticky",
    bottom: 100,
    left: -100,
    padding: 3,
    width: 272,
    height: 287,
    marginLeft: 0,
    overflow: "scroll",
    // background: "rgba(255, 146, 98, 0.03)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "#9A352F",
    // paddingBottom: 15,
  };

  const oralMeds = pet.medications.filter((med: any) => med.type === "Oral");
  const topicalMeds = pet.medications.filter(
    (med: any) => med.type === "Topical"
  );

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
              <img  alt={"dog"} src={pet.type === "Dog" ? Pupper : Kitty} />
              </Box>
        <Grid container spacing={2} columns={2} zIndex={20}>
          {/* <Calendar user={user} pet={pet} pets={pets}/> */}
          {/* <Stack direction="row"> */}
          <Card sx={style}>
            <CardHeader title="Medication" />
            <CardContent>
             
            </CardContent>
          </Card>
          {/* </Stack> */}
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
              {/* {pet.medications.length ? ( */}
               <Typography variant="h6">Oral:</Typography>
                 {oralMeds.map((med: any) => {
                 return (
                   <Typography variant="body1" key={med.name}>
                     {med.name}: {med.dosage}
                   </Typography>
                 );
               })}
               <Typography variant="h6">Topical:</Typography>
               {topicalMeds.map((med: any) => {
                 return (
                   <Typography variant="body2" key={med.name}>
                     {med.name}: {med.dosage}
                   </Typography>
                 );
               })}
              {/* ) : (
                <Typography>No medications listed.</Typography>
              )} */}
            </CardContent>
          </Card>
        </Grid>
      </Box>
    </div>
  );
}




