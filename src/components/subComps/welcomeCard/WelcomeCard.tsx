import { Card, CardContent, CardActions, Typography } from "@mui/material";

function WelcomeCard() {
  return (
    <div className="welcome-card">
      <Card>
        <CardContent>
          <Typography variant="h2">Sup</Typography>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </div>
  );
}

export default WelcomeCard;
