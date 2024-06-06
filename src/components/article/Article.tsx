import { getArticlesCategory } from "../../apiCalls/articlesApiCalls";
import { useState, useEffect } from "react";
import { EducationArticle } from "../../utils/interfaces";
import { useParams, useNavigate} from "react-router-dom";
import { Typography, Box, Container, Button } from "@mui/material";
import { ArticleParams } from "../../utils/interfaces";


function Article() {
  const [singleArticle, setSingleArticle] = useState<EducationArticle>();
  let { article } = useParams<ArticleParams>();
  const navigate = useNavigate();

  const getSingleArticle = (article: string) => {
    getArticlesCategory().then((data) => {
      let singleArticle = data.data.find((data: EducationArticle) => {
        return data.id === article;
      });
      setSingleArticle(singleArticle);
    });
  };
  const articleUrl = singleArticle?.attributes.url
  const articleSource = singleArticle?.attributes.source
  console.log("url", articleUrl)

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
        <a href={articleUrl} className= "App_link">
          {singleArticle?.attributes.title}
        </a>
      </Typography>
      {articleSource != null &&
        <Typography variant="subtitle1">
          Source: <a href={articleSource} className= "App_link">
            {singleArticle?.attributes.source}
          </a>
        </Typography>
      }
      <Box sx={{ px: 35, mt: 3 }}>
        {singleArticle?.attributes.summary.map((paragraph) => {
          return (
            <Typography variant="body1" sx={{ my: 3 }}>
              {paragraph}
            </Typography>
          );
        })}
      </Box>
      <Box>
      {articleUrl != null && (
        <Button
          variant="outlined"
          onClick={() => {
            if (articleUrl) {
            window.location.href = articleUrl;
            }
            else {
            console.error('Article URL is undefined');
            }
          }}
        >
          Read More
        </Button>
      )}
        <Button
          variant="outlined"
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </Button>
      </Box>
    </Container>
  );
}

export default Article;
