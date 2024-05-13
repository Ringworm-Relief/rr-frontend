import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import CoolestCat from "../../../assets/RR-3.svg";

function WelcomeCard() {
  return (
    <div className="welcome-card">
      <Card
        sx={{
          mt: 8,
          boxShadow: "none",
          maxWidth: 1200,
          height: 600,
          p: "30px",
          // background: "rgba(255, 146, 98, 0.8)",
        }}
      >
        <Stack direction="row">
          <CardContent sx={{ pt: 6, pb: 8 }}>
            <Typography variant="h2" sx={{ fontWeight: 800 }}>
              Ringworm, Relief,
            </Typography>
            <Typography variant="h2" sx={{  pb: 4, fontWeight: 800, color: "#FEA1A2" }}>
              Repeat?
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, color: "#56575A" }}
            >
              Nope! Just <span id="char_emphasis">R</span>ingworm then{" "}
              <span id="char_emphasis">R</span>elief. Use our education,
              tracking, and <br />
              orginization to track all your furry friends treatment.
              <br />
              No more wondering when the last time you treated your pet was,{" "}
              <br />
              or cluttering your personal calendar with reminders. <br />
            </Typography>
          </CardContent>
          <CardMedia image={CoolestCat} sx={{ width: "30%", ml: "10%", mt: 2,}}></CardMedia>
        </Stack>
        <CardActions sx={{ p: "16px" }}>
          <Stack>
            <Button variant="contained" sx={{ backgroundColor: "#5E6697" }}>
              <Link className="Welcome_button_text" to="account/new">
                Get Started Here
              </Link>
            </Button>
            <Button variant="outlined" sx={{ mt: 1, border: "none" }}>
              <Link
                className="Welcome_button_text"
                id="sign_in_button"
                to="account/signin"
              >
                Sign In
              </Link>
              {/* Add sign in page */}
            </Button>
          </Stack>
        </CardActions>
      </Card>
    </div>
  );
}

export default WelcomeCard;
