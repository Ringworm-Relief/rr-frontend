import { Card, CardContent, CardActions, Typography } from "@mui/material";

function ArticleCard() {
  return (
    <div className="article-card">
      <Card
        sx={{
          height: 400,
          maxWidth: 345,
          boxShadow: "none",
          transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
          "&:hover": {
            boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
            transform: "scale(1.04)",
          },
        }}
      >
        <CardContent>
          <Typography textAlign="left" variant="h2">Article Card</Typography>
          <Typography textAlign="left" variant="body1" color="text.secondary">
            BFGBSDJGB gsdjgsdkgj gjssji gedfg fguhgsioghguiab fgbsdj gsnkgd
            gskngS dhdhdgjndfz bnhkjdhgdhd hzghfsdJKGJSC
          </Typography>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </div>
  );
}

export default ArticleCard;
