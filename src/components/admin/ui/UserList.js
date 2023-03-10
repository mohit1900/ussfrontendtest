import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../../../store/store";
import classes from "./UserList.module.css";
import { toast } from "react-toastify";

function UserList({ id, name, email, avatar, date, blocked }) {
  const navigate = useNavigate();
  const [image, setImage] = useState("");

  useEffect(() => {
    const extractUrl = async () => {
      try {
        const { data } = await axios.post(
          `${url}/extract/image`,
          {
            cipherUrl: avatar.url,
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
  }, [avatar.url]);

  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  const blockUserHandler = async () => {
    try {
      await axios.put(
        `${url}/user/block/${id}`,
        {},
        {
          headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        }
      );
      toast.success("User Blocked Successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
      alert("User Blocked Successsfully!");
      navigate("/admin/blockedusers");
    } catch (e) {
      // console.log(e);
      toast.error(`${e.response.data.message}`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  const deleteUserHandler = async () => {
    if (window.confirm("Sure want to delete the user")) {
      try {
        await axios.delete(`${url}/delete/${id}`, {
          headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        });
        // console.log(data);
        toast.success("User Deleted Successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
        navigate("/admin/dashboard");
      } catch (e) {
        // console.log(e);
        toast.error(`${e.response.data.message}`, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.profile}>
        <img className={classes.profilePhoto} src={image} alt="...loading" />
      </div>
      <div className={classes.details}>
        <div className={classes.box}>
          <div className={classes.userDetails}>
            <p className={classes.name}>Name - {name}</p>
            <p className={classes.email}>Email - {email}</p>
          </div>
          <div className={classes.date}>Date: {formatDate(date)}</div>
        </div>
        <div className={classes.buttons}>
          {!blocked && (
            <button onClick={blockUserHandler} className={classes.blockButton}>
              Block
            </button>
          )}
          <button onClick={deleteUserHandler} className={classes.deleteButton}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserList;
