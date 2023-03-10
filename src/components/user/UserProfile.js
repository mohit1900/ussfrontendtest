import React from "react";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../../store/userSlice";
import classes from "./UserProfile.module.css";
import axios from "axios";
import { setLoading } from "../../store/loadingSlice";
import { url } from "../../store/store";
import { setVerified } from "../../store/verifiedSlice";
import { setIsAdmin } from "../../store/isAdminSlice";
import { toast } from "react-toastify";
import UserNavBar from "./ui/UserNavBar";

function UserProfile() {
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      dispatch(setLoading(true));
      const { data } = await axios.get(`${url}/logout`, {
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
      });
      //   console.log(data);
      dispatch(setLoading(false));
      dispatch(logoutSuccess(data.user));
      dispatch(setVerified(false));
      dispatch(setIsAdmin(false));
      toast.success(`Logged Out Successfully`, {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      dispatch(setLoading(false));
    }
  };

  return (
    <div className={classes.container}>
      <UserNavBar flag={false} />
      <div className={classes.main}>
        <button className={classes.logoutButton} onClick={logoutHandler}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
