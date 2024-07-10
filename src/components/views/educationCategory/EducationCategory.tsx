import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Typography, Box, Grid, Container } from "@mui/material";
import { EducationCategoryProps } from "../../../utils/interfaces";
import { EducationArticle, RouteParams } from "../../../utils/interfaces";
import EducationArtCard from "../../subComps/educationArtCard/EducationArtCard";

const EducationCategory: React.FC<EducationCategoryProps> = ({
  handleSaves,
  savedArticles,
}) => {
  let { category } = useParams<RouteParams>();
  const navigate = useNavigate();

  const ARTICLES: string[] = JSON.parse(
    localStorage.getItem(`${category}`) || "[]"
  );
  const [articles, setArticles] = useState<any[]>(ARTICLES);

  const filterCategories = () => {
    const ALLARTICLES: string[] = JSON.parse(
      localStorage.getItem("ARTICLES") || "[]"
    );
    let categoryData = ALLARTICLES.filter((item: any) => {
      return item.category === category;
    });
    localStorage.setItem(`${category}`, JSON.stringify(categoryData));
    setArticles(categoryData);
  };

  const handleClick = (id: string | void) => {
    navigate(`/education/${category}/${id}`);
  };

  useEffect(() => {
    if (category) {
      filterCategories();
    }
  }, [category]);

  const articleCards = articles.map((article: EducationArticle) => {
    return (
      <EducationArtCard
        title={article.attributes.title}
        tagline={article.attributes.tagline}
        handleClick={handleClick}
        handleSaves={handleSaves}
        savedArticles={savedArticles}
        id={article.id}
        key={article.id}
        isSaved={savedArticles.includes(article.id)}
      />
    );
  });

  const getTitle = (category: string | undefined) => {
    switch (category) {
      case "cleaning":
        return "All things cleaning";
      case "medical":
        return "Treatment Options";
      case "general":
        return "All Things Ringworm";
      default:
        return "Unknown Category";
    }
  };

  return (
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: "30px",
          height: "100vh",
        }}
      >
        <Typography sx={{ my: "20px" }} variant="h2">
          {getTitle(category)}
        </Typography>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={5}
            columns={3}
          >
            {articleCards}
          </Grid>
      </Container>
  );
};

export default EducationCategory;
