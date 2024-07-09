import { Card, CardContent, Typography, Box, Grid } from "@mui/material";
import { Article, mockArticles } from "../../../utils/interfaces";

function ArticleCard() {
  return (
    <div className="article-card">
      <Box>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          spacing={5}
          columns={3}
          mb={25}
          mt={10}
        >
          {mockArticles.map((article: Article) => {
            return (
              <Grid item>
                <Card
                  sx={{
                    height: 400,
                    maxWidth: 345,
                    boxShadow: "none",
                    overflowY: "auto",
                    transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                  }}
                >
                  <CardContent>
                    <Typography textAlign="left" variant="h2">
                      {article.title}
                    </Typography>
                    {article.paragraphs.map((paragraph: string) => {
                      return (
                        <Typography
                          textAlign="left"
                          variant="body1"
                          color="text.secondary"
                          sx={{ mt: 5 }}
                        >
                          {paragraph}
                        </Typography>
                      );
                    })}
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </div>
  );
}

export default ArticleCard;
