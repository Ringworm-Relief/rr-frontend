import { Card, CardContent, CardHeader, CardMedia, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import profile from "../../../../assets/profile.png";
import veterinary from "../../../../assets/veterinary.png";
import { useState } from "react";

interface Props {
  user: any;
}

function DashboardManageAccount({ user }: Props) {
  const [userAtt, setUserAtt] = useState<any>(user.data.attributes);
  const innerWidthCheck = () => {
    if(window.innerWidth <= 915 && window.innerWidth >= 582) {
      return 450
    } else if(window.innerWidth <= 582 && window.innerWidth >= 477) {
        return 400
      } else if(window.innerWidth <= 477 && window.innerWidth >= 358) {
        return 300
      } else if(window.innerWidth <= 354 && window.innerWidth >= 200) {
        return 245
      }else {
        return 375
      } 
  }

  const style = {
    mr: 1,
    mt: 2,
    borderRadius: 3,
    boxShadow: "0px 5px 10px rgba(34, 35, 58, 0.1)",
    bottom: 100,
    left: -100,
    padding: 3,
    width: innerWidthCheck(),
    height: 220,
    marginLeft: 0,
    overflow: "scroll",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "#900066",
    fontWeight: "bold",
    backgroundImage: "linear-gradient(147deg, #fea2a25a 0%, #ffc4a44f 74%)",
    "&:after": {
      opacity: 0.5,
    },
    "&:hover": {
      boxShadow: "0px 5px 10px rgba(34, 35, 58, 0.2)",
      cursor: "pointer",
    },
  };

  return (
    <Stack direction={window.innerWidth >= 915 ? "row" : "column"}>
      <Link to={`/user/${user.data.id}/management/account`} className="no-underline">
        <Card sx={style}>
          <CardHeader className="saved-articles-header" title="Manage Account" />
          <CardMedia
            component="img"
            image={profile}
            alt="Profile"
            sx={{ width: "25%", height: "auto" }}
          />
          <CardContent
            sx={{ padding: 0, mt: 1, textDecoration: "none" }}
            className="manage-account"
          >{`${userAtt.first_name} ${userAtt.last_name}`}</CardContent>
          <CardContent className="manage-account">{`${userAtt.email} `}</CardContent>
        </Card>
      </Link>
      <Link to={`/user/${user.data.id}/management/pets`} className="no-underline">
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
    </Stack>
  );
}

export default DashboardManageAccount;
