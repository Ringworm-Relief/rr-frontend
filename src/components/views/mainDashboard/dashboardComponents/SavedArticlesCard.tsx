import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { mockArticles, EducationArticle } from "../../../../utils/interfaces";
import { getArticlesCategory } from "../../../../apiCalls/articlesApiCalls";

interface Props {
  savedArticles: string[];
}

function SavedArticlesCard({ savedArticles }: Props) {
  const [savedArts, setSavedArts] = useState<EducationArticle[]>([]);

  const getSavedArts = () => {
    getArticlesCategory().then((data) => {
      const saved = data.data.filter((art: EducationArticle) =>
        savedArticles.includes(art.id)
      );
      setSavedArts(saved);
    });
  };

  useEffect(() => {
    getSavedArts();
  }, []);

  const savedArtsLinks = savedArts.map((art) => {
    return (
      <Link to={`/education/category/${art.id}`}>{art.attributes.title}</Link>
    );
  });

  return (
    <Card
      sx={{
        mr: 1,
        mt: 2,
        borderRadius: 3,
        boxShadow: "0px 5px 10px rgba(34, 35, 58, 0.1)",
        position: "relative",
        width: "auto",
        height: 700,
        marginLeft: 0,
        overflow: "scroll",
        // background: "rgba(255, 146, 98, 0.03)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "#9A352F",
        // paddingBottom: 15,
      }}
    >
      <CardHeader title="Saved Articles" />
      <CardContent>
        <List>
          {savedArts.length ? (
            savedArtsLinks
          ) : (
            <p>You have no articles saved.</p>
          )}
        </List>
      </CardContent>
    </Card>
  );
}

export default SavedArticlesCard;
