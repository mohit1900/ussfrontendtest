import React from "react";
import UserNavBar from "./ui/UserNavBar";
import classes from "./Home.module.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className={classes.container}>
      <UserNavBar flag={true} />
      <div className={classes.main}>
        <div className={classes.container1}>
          <Link style={{ textDecoration: "none" }} to="/addnote">
            <div className={classes.addNote}>Add Note</div>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/uploadimage">
            <div className={classes.uploadPhoto}>Upload Photo</div>
          </Link>
        </div>
        <div className={classes.container2}>
          <div className={classes.heading}>Uploads</div>
          <Link style={{ textDecoration: "none" }} to="/notes">
            <div className={classes.notes}>Your Notes</div>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/images">
            <div className={classes.uploads}>Your Uploads</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
