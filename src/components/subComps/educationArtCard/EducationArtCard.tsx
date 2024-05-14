import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { EducationArtCardProps } from '../../../utils/interfaces';


const EducationArtCard: React.FC<EducationArtCardProps> = ({ title, tagline, id, handleClick }) => {

    return (
        <Grid item >
        <Card
        variant="outlined"
        sx={{
          width: 320,
          // to make the card resizable
          overflow: 'auto',
          resize: 'horizontal',
        }}
        id={id}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
        </Box>
        <CardContent>
          <Typography variant="h6">{title}</Typography>
          <Typography >
            {tagline}
          </Typography>
        </CardContent>
        <CardActions >
          <IconButton  sx={{ mr: 'auto' }}>
            <FavoriteBorderIcon />
          </IconButton>
          <Button variant="outlined" >
            Save
          </Button>
          <Button color="primary" onClick={() => handleClick(id)}>
            Read more
          </Button>
        </CardActions>
      </Card>
      </Grid>
    )

}

export default EducationArtCard
