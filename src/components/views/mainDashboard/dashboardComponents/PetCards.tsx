import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  SvgIcon,
  Typography,
} from "@mui/material";
import { Pet } from "../../../../utils/interfaces";
import Pupper from "../../../../assets/Pupper-profile.svg";
import Kitty from "../../../../assets/Kitty-profile.svg";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { Pets } from "../../../../utils/interfaces";
import { useState, useEffect } from "react"
import { fetchPets } from "../../../../apiCalls/petApiCalls";

interface Props {
  user: any;
  setTargetPetFunc: (pet: any) => void;
}

function PetCards({ user, setTargetPetFunc }: Props) {
  console.log("USER:", user)
  const style = {
    mr: 1,
    mt: 2,
    borderRadius: 3,
    boxShadow: "0px 5px 10px rgba(34, 35, 58, 0.1)",
    // boxShadow: "none",
    // border: "1px solid #252525",
    position: "relative",
    minWidth: 200,
    height: 80,
    width: 90,
    padding: 2,
    //   overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "bottom",
    color: "#900066",
    backgroundImage:
            "linear-gradient(147deg, #fea2a25a 0%, #ffc4a44f 74%)",
            "&:after": {

              opacity: 0.5,
            },
    //   paddingBottom: 15,
    "&:hover": {
      boxShadow: "0px 5px 10px rgba(34, 35, 58, 0.2)",
      cursor: "pointer",
    },
  };

  const [pets, setPets] = useState<Pet[] | undefined>([])

  // const displayPets = () => {
  //   fetchPets(user.data.id)
  //   .then((data: any) => {
  //     if (data.data.pets) {
  //     setPets(data.data.pets)
  //     }
  //   })
  // }

  const displayPets = () => {
    fetchPets(user.data.id)
      .then((data: any) => {
        if (data && data.data && data.data.pets) {
          setPets(data.data.pets);
        } else {
          setPets([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching pets:", error);
        setPets([]);
      });
  };

  useEffect(() => {
    displayPets()
  }, [user.data.id])


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
                    color="#900066"
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
              // sx={{ padding: 0 }}
            />
          </Card>
        </Link>
      </Grid>
    </Grid>
  );
}

export default PetCards;
