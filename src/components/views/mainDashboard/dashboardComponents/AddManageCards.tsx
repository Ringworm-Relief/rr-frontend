import { Card, CardHeader, Stack } from "@mui/material";
import { Link } from "react-router-dom";

interface Props {
  user: any;
}

function DashboardManageAccount({ user }: Props) {
  const style = {
    mr: 1,
    mt: 2,
    borderRadius: 3,
    boxShadow: "0px 5px 10px rgba(34, 35, 58, 0.1)",
    // position: "sticky",
    bottom: 100,
    left: -100,
    padding: 3,
    width: 272,
    height: 287,
    marginLeft: 0,
    overflow: "scroll",
    // background: "rgba(255, 146, 98, 0.03)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "#9A352F",
    // paddingBottom: 15,
  };
  return (
    <Stack direction="row">
      <Link to={`/user/${user.data.id}/management/account`}>
      <Card sx={style}>
        <CardHeader title="Manage Account" />
      </Card>
      </Link>
      <Link to={`/user/${user.data.id}/management/pets`}>
      <Card sx={style}>
        <CardHeader title="Manage Pets" />
      </Card>
      </Link>
    </Stack>
  );
}

export default DashboardManageAccount;
