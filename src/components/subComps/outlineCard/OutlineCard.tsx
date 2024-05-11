import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Grid,
  Box,
  Stack,
} from "@mui/material";
import { Service, services } from "../../../utils/interfaces";

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
                  <Card
                    sx={{
                      margin: "auto",
                      borderRadius: 10,
                      boxShadow: "0px 5px 10px rgba(34, 35, 58, 0.1)",
                      position: "relative",
                      maxWidth: 400,
                      height: 300,
                      marginLeft: "auto",
                      overflow: "initial",
                      background: "rgba(255, 146, 98, 0.03)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      paddingBottom: 15,
                    }}
                  >
                    <CardMedia
                      sx={{
                        width: "88%",
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginTop: -3,
                        height: 0,
                        paddingBottom: "48%",
                        borderRadius: 2,
                        backgroundColor: "#fff",
                        position: "relative",
                        "&:after": {
                          content: '" "',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          backgroundImage:
                            "linear-gradient(147deg, #fe8a39 0%, #fd3838 74%)",
                          borderRadius: 10,
                          // 16
                          opacity: 0.5,
                        },
                      }}
                    >
                      <Typography
                        textAlign="center"
                        variant="h2"
                        sx={{ mt: 5 }}
                      >
                        {service.name}
                      </Typography>
                    </CardMedia>
                    <CardContent>
                      <Typography
                        textAlign="center"
                        variant="body1"
                        sx={{ mt: 5 }}
                      >
                        {service.description}
                      </Typography>
                    </CardContent>
                    <CardActions></CardActions>
                  </Card>
                </Stack>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </div>
  );
}

export default OutlineCard;
