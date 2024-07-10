import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Grid,
  Box,
  Stack,
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material";
import { motion } from "framer-motion";
import { Service, services } from "../../../utils/interfaces";

function OutlineCard() {
  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  return (
      <Box sx={{ backgroundColor: "#ecedff4b", padding: 5 }}>
        <Typography
          variant="h3"
          fontSize="5rem"
          display="flex"
          justifyContent="center"
          paddingTop={5}
          color="#5E6697"
        >
          Our Services
        </Typography>
        <Grid
          container
          justifyContent="center"
          paddingY={15}
        >
          {services.map((service: Service) => {
            return (
              <motion.div
                whileInView={{ opacity: 1, scale: 0.9 }}
                initial={{ opacity: 0, scale: 0.5 }}
                transition={{
                  duration: 0.8,
                  delay: 0.1,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
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
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        paddingBottom: 15,
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
                          opacity: 0.04,
                        },
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
                          borderRadius: 10,
                          backgroundColor: "#fffff",
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
                            opacity: 0.4,
                          },
                        }}
                      >
                        <ThemeProvider theme={theme}>
                        <Typography
                          textAlign="center"
                          variant="h2"
                          fontWeight={500}
                          sx={{ mt: 5 }}
                        >
                          {service.name}
                        </Typography>
                        </ThemeProvider>
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
              </motion.div>
            );
          })}
        </Grid>
      </Box>
  );
}

export default OutlineCard;
