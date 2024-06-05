
import WelcomeCard from "../../subComps/welcomeCard/WelcomeCard";
import LandingCards from "../../subComps/landingArticles/LandingCards";
import { Stack } from "@mui/material";

function Landing() {
  return (
    <>
      <Stack spacing={25}>
      <WelcomeCard/>
      <LandingCards/>
      </Stack>
    </>
  );
}

export default Landing;