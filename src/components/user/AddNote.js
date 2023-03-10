import axios from "axios";
import React, { useState } from "react";
import { url } from "../../store/store";
import classes from "./AddNote.module.css";
import UserNavBar from "./ui/UserNavBar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { addNoteSuccess } from "../../store/userSlice";

function AddNote() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const addNote = async () => {
    if (title === "" || text === "") {
      alert("Please enter both the fields");
      return;
    }

    try {
      await axios.post(
        `${url}/note/add`,
        {
          title,
          text,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        }
      );
      // dispatch(addNoteSuccess())
      // console.log(data);
      toast.success(`Note added Successfully`, {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/notes");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div className={classes.container}>
      <UserNavBar flag={true} />
      <div className={classes.main}>
        <div className={classes.box}>
          <div className={classes.heading}>ADD NOTE</div>
          <div className={classes.title}>Title</div>
          <input
            className={classes.titleInput}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            placeholder="Enter you title"
            maxLength={60}
          />
          <div className={classes.text}>Text</div>
          <textarea
            className={classes.textInput}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            type="text"
            placeholder="Enter the note"
            maxLength={1000}
          />
          <button onClick={addNote} className={classes.addButton}>
            Add Note
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddNote;
