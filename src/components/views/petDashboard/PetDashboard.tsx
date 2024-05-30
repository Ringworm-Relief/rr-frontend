import { Box, Grid } from "@mui/material";
import Calendar from "../calendar/Calendar";


interface Props {
    pet: any;
    user: any;
    pets: any[];
}

export default function PetDashboard({pet, user, pets}: Props) {

    return (
        <div className="pet-dashboard">
            <h1>{pet.name}</h1>
            <Box
          padding={10}
          sx={{
            backgroundImage:
            "linear-gradient(147deg, #fea2a25a 0%, #ffc4a44f 74%)",
            "&:after": {

              opacity: 0.5,
            }
          // 16
          }}
        >
          <Grid container spacing={2} columns={2} zIndex={20}>
              <Calendar user={user} pet={pet} pets={pets}/>
          </Grid>
        </Box>
        </div>
    )
}