import { Link } from "react-router-dom";
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import Pupper from "../../../../assets/Pupper-profile.svg";
import Kitty from "../../../../assets/Kitty-profile.svg";

interface Props {
  user: any;
  setTargetPetFunc: (pet: any) => void;
  pets: any[];
}

function PetCards({ user, setTargetPetFunc, pets }: Props) {
  const style = {
    borderRadius: 1,
    boxShadow: "0px 5px 10px rgba(34, 35, 58, 0.1)",
    padding: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "bottom",
    color: "#4e547d",
    "&:hover": {
      boxShadow: "0px 5px 10px rgba(34, 35, 58, 0.2)",
      cursor: "pointer",
    },
  };

  return (
    <Grid container spacing={1} direction={"row"}>
      <Grid item xs={12} sm={6} md={4} lg={3} ml={.5} mr={-.9}>
        {pets &&
          pets?.map((pet: any) => {
            return (
              <CardActions onClick={() => setTargetPetFunc(pet)}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Card key={pet.id} sx={style}>
                    <CardMedia
                      image={
                        pet.pet_type === "Dog" || pet.pet_type === "dog"
                          ? Pupper
                          : Kitty
                      }
                      sx={{
                        width: "30%",
                        marginLeft: 0.6,
                        marginRight: "auto",
                        marginTop: 0.6,
                        height: 0,
                        paddingBottom: "24%",
                        textAlign: "center",
                        backgroundImage:
                          "linear-gradient(147deg, #fe8a39 0%, #fd3838 95%)",
                        opacity: 0.9,
                      }}
                    >
                      <Typography
                        textAlign="center"
                        variant="h5"
                        fontWeight="bold"
                        color="#4e547d"
                        sx={{ mt: "20%", marginRight: -25 }}
                      >
                        {pet.name}
                      </Typography>
                    </CardMedia>
                  </Card>
                </Grid>
              </CardActions>
            );
          })}
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} ml={1.7} mt={1.5}>
        <Link
          id="add-pet-link"
          className="dash-links"
          to={`/user/${user.data.id}/addpet`}
        >
          <Card sx={style} >
            <CardHeader
              title="Add Pet"
              titleTypographyProps={{
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            />
          </Card>
        </Link>
      </Grid>
    </Grid>
  );
}

export default PetCards;
