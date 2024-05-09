import { Card, CardContent, CardActions, Typography, Stack } from "@mui/material";

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
          <Typography variant="h2">What you're going through is hard.</Typography>
          <Typography variant="h4">I will make it harder</Typography>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </div>
  );
}

export default WelcomeCard;
