import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Typography, Box, Grid, Container } from "@mui/material";
import { EducationCategoryProps } from "../../../utils/interfaces";
import { EducationArticle, RouteParams } from "../../../utils/interfaces";
import EducationArtCard from "../../subComps/educationArtCard/EducationArtCard";
import { getArticlesCategory } from "../../../apiCalls/articlesApiCalls";

const EducationCategory: React.FC<EducationCategoryProps> = ({
  handleSaves,
  savedArticles,
}) => {
  let { category } = useParams<RouteParams>();
  const navigate = useNavigate();
  const [articles, setArticles] = useState<EducationArticle[]>([]);

  const filterCategories = () => {
    getArticlesCategory().then((data) => {
      let categoryData = data.data.filter((item: EducationArticle) => {
        return item.category === category;
      });
      setArticles(categoryData);
    });
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
      }}
    >
      <Typography sx={{ my: "20px" }} variant="h2">
        {getTitle(category)}
      </Typography>
      <Box>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          spacing={5}
          columns={3}
        >
          {articleCards}
        </Grid>
      </Box>
    </Container>
  );
};

export default EducationCategory;
