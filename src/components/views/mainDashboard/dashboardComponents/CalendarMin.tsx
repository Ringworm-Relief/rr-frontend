import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import NewPetCard from "./AddManageCards";
import React from 'react';

interface Props {
  user: any;
}

function CalendarMin({ user }: Props) {
  return (
    <Stack>
      <Card
        sx={{
          mr: 1,
          mt: 2,
          borderRadius: 3,
          boxShadow: "0px 5px 10px rgba(34, 35, 58, 0.1)",
          position: "relative",
          padding: 3,
          width: 600,
          height: 300,
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
        <CardHeader title="Calendar Events" />
        <CardContent>
          <List>
            <ListItem>ione</ListItem>
            <ListItem>ione</ListItem>
            <ListItem>ione</ListItem>
            <ListItem>ione</ListItem>
          </List>
        </CardContent>
      </Card>
      <NewPetCard user={user}/>
    </Stack>
  );
}

export default CalendarMin;
