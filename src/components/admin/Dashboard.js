import axios from "axios";
import React, { useEffect, useState } from "react";
import { url } from "../../store/store";
import AdminNavbar from "./AdminNavbar";
import classes from "./Dashboard.module.css";
import DrawerUI from "./DrawerUI";

function Dashboard() {
  const [open, setOpen] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAdmins, setTotalAdmins] = useState(0);
  const [totalBlockedUsers, setBlockedUsers] = useState(0);

  const toggleDrawer = () => {
    if (open) setOpen(false);
  };

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await axios.get(`${url}/users`, {
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
      });
      setTotalUsers(data.users.length);
    };
    const getAdmins = async () => {
      const { data } = await axios.get(`${url}/admins`, {
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
      });
      setTotalAdmins(data.admins.length);
    };
    const getBlockedUsers = async () => {
      const { data } = await axios.get(`${url}/blockedusers`, {
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
      });
      setBlockedUsers(data.blockedUsers.length);
    };
    getUsers();
    getAdmins();
    getBlockedUsers();
  }, []);
  return (
    <div onClick={toggleDrawer} className={classes.container}>
      <DrawerUI open={open} setOpen={setOpen} />
      <AdminNavbar setOpen={setOpen} check={true} />
      <div className={classes.container1}>
        <div className={classes.dashboardHeading}>Dashboard</div>
        <div className={classes.box}>
          <div className={classes.userCount}>Total Users - {totalUsers}</div>
          <div className={classes.adminCount}>Total Admins - {totalAdmins}</div>
          <div className={classes.blockedUserCount}>
            Blocked Users - {totalBlockedUsers}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
