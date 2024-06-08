import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Box, Grid, Container, Button } from "@mui/material";
import {
  EducationArticle,
  SavedArticlesProps,
} from "../../../utils/interfaces";
import EducationArtCard from "../../subComps/educationArtCard/EducationArtCard";

const SavedArticles: React.FC<SavedArticlesProps> = ({
  savedArticles,
  handleSaves,
}) => {
  const navigate = useNavigate();
  const [allArticles, setAllArticles] = useState<any[]>([]);

  const getSavedArticles = () => {
    const ALLARTICLES: string[] = JSON.parse(
      localStorage.getItem("ARTICLES") || "[]"
    );
    setAllArticles(ALLARTICLES);
  };

  const handleClick = (id: string | void) => {
    navigate(`/education/category/${id}`);
  };

  useEffect(() => {
    getSavedArticles();
  }, []);

  const savedArticleCards = allArticles.map((article: EducationArticle) => {
    if (savedArticles.includes(article.id)) {
      return (
        <EducationArtCard
          title={article.attributes.title}
          tagline={article.attributes.tagline}
          handleClick={handleClick}
          handleSaves={handleSaves}
          savedArticles={savedArticles}
          id={article.id}
          key={article.id}
          isSaved={true}
        />
      );
    }
  });

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        mb: "30px",
        height: "80vh",
      }}
    >
      <Typography sx={{ my: "20px" }} variant="h2">
        Saved Articles
      </Typography>
      {savedArticles.length ? (
        <Box>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={5}
            sx={{ gridTemplateColumns: "repeat(3, 1fr)" }}
          >
            {savedArticleCards}
          </Grid>
        </Box>
      ) : (
        <>
          <Typography variant="h4">
            You don't have any articles saved
          </Typography>
          <Button onClick={() => navigate("/education")}>
            Browse Articles
          </Button>
        </>
      )}
    </Container>
  );
};

export default SavedArticles;
