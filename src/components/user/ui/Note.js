import React from "react";
import { url } from "../../../store/store";
import classes from "./Note.module.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Note({ heading, text, id }) {
  const navigate = useNavigate();

  const deleteNoteHandler = async () => {
    if (
      window.confirm(
        "Sure want to delete the Note? Note: Deleted files can't be restored"
      )
    ) {
      try {
        await axios.delete(`${url}/note/delete?id=${id}`, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        });
        toast.success(`Note Deleted Successfully`, {
          position: toast.POSITION.TOP_CENTER,
        });
        navigate("/home");
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      }
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.noteHeader}>
        <div className={classes.heading}>{heading}</div>
        <div onClick={deleteNoteHandler} className={classes.deleteButton}>
          Delete
        </div>
      </div>
      <div className={classes.noteBody}>{text}</div>
    </div>
  );
}

export default Note;
