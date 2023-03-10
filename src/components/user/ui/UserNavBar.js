import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { url } from "../../../store/store";
import classes from "./UserNavBar.module.css";

function UserNavBar({ flag }) {
  const user = useSelector((state) => state.user);
  const [image, setImage] = useState("");

  useEffect(() => {
    const extractUrl = async () => {
      try {
        const { data } = await axios.post(
          `${url}/extract/image`,
          {
            cipherUrl: user.userinfo.avatar.url,
          },
          {
            headers: {
              "Content-type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            withCredentials: true,
          }
        );
        setImage(data.url);
      } catch (error) {
        console.log(error);
      }
    };
    extractUrl();
  }, [user.userinfo]);

  return (
    <nav className={classes.navbar}>
      <div className={classes.logo}>
        <Link style={{ textDecoration: "none", color: "white" }} to="/home">
          <p className={classes.logotext}>V Handle</p>
        </Link>
      </div>
      <ul className={classes.navlist}>
        <Link to="/home" style={{ textDecoration: "none" }}>
          <li className={classes.listItem}>Home</li>
        </Link>
        <Link to="/about" style={{ textDecoration: "none" }}>
          <li className={classes.listItem}>About</li>
        </Link>
        {flag && (
          <Link to="/myprofile" style={{ textDecoration: "none" }}>
            <li className={classes.listItem3}>
              <img className={classes.profileImage} src={image} alt="img" />
            </li>
          </Link>
        )}
      </ul>
    </nav>
  );
}

export default UserNavBar;
