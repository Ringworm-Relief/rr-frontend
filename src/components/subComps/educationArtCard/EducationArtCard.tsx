import {
  Card,
  CardContent,
  Typography,
  Grid,
  CardActions,
  Button,
  IconButton,
} from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import { EducationArtCardProps } from "../../../utils/interfaces";

const EducationArtCard: React.FC<EducationArtCardProps> = ({
  title,
  tagline,
  id,
  handleClick,
  handleSaves,
  isSaved,
}) => {
  return (
    <Grid item>
      <Card
        variant="outlined"
        sx={{
          width: 320,
          height: 215,
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
          resize: "horizontal",
        }}
        id={id}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6">{title}</Typography>
          <Typography>{tagline}</Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "space-between" }}>
          <IconButton onClick={() => handleSaves(id)}>
            {isSaved ? <BookmarkAddedIcon /> : <BookmarkBorderIcon />}
          </IconButton>
          <Button color="primary" onClick={() => handleClick(id)}>
            Read more
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default EducationArtCard;
