import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Box, Container, Button } from "@mui/material";
import { EducationArticle } from "../../utils/interfaces";
import { ArticleParams } from "../../utils/interfaces";
import { getArticlesCategory } from "../../apiCalls/articlesApiCalls";

function Article() {
  const [singleArticle, setSingleArticle] = useState<EducationArticle>();
  let { article } = useParams<ArticleParams>();
  const navigate = useNavigate();

  const getSingleArticle = (article: string) => {
    getArticlesCategory().then((data) => {
      console.log("DATA:", data);
      let singleArticle = data.data.find((data: EducationArticle) => {
        return data.id === article;
      });
      console.log(singleArticle);
      setSingleArticle(singleArticle);
    });
  };

  useEffect(() => {
    if (article) {
      getSingleArticle(article);
    }
  }, [article]);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        my: "30px",
      }}
    >
      <Typography variant="h3" sx={{ my: "6px" }}>
        {singleArticle?.attributes.title}
      </Typography>
      <Box sx={{ px: 35, mt: 3 }}>
        {singleArticle?.attributes.summary.map((paragraph) => {
          return (
            <Typography variant="body1" sx={{ my: 3 }}>
              {paragraph}
            </Typography>
          );
        })}
      </Box>
      <Button
        variant="outlined"
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </Button>
    </Container>
  );
}

export default Article;
