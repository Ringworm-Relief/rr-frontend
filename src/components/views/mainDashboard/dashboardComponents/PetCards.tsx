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
import { Link } from "react-router-dom";

interface Props {
  user: any;
  setTargetPetFunc: (pet: any) => void;
  pets: any[];
}

function PetCards({ user, setTargetPetFunc, pets }: Props) {
  console.log("USER:", user)
  
    const innerWidthCheck = () => {
      if(window.innerWidth <= 582 && window.innerWidth >= 477) {
        return 400
      } else if(window.innerWidth <= 477 && window.innerWidth >= 358) {
        return 315
      } else if(window.innerWidth <= 354 && window.innerWidth >= 200) {
        return 270
      }else {
        return 200
      } 
    }

  const style = {
    mr: 1,
    mt: 2,
    borderRadius: 3,
    boxShadow: "0px 5px 10px rgba(34, 35, 58, 0.1)",
    position: "relative",
    minWidth: innerWidthCheck(),
    height: 80,
    width: 90,
    padding: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "bottom",
    color: "#900066",
    backgroundImage:
            "linear-gradient(147deg, #fea2a25a 0%, #ffc4a44f 74%)",
            "&:after": {

              opacity: 0.5,
            },
    "&:hover": {
      boxShadow: "0px 5px 10px rgba(34, 35, 58, 0.2)",
      cursor: "pointer",
    },
  };

  const cardMediaStyle = {
    width: "100%",
    height: 140, // Adjust height as necessary
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  return (
    <Grid container spacing={2} columns={3}>
      {pets && pets?.map((pet: any) => {
        return (
          <CardActions onClick={() => setTargetPetFunc(pet)}>
            <Grid item>
              <Card key={pet.id} sx={style}>
                <CardMedia
                  image={pet.pet_type === "Dog" || pet.pet_type === "dog" ? Pupper : Kitty}
                  sx={{
                    width: "40%",
                    marginLeft: 0.6,
                    marginRight: "auto",
                    marginTop: 0.6,
                    height: 0,
                    paddingBottom: "34%",
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
                    color="#900066"
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
      <Grid item >
        <Link
          id="add-pet-link"
          className="dash-links"
          to={`/user/${user.data.id}/addpet`}
        >
          <Card sx={style}>
            <CardHeader
              title="Add Pet +"
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
