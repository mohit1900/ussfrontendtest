import axios from "axios";
import React, { useEffect, useState } from "react";
import { url } from "../../store/store";
import AdminNavbar from "./AdminNavbar";
import classes from "./BlockedUsers.module.css";
import DrawerUI from "./DrawerUI";
import BlockList from "./ui/BlockList";

function BlockedUsers() {
  const [open, setOpen] = useState(false);
  const [blockedUsers, setBlockedUsers] = useState([]);

  const toggleDrawer = () => {
    if (open) setOpen(false);
  };

  useEffect(() => {
    const getBlockedUsers = async () => {
      try {
        const { data } = await axios.get(`${url}/blockedusers`, {
          headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        });
        setBlockedUsers(data.blockedUsers);
        // console.log(data);
      } catch (e) {
        console.log(e);
      }
    };
    getBlockedUsers();
  }, []);

  return (
    <div onClick={toggleDrawer} className={classes.container}>
      <DrawerUI open={open} setOpen={setOpen} />
      <AdminNavbar setOpen={setOpen} check={true} />
      <div className={classes.heading}>
        Blocked Users ({blockedUsers.length})
      </div>
      <div className={classes.listContainer}>
        {blockedUsers.map((user) => (
          <BlockList
            key={user._id}
            email={user.email}
            name={user.name}
            avatar={user.avatar}
            id={user._id}
          />
        ))}
      </div>
    </div>
  );
}

export default BlockedUsers;
