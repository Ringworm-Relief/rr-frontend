import EducationPageCard from "../../subComps/educationPageCard/EducationPageCard";
import { Container } from "@mui/material";

function Education() {
  return (
    <Container
      sx={{
        mt: 18,
        mb: 100,
      }}
    >
      <EducationPageCard />
    </Container>
  );
}

export default Education;
