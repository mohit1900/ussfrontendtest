import React from "react";
import { Link } from "react-router-dom";
import classes from "./NavBar.module.css";

function NavBar({ flag }) {
  return (
    <nav className={classes.navbar}>
      <div className={classes.logo}>
        <Link style={{ textDecoration: "none", color: "white" }} to="/">
          <p className={classes.logotext}>V Handle</p>
        </Link>
      </div>
      <ul className={classes.navlist}>
        <Link to="/about" style={{ textDecoration: "none" }}>
          <li className={classes.listItem}>About Us</li>
        </Link>
        {flag && (
          <Link to="/signup" style={{ textDecoration: "none" }}>
            <li className={classes.listItem3}>SignUp</li>
          </Link>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
