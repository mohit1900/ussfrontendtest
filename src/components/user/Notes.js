import axios from "axios";
import React, { useEffect, useState } from "react";
import { url } from "../../store/store";
import UserNavBar from "./ui/UserNavBar";
import classes from "./Notes.module.css";
import Note from "./ui/Note";

function Notes() {
  const [extractedNotes, setExtractedNotes] = useState([]);

  useEffect(() => {
    const getMyNotes = async () => {
      try {
        const { data } = await axios.get(`${url}/getmynotes`, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        });

        // console.log(data);
        extractNotes(data);
      } catch (error) {
        console.log(error);
      }
    };
    getMyNotes();
  }, []);

  const extractNotes = async (d) => {
    try {
      const { data } = await axios.post(
        `${url}/getextractednotes`,
        {
          notes: d.notes,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        }
      );
      setExtractedNotes(data.extractedNotesArray);
      // console.log(data.extractedNotesArray);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.container}>
      <UserNavBar flag={true} />
      <div className={classes.heading}>Your Notes</div>
      <div className={classes.main}>
        {extractedNotes.map((note) => (
          <Note
            key={note._id}
            heading={note.title}
            text={note.text}
            id={note._id}
          />
        ))}
      </div>
    </div>
  );
}

export default Notes;
