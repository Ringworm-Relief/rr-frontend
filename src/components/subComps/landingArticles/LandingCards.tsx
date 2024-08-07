import { Stack, Box } from "@mui/material";
import ArticleCard from "../articleCard/ArticleCard";
import OutlineCard from "../outlineCard/OutlineCard";

function LandingCards() {
  return (
    <Box>
      <Stack spacing={25}>
        <OutlineCard />
        <ArticleCard />
      </Stack>
    </Box>
  );
}

export default LandingCards;
