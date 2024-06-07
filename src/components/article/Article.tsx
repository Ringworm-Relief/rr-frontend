import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Box, Container, Button, Link } from "@mui/material";
import { ArticleParams } from "../../utils/interfaces";

function Article() {
  const [singleArticle, setSingleArticle] = useState<any>();
  let { article } = useParams<ArticleParams>();
  const navigate = useNavigate();

  const getSingleArticle = (article: string) => {
    const ALLARTICLES: string[] = JSON.parse(
      localStorage.getItem("ARTICLES") || "[]"
    );
    let singleArticle = ALLARTICLES.find((data: any) => {
      return data.id === article;
    });
    setSingleArticle(singleArticle);
  };
  const articleUrl = singleArticle?.attributes.url;
  const articleSource = singleArticle?.attributes.source;

  useEffect(() => {
    if (article) {
      getSingleArticle(article);
    }
  }, [article]);

  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          // alignItems: "center",
          my: "30px",
        }}
      >
        <Box sx={{ px: window.innerWidth < 800 ? 3 : 20, mt: 3 }}>
          <Typography variant="h3" sx={{ my: "6px", wordBreak: "break-word" }} >
            <Link
              href={articleUrl}
              target="_blank"
              rel="noopener"
              underline="hover"
              color="#5E6697"
             
            >
              {singleArticle?.attributes.title}
            </Link>
          </Typography>
          {articleSource != null && (
            <Typography variant="subtitle2" color="gray">
              Source:{" "}
              <Link href={articleSource} target="_blank" rel="noopener">
                {singleArticle?.attributes.source}
              </Link>
            </Typography>
          )}
          {singleArticle?.attributes.summary.map((paragraph: string) => {
            return (
              <Typography variant="body1" sx={{ my: 3 }}>
                {paragraph}
              </Typography>
            );
          })}
          <Button
            sx={{
              mr: 2,
            }}
            variant="outlined"
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </Button>
          {articleUrl != null && (
            <Button variant="outlined">
              <Link
                href={articleUrl}
                target="_blank"
                rel="noopener"
                underline="none"
              >
                Read More
              </Link>
            </Button>
          )}
        </Box>
      </Container>
    </>
  );
}

export default Article;
