import React from "react";
import { Link } from "react-router-dom";
import classes from "./AdminNavbar.module.css";

function AdminNavbar({ setOpen, check }) {
  return (
    <>
      <nav className={classes.container}>
        <button
          onClick={() => {
            setOpen(true);
          }}
          className={classes.menuButton}
        >
          <img
            className={classes.imageIcon}
            src="/images/MenuIcon.png"
            alt="icon"
          />
        </button>
        <div className={classes.heading}>V Handle</div>
        {check && (
          <Link to="/admin/account" style={{ textDecoration: "none" }}>
            <div className={classes.profile}>
              <img
                className={classes.profileImage}
                src="/images/ProfilePhoto.png"
                alt=""
              />
            </div>
          </Link>
        )}
      </nav>
    </>
  );
}

export default AdminNavbar;
