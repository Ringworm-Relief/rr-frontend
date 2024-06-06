import { Box, Stack, Typography } from "@mui/material";
import sadCat from "../../../assets/sad-kitty3.svg";
import water from "../../../assets/water-background.svg";

export default function Error() {
  localStorage.setItem("SADCAT", JSON.stringify(sadCat));
  localStorage.setItem("WATER", JSON.stringify(water));
  const sadCat1 = JSON.parse(localStorage.getItem("SADCAT") || "");
  const water1 = JSON.parse(localStorage.getItem("WATER") || "");
  return (
    <Box sx={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", height: "80vh",  backgroundImage:`url(${water1})`, backgroundRepeat: "no-repeat"}}>
        <img
          alt="Drawing of a sad cat wearing sunglesses"
          src={sadCat1}
          height="400px"
          width="400px"
        ></img>
      <Box mt={5}>
        <Typography variant="h4">Ruh Roh..</Typography>
        <Typography variant="h6">
          The page you're after was treated for ringworm and doesn't exist
        </Typography>
      </Box>
    </Box>
  );
}
