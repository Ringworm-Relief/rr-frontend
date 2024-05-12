import { Card, CardHeader, Stack } from "@mui/material";
import { Link } from "react-router-dom";

function NewPetCard() {
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
      <Link to="user/1/addpet">
        <Card sx={style}>
          <CardHeader title="Add Pet" />
        </Card>
      </Link>
      <Card sx={style}>
        <CardHeader title="Manage Account" />
      </Card>
    </Stack>
  );
}

export default NewPetCard;
