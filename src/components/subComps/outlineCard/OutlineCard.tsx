import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Box,
  Stack,
} from "@mui/material";
import { Service, services } from "../../../utils/utils";

function OutlineCard() {
  return (
    <div className="outline-card">
      <Box>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          spacing={5}
          columns={3}
        >
          {services.map((service: Service) => {
            return (
              <Grid item>
                <Stack spacing={2}>
                  <Card sx={{ height: 400, maxWidth: 345 }}>
                    <CardContent>
                      <Typography textAlign="center" variant="h2">
                        {service.name}
                      </Typography>
                      <Typography textAlign="center" variant="body1">
                        {service.description}
                      </Typography>
                    </CardContent>
                    <CardActions></CardActions>
                  </Card>
                </Stack>
              </Grid>
            )
          })}
        </Grid>
      </Box>
    </div>
  );
}

export default OutlineCard;
