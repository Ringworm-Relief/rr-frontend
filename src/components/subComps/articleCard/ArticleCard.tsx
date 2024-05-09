import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Grid,
  Stack,
} from "@mui/material";

import { Article, mockArticles } from "../../../utils/utils";

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
        >
          {mockArticles.map((article: Article) => {
            return (
              <Grid item>
                <Card
                  sx={{
                    height: 400,
                    maxWidth: 345,
                    boxShadow: "none",
                    transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                    "&:hover": {
                      boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
                      transform: "scale(1.01)",
                    },
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
                                sx={{ mt: 5}}
                            >
                                {paragraph}
                            </Typography>
                        )
                    })}
                  </CardContent>
                  <CardActions></CardActions>
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
