import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { Pets } from "../../../../utils/interfaces";
import React from 'react';
function PetCards() {
  return (
    <Grid container spacing={2} columns={3}>
      {Pets.map((pet) => {
        return (
          <Grid item>
            <Card
              sx={{
                mr: 1,
                mt: 2,
                borderRadius: 3,
                boxShadow: "0px 5px 10px rgba(34, 35, 58, 0.1)",
                position: "relative",
                minWidth: 200,
                maxHeight: 200,
                //   overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                //   paddingBottom: 15,
              }}
            >
              <CardMedia
                image={
                  "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*"
                }
                sx={{
                  width: "50%",
                  marginLeft: 0.6,
                  marginRight: "auto",
                  marginTop: 0.6,
                  height: 0,
                  paddingBottom: "34%",
                  borderRadius: 10,
                  textAlign: "center",
                  backgroundImage:
                    "linear-gradient(147deg, #fe8a39 0%, #fd3838 95%)",
                  opacity: 0.9,
                  color: "#9A352F",
                  "&:after": {
                    content: '" "',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    borderRadius: 10,
                    opacity: 0.1,
                  },
                }}
              >
                <Typography
                  textAlign="center"
                  variant="h5"
                  fontWeight="bold"
                  sx={{ mt: "20%", marginTop: 5, marginRight: -25 }}
                >
                  {pet.pet_name}
                </Typography>
              </CardMedia>
              <CardContent>
                <Typography textAlign="center" variant="body1" sx={{ mt: 5 }}>
                  {pet.medication_name}
                </Typography>
                <Typography textAlign="center" variant="body1">
                  {pet.medication_dosage + " " + pet.medication_frequency}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default PetCards;
