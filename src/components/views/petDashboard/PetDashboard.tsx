import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  Divider,
} from "@mui/material";
import { formateDate2 } from "../../../utils/interfaces";
import Kitty from "../../../assets/Kitty-profile.svg";
import Pupper from "../../../assets/Pupper-profile.svg";

interface Props {
  pet: any;
}

export default function PetDashboard({ pet }: Props) {
  const style = {
    mr: 1,
    mt: 4,
    borderRadius: 1,
    boxShadow: "0px 5px 10px rgba(34, 35, 58, 0.1)",
    bottom: 100,
    left: -100,
    padding: 3,
    height: 300,
    marginLeft: 0,
    overflow: "hide",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "#4e547d",
    textAlign: "center",
  };

  const oralMeds = pet.medications.filter(
    (med: any) => med.medication_type === "Oral"
  );
  const topicalMeds = pet.medications.filter(
    (med: any) => med.medication_type === "Topical"
  );

  return (
    <div className="pet-dashboard">
      <Box
        sx={{
          backgroundColor: "#ECEDFF" ,
          paddingBottom: "40px",
          "&:after": { opacity: 0.5 },
        }}
        minHeight="100vh"
      >
        <Box
          px={window.innerWidth <= 500 ? 3 : 10}
          py={3}
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: 2,
            // backgroundColor: "#5E6697",
            // backgroundImage:
            //   "linear-gradient(147deg, #ECEDFF 0%, #B48BCC 20%, #ECEDFF 94%)",
            // "&:after": { opacity: 0.5 },
          }}
        >
          <Typography variant="h1" sx={{ fontSize: "50px", color: "#4e547d" }}>
            {pet.name}'s dashboard
          </Typography>
        </Box>
        <Grid
          px={window.innerWidth <= 780 ? 1 : 10}
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={style}>
              <CardHeader
                titleTypographyProps={{
                  fontSize: "1.8rem",
                  fontWeight: "bold",
                }}
                title={`About ${pet.name}`}
                sx={{ padding: "0 16px", marginBottom: 0 }}
              />
              <CardContent sx={{ paddingTop: "20px" }}>
                <img
                  className="pet-img"
                  alt={
                    pet.pet_type === "Dog" || pet.pet_type === "dog"
                      ? "dog"
                      : "cat"
                  }
                  src={
                    pet.pet_type === "Dog" || pet.pet_type === "dog"
                      ? Pupper
                      : Kitty
                  }
                />
                <Typography>
                  {pet.name} is a <strong>{pet.breed},</strong>
                </Typography>
                <Typography>
                  born on <strong>{formateDate2(pet.birthday)}.</strong>
                </Typography>
                <Typography sx={{ paddingTop: "15px" }}>
                  {pet.name} has ringworm, but we're going to{" "}
                  <strong>fix that!</strong>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={style}>
              <CardHeader
                titleTypographyProps={{
                  fontSize: "1.8rem",
                  fontWeight: "bold",
                }}
                title="Diagnosis"
                sx={{ padding: "0 16px", marginBottom: 0 }}
              />
              <CardContent sx={{ paddingTop: "20px" }}>
                <Typography>
                  <strong>Ringworm Type</strong>
                </Typography>
                <Typography>{pet.ringworm?.ringworm_type || "N/A"}</Typography>
                <Divider sx={{ my: 2 }} />
                <Typography>
                  <strong>Diagnosis Date</strong>
                </Typography>
                <Typography>
                  {formateDate2(pet.ringworm?.diagnosis_date) || "N/A"}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography>
                  <strong>Symptoms</strong>
                  {pet.ringworm.symptoms ? (
                    pet.ringworm.symptoms.map((symp: string) => (
                      <Typography variant="body2" key={symp}>
                        • {symp}
                      </Typography>
                    ))
                  ) : (
                    <Typography>No symptoms listed.</Typography>
                  )}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={style}>
              <CardHeader
                titleTypographyProps={{
                  fontSize: "1.8rem",
                  fontWeight: "bold",
                }}
                title="Medications"
                sx={{ padding: "0 16px", marginBottom: 0 }}
              />
              <CardContent sx={{ paddingTop: "20px" }}>
                <Typography variant="h6" marginBottom="5px">
                  Oral
                </Typography>
                {oralMeds.length
                  ? oralMeds.map((med: any) => (
                      <Typography variant="body1" key={med.name}>
                        • {med.name}: {med.dosage}, {med.frequency}
                      </Typography>
                    ))
                  : "No oral meds listed."}
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" marginBottom="5px">
                  Topical
                </Typography>
                {topicalMeds.length
                  ? topicalMeds.map((med: any) => (
                      <Typography variant="body1" key={med.name}>
                        • {med.name}: {med.dosage}, {med.frequency}
                      </Typography>
                    ))
                  : "No topical meds listed."}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
