import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Grid,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { mockArticles, EducationArticle } from "../../../../utils/interfaces";
import { getArticlesCategory } from "../../../../apiCalls/articlesApiCalls";
import EducationArtCard from "../../../subComps/educationArtCard/EducationArtCard";

interface Props {
  savedArticles: string[];
  handleSaves: (id: string) => void;
}

function SavedArticlesCard({ savedArticles, handleSaves }: Props) {
  const [savedArts, setSavedArts] = useState<EducationArticle[]>([]);
  const navigate = useNavigate();

  const getSavedArts = () => {
    getArticlesCategory().then((data) => {
      const saved = data.data.filter((art: EducationArticle) =>
        savedArticles.includes(art.id)
      );
      setSavedArts(saved);
    });
  };

  const handleClick = (id: string | void) => {
    navigate(`/education/category/${id}`);
  };

  useEffect(() => {
    getSavedArts();
  }, []);

  const savedArtsLinks = savedArts.map((art) => {
    return (
      <Link to={`/education/category/${art.id}`}>{art.attributes.title}</Link>
    );
  });

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
    <Card
      sx={{
        mr: 1,
        mt: 2,
        borderRadius: 3,
        boxShadow: "0px 5px 10px rgba(34, 35, 58, 0.1)",
        position: "relative",
        width: 400,
        height: 633,
        marginLeft: 2,
        overflow: "scroll",
        // background: "rgba(255, 146, 98, 0.03)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "#900066",
        textAlign: "center",
        // paddingBottom: 15,
        backgroundImage:
            "linear-gradient(147deg, #fea2a25a 0%, #ffc4a44f 74%)",
            "&:after": {
              opacity: 0.5,
            }
      }}
    >
      <CardHeader sx={{
          fontWeight: 800,
          textAlign: 'center',
          mt: 2
        }}title="Saved Articles" 
        className="saved-articles-header"
        />
      <CardContent>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={5}
        >
          {savedArts.length ? (
            savedArticleCards
          ) : (
            <Typography sx={{ mt: 5, textAlign: 'center' }}>You have no articles saved.</Typography>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
}

export default SavedArticlesCard;
