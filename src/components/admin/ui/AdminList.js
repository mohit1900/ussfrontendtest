import React from "react";
import classes from "./AdminList.module.css";

function AdminList({ email, date }) {
  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  return (
    <div className={classes.container}>
      <div className={classes.profile}>
        <img
          className={classes.profileImage}
          src="/images/ProfilePhoto.png"
          alt=""
        />
      </div>
      <div className={classes.profileDetails}>
        <p className={classes.email}>{email}</p>
        <p className={classes.email}>Created At: {formatDate(date)}</p>
      </div>
    </div>
  );
}

export default AdminList;
