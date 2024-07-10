import { Link } from "react-router-dom";
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
  responsiveFontSizes,
  ThemeProvider
} from "@mui/material";
import {
  EducationCategory,
  educationCategories,
} from "../../../utils/interfaces";

function EducationPageCard() {

  let h3Theme = createTheme();
  h3Theme = responsiveFontSizes(h3Theme);

  return (
      <Box sx={{ height: "100vh" }}>
        <Grid container spacing={5} height={"100vh"}>
          {educationCategories.map((educationCategory: EducationCategory) => {
            return (
              <Grid item key={educationCategory.type} xs={12} sm={6} md={4}>
                <Stack spacing={2}>
                  <Link
                    className="App_link"
                    to={`/education/${educationCategory.type}`}
                  >
                    <Card
                      sx={{
                        margin: "auto",
                        borderRadius: 10,
                        boxShadow: "0px 5px 10px rgba(34, 35, 58, 0.1)",
                        position: "relative",
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
                            opacity: 0.5,
                          },
                        }}
                      >
                        <ThemeProvider theme={h3Theme}>
                        <Typography
                          textAlign="center"
                          variant="h3"
                          sx={{ mt: 5 }}
                        >
                          {educationCategory.category}
                        </Typography>
                        </ThemeProvider>
                      </CardMedia>
                      <CardContent>
                        <Typography
                          textAlign="center"
                          variant="body1"
                          sx={{ mt: 5 }}
                        >
                          {educationCategory.description}
                        </Typography>
                      </CardContent>
                      <CardActions></CardActions>
                    </Card>
                  </Link>
                </Stack>
              </Grid>
            );
          })}
        </Grid>
      </Box>
  );
}

export default EducationPageCard;
