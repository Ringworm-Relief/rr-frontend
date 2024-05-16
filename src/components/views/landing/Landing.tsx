import React from 'react';
import WelcomeCard from "../../subComps/welcomeCard/WelcomeCard";
import LandingCards from "../../subComps/landingArticles/LandingCards";
import { Stack } from "@mui/material";

function Landing() {
  return (
    <div>
      <Stack spacing={25}>
      <WelcomeCard/>
      <LandingCards/>
      </Stack>
    </div>
  );
}

export default Landing;
