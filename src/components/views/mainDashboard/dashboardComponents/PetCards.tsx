import { Card, CardActions, CardContent, CardHeader, CardMedia, Grid, SvgIcon, Typography } from "@mui/material";
// import { Pets } from "../../../../utils/interfaces";
import Pupper from "../../../../assets/Pupper-profile.svg";
import Kitty from "../../../../assets/Kitty-profile.svg";
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';

interface Props {
  user: any;
  pets: any[];
  setTargetPetFunc: (pet: any) => void
}

function PetCards({pets, user, setTargetPetFunc}: Props) {

  const style = {
    mr: 1,
    mt: 2,
    borderRadius: 3,
    boxShadow: "0px 5px 10px rgba(34, 35, 58, 0.1)",
    // boxShadow: "none",
    // border: "1px solid #252525",
    position: "relative",
    minWidth: 200,
    maxHeight: 200,
    //   overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    //   paddingBottom: 15,
    "&:hover": {
      boxShadow: "0px 5px 10px rgba(34, 35, 58, 0.2)",
      cursor: "pointer",
    }
  }
  return (
    <Grid container spacing={2} columns={3}>
      {pets.map((pet) => {
        return (
        <CardActions onClick={() => setTargetPetFunc(pet)}>
          <Grid item>
            <Card
              sx={style}
            >
              <CardMedia
                image={pet.pet_type === "Dog" ? Pupper : Kitty}
                sx={{
                  width: "30%",
                  marginLeft: 0.6,
                  marginRight: "auto",
                  marginTop: 0.6,
                  height: 0,
                  paddingBottom: "34%",
                  textAlign: "center",
                  backgroundImage:
                    "linear-gradient(147deg, #fe8a39 0%, #fd3838 95%)",
                  opacity: 0.9,
                  // color: "#252525",
                  // "&:after": {
                  //   content: '" "',
                  //   position: "absolute",
                  //   top: 0,
                  //   left: 0,
                  //   width: "100%",
                  //   height: "100%",
                  //   borderRadius: 10,
                  //   opacity: 0.1,
                  // },
                }}
              >
                <Typography
                  textAlign="center"
                  variant="h5"
                  fontWeight="bold"
                  sx={{ mt: "20%", marginRight: -25 }}
                >
                  {pet.name}
                </Typography>
              </CardMedia>
              {/* <CardContent>
                <Typography textAlign="center" variant="body1" sx={{ mt: 1 }}>
                  {pet.medication_name}
                </Typography>
                <Typography textAlign="center" variant="body1">
                  {pet.medication_dosage + " " + pet.medication_frequency}
                </Typography>
              </CardContent> */}
            </Card>
          </Grid>
          </CardActions>
        );
      })}
      <Grid item>
      <Link to={`/user/${user.data.id}/addpet`}>
        <Card sx={style}>
          <CardHeader title="Add Pet" />
        </Card>
      </Link>
      </Grid>
    </Grid>
  );
}

export default PetCards;
