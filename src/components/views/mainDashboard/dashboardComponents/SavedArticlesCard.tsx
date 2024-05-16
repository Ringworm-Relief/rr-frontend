import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { mockArticles } from "../../../../utils/interfaces";
import React from 'react';
function SavedArticlesCard() {
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
          {mockArticles.map((article) => (
            <ListItem key={article.title}>
              <ListItemText primary={article.tagline} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default SavedArticlesCard;
