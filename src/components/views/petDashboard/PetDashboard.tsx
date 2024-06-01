import { Box, Card, CardContent, CardHeader, Grid, Stack, Typography } from "@mui/material";
import Calendar from "../calendar/Calendar";

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
  return (
    <div className="pet-dashboard">
      <Box
        padding={10}
        sx={{
          backgroundImage:
          "linear-gradient(147deg, #fea2a25a 0%, #ffc4a44f 74%)",
          "&:after": {
            opacity: 0.5,
          },
          // 16
        }}
        >
        <h1>{pet.name}</h1>
        <Grid container spacing={2} columns={2} zIndex={20}>
          {/* <Calendar user={user} pet={pet} pets={pets}/> */}
          {/* <Stack direction="row"> */}
            <Card sx={style}>
              <CardHeader title="Medication" />
              <CardContent>
                <Typography></Typography>
              </CardContent>
            </Card>
            <Card sx={style}>
              <CardHeader title="Symptoms" />
            </Card>
            <Card sx={style}>
              <CardHeader title="Diagnosis" />
            </Card>
          {/* </Stack> */}
        </Grid>
      </Box>
    </div>
  );
}
