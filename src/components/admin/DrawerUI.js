import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { ListItemButton } from "@mui/material";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";
// import ListItemIcon from "@mui/material/ListItemIcon";
import { Link } from "react-router-dom";
import ListItemText from "@mui/material/ListItemText";
import classes from "./DrawerUI.module.css";

import React from "react";

function DrawerUI({ open }) {
  const listArray = [
    {
      text: "Dashboard",
      onClick: "/admin/dashboard",
    },
    {
      text: "Users",
      onClick: "/admin/users",
    },
    {
      text: "Blocked Users",
      onClick: "/admin/blockedusers",
    },
    {
      text: "Account",
      onClick: "/admin/account",
    },
  ];

  return (
    <div>
      <Drawer open={open} className={classes.drawer}>
        <List>
          {listArray.map((item, index) => {
            const { text, onClick } = item;
            return (
              <Link
                key={Math.floor(Math.random() * 1000000)}
                to={onClick}
                style={{ textDecoration: "none", color: "black" }}
              >
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              </Link>
            );
          })}
        </List>
      </Drawer>
    </div>
  );
}

export default DrawerUI;
