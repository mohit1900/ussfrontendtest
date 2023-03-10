import axios from "axios";
import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { setIsAdmin } from "../../store/isAdminSlice";
// import { setIsBlocked } from "../../store/isBlockedSlice";
// import { setLoading } from "../../store/loadingSlice";
import { url } from "../../store/store";
// import { loadUserFail, loadUserSuccess } from "../../store/userSlice";
// import { setVerified } from "../../store/verifiedSlice";
import AdminNavbar from "./AdminNavbar";
import DrawerUI from "./DrawerUI";
import UserList from "./ui/UserList";
import classes from "./Users.module.css";
import { toast } from "react-toastify";

function Users() {
  const [open, setOpen] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentUsers, setCurrentUsers] = useState([]);
  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const recheckUser = async () => {
  //     try {
  //       dispatch(setLoading(true));
  //       const { data } = await axios.get(`${url}/me`, {
  //         headers: {
  //           "Content-type": "application/json",
  //         },
  //         withCredentials: true,
  //       });
  //       dispatch(loadUserSuccess(data.user));
  //       dispatch(setLoading(false));
  //       if (data.user.role === "admin") {
  //         dispatch(setIsAdmin(true));
  //         // console.log("user is admin!");
  //       }
  //       if (data.user.verified) dispatch(setVerified(true));
  //       if (data.user.blocked) dispatch(setIsBlocked(true));
  //     } catch (e) {
  //       console.log(e);
  //       // console.log(e.response.data);
  //       dispatch(setLoading(false));
  //       dispatch(loadUserFail());
  //       navigate("/");
  //       return;
  //     }
  //   };
  //   recheckUser();
  // }, [dispatch]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await axios.get(`${url}/users`, {
          headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        });
        // console.log("data", data);
        setTotalUsers(data.users.length);
        setCurrentUsers(data.users);
      } catch (error) {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    };
    getUsers();
  }, []);

  const toggleDrawer = () => {
    if (open) setOpen(false);
  };
  return (
    <div onClick={toggleDrawer} className={classes.container}>
      <DrawerUI open={open} setOpen={setOpen} />
      <AdminNavbar setOpen={setOpen} check={true} />
      <div className={classes.heading}>Users ({totalUsers})</div>
      <div className={classes.listContainer}>
        {currentUsers.map((user) => (
          <UserList
            key={user._id}
            name={user.name}
            email={user.email}
            avatar={user.avatar}
            id={user._id}
            date={user.createdAt}
            blocked={user.blocked}
          />
        ))}
      </div>
    </div>
  );
}

export default Users;
