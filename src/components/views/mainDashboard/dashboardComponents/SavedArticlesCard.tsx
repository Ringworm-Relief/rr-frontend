import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { EducationArticle } from "../../../../utils/interfaces";
import EducationArtCard from "../../../subComps/educationArtCard/EducationArtCard";

interface Props {
  savedArticles: string[];
  handleSaves: (id: string) => void;
}

function SavedArticlesCard({ savedArticles, handleSaves }: Props) {
  const [savedArts, setSavedArts] = useState<any[]>([]);
  const navigate = useNavigate();

  const getSavedArts = () => {
    const ALLARTICLES: string[] = JSON.parse(
      localStorage.getItem("ARTICLES") || "[]"
    );
    const saved = ALLARTICLES.filter((art: any) =>
      savedArticles.includes(art.id)
    );
    setSavedArts(saved);
  };

  useEffect(() => {
    getSavedArts();
  }, []);

  const handleClick = (id: string | void) => {
    navigate(`/education/category/${id}`);
  };

  const innerWidthCheck = () => {
    if (window.innerWidth <= 915 && window.innerWidth >= 582) {
      return 500;
    } else if (window.innerWidth <= 582 && window.innerWidth >= 477) {
      return 450;
    } else if (window.innerWidth <= 477 && window.innerWidth >= 358) {
      return 350;
    } else if (window.innerWidth <= 354 && window.innerWidth >= 200) {
      return 295;
    } else {
      return 420;
    }
  };

  const savedArticleCards = savedArts.map((article: EducationArticle) => {
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
      <Grid item xs={12} sm={12} md={4} lg={5} xl={5}>
        <Card
          sx={{
            borderRadius: 1,
            boxShadow: "0px 5px 10px rgba(34, 35, 58, 0.1)",
            height: 640,
            overflow: "scroll",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "#900066",
            textAlign: "center",
            backgroundImage:
              "linear-gradient(147deg, #fea2a25a 0%, #ffc4a44f 74%)",
            "&:after": {
              opacity: 0.5,
            },
          }}
        >
          <CardHeader
            sx={{
              fontWeight: 800,
              textAlign: "center",
              mt: 2,
            }}
            title="Saved Articles"
            className="saved-articles-header"
          />
          <CardContent>
            {savedArts.length ? (
              savedArticleCards
            ) : (
              <Typography sx={{ mt: 5, textAlign: "center" }}>
                You have no articles saved.
              </Typography>
            )}
          </CardContent>
        </Card>
      </Grid>
  );
}

export default SavedArticlesCard;
