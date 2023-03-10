import React, { useEffect, useState } from "react";

import AdminNavbar from "./AdminNavbar";
import classes from "./Account.module.css";
import DrawerUI from "./DrawerUI";
import axios from "axios";
import { url } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../store/loadingSlice";
import { setIsAdmin } from "../../store/isAdminSlice";
import { setVerified } from "../../store/verifiedSlice";
import { logoutSuccess } from "../../store/userSlice";
import { toast } from "react-toastify";
import AdminList from "./ui/AdminList";

function Account() {
  const [open, setOpen] = useState(false);
  const [allAdmins, setAllAdmins] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const toggleDrawer = () => {
    if (open) setOpen(false);
  };

  useEffect(() => {
    const getAllAdmins = async () => {
      try {
        const { data } = await axios.get(`${url}/admins`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
        setAllAdmins(data.admins);
      } catch (error) {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    };
    getAllAdmins();
  }, []);

  const logoutHandler = async () => {
    try {
      dispatch(setLoading(true));
      const { data } = await axios.get(`${url}/logout`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      dispatch(setLoading(false));
      dispatch(logoutSuccess(data.user));
      dispatch(setVerified(false));
      dispatch(setIsAdmin(false));
      toast.success(`Logged Out Successfully`, {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (e) {
      console.log(e);
      dispatch(setLoading(false));
      toast.error(e.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div onClick={toggleDrawer} className={classes.container}>
      <DrawerUI open={open} setOpen={setOpen} />
      <AdminNavbar setOpen={setOpen} check={false} />
      <div className={classes.heading}>Admin</div>
      <div className={classes.adminDetails}>
        <div className={classes.image}>
          <img src="/images/ProfilePhoto.png" alt="Profile Photo" />
        </div>
        <p className={classes.email}>{user.userinfo.email}</p>
        <button className={classes.logoutButton} onClick={logoutHandler}>
          Logout
        </button>
      </div>
      <div className={classes.heading}>
        Other Admins ({allAdmins.length - 1})
      </div>
      <div className={classes.otherAdmin}>
        {allAdmins.map((admin) => {
          if (admin._id === user.userinfo._id) {
            return;
          } else {
            return (
              <AdminList
                key={admin._id}
                email={admin.email}
                date={admin.createdAt}
              />
            );
          }
        })}
      </div>
    </div>
  );
}

export default Account;
