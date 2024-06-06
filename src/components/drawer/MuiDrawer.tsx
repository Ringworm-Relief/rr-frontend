import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { IconButton, ListItem, ListItemButton, ListItemText, List, Drawer, Divider, Box   } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Props {
  user: any;
}

function MuiDrawer({ user }: Props) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const navigateTo = (key: string) => () => {
    switch (key) {
      case "Sign In":
        navigate("/account/signin");
        break;
      case "Dashboard":
        navigate(user ? `/user/${user.data.id}/dashboard` : "/account/signin");
        break;
      case "Calendar":
        navigate(user ? `/user/${user.data.id}/calendar` : "/account/signin");
        break;
      case "Saved Articles":
        navigate("/savedarticles");
        //Change to /user/1/savedArticles
        break;
      case "Add Pet":
        navigate(user ? `/user/${user.data.id}/addpet` : "/account/signin");
        break;
      case "Manage Account":
        navigate(
          user ? `/user/${user.data.id}/management/account` : "/account/signin"
        );
        break;
      case "Manage Pets":
        navigate(
          user ? `/user/${user.data.id}/management/pets` : "/account/signin"
        );
        break;
      case "Education":
        navigate("/education");
        break;
    }
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {["Sign In", "Dashboard"].map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton onClick={navigateTo(item)}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["Education", "Calendar", "Saved Articles", "Add Pet"].map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton onClick={navigateTo(item)}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["Manage Account", "Manage Pets"].map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton onClick={navigateTo(item)}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer(true)}
        sx={{ ...(open && { display: "none" }) }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}

export default MuiDrawer;
