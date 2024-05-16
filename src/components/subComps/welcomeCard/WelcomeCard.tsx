import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import React from 'react';

// Your component code here

function WelcomeCard() {
  return (
    <div className="welcome-card">
      <Card
        sx={{
          margin: "auto",
          borderRadius: 10,
          maxWidth: 1200,
          height: 600,
          background: "rgba(255, 146, 98, 0.8)",
        }}
      >
        <CardContent>
          <Typography variant="h2" sx={{ mt: 8 }}>
            Ringworm is an underestimated diagnosis
          </Typography>
          <Typography variant="h4" sx={{ mt: 8 }}>
            We're here to help
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "center", mt: 15 }}>
          <Stack direction="row">
            <Button variant="contained" color="warning" sx={{ marginRight: 8 }}>
              <Link to="account/new">Sign Up</Link>
            </Button>
            <Button variant="contained" color="warning">
              <Link to="account/signin">Sign In</Link>
              {/* Add sign in page */}
            </Button>
          </Stack>
        </CardActions>
      </Card>
    </div>
  );
}

export default WelcomeCard;
