import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardMedia,
  Grid,
} from "@mui/material";
import profile from "../../../../assets/profile.png";
import veterinary from "../../../../assets/veterinary.png";

interface Props {
  user: any;
}

function DashboardManageAccount({ user }: Props) {
  const style = {
    mt: 2,
    borderRadius: 1,
    boxShadow: "0px 5px 10px rgba(34, 35, 58, 0.1)",
    padding: 3,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "#ffffff",
    fontWeight: "bold",
    backgroundColor: "#5E6697",
    "&:hover": {
      boxShadow: "0px 5px 10px rgba(34, 35, 58, 0.2)",
      cursor: "pointer",
    },
  };

  return (
    <Grid container spacing={2} direction={"row"}>
      <Grid item xs={12} sm={12} md={6}>
        <Link
          to={`/user/${user.data.id}/management/account`}
          className="no-underline"
        >
          <Card sx={style}>
            <CardHeader
              className="saved-articles-header"
              title="Manage Account"
            />
            <CardMedia
              component="img"
              image={profile}
              alt="Profile"
              sx={{ width: "40%", height: "auto" }}
            />
          </Card>
        </Link>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <Link
          to={`/user/${user.data.id}/management/pets`}
          className="no-underline"
        >
          <Card sx={style}>
            <CardHeader className="saved-articles-header" title="Manage Pets" />
            <CardMedia
              component="img"
              image={veterinary}
              alt="paw"
              sx={{ width: "40%", height: "auto" }}
            />
          </Card>
        </Link>
      </Grid>
    </Grid>
  );
}

export default DashboardManageAccount;
