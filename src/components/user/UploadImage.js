import React, { useState } from "react";
import UserNavBar from "./ui/UserNavBar";
import classes from "./UploadImage.module.css";
import { toast } from "react-toastify";
import { setLoading } from "../../store/loadingSlice";
import axios from "axios";
import { url } from "../../store/store";
import { useDispatch } from "react-redux";

function UploadImage() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [resetKey, setResetKey] = useState("");
  // const [uploaded, setUploaded] = useState(null);

  const dispatch = useDispatch();

  const resetKeyHandler = () => {
    setResetKey(Math.random().toString(36));
  };

  const fileChangeHandler = (e) => {
    let currentFile = e.target.files[0];

    if (!currentFile) return;

    if (currentFile.size > 10e6) {
      window.alert("Please upload image smaller than 10 MB");
      resetKeyHandler();
      return;
    }
    setFile(e.target.files[0]);
  };

  const uploadHandler = async (e) => {
    e.preventDefault();
    if (title === "") {
      alert("Enter the title");
      return;
    }
    if (file === "") {
      toast.error("No Image Selected");
      return;
    }

    const myForm = new FormData();

    myForm.append("title", title);
    myForm.append("file", file);

    try {
      dispatch(setLoading(true));
      await axios.post(
        `${url}image/upload`,

        myForm,
        {
          headers: {
            "Content-Type": `multipart/form-data; `,
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
          // onUploadProgress: (data) => {
          // console.log(data.loaded, data.total);
          // setUploaded(Math.round((data.loaded / data.total) * 100));
          // console.log(Math.round((data.loaded / data.total) * 100));
          // },
        }
      );
      dispatch(setLoading(false));
      setTitle("");
      setFile("");
      resetKeyHandler();
      // setUploaded(null);
      // console.log("data", data);
    } catch (error) {
      console.log(error);
      dispatch(setLoading(false));
    }
  };

  return (
    <div className={classes.container}>
      <UserNavBar flag={true} />
      <div className={classes.main}>
        <form onSubmit={uploadHandler} className={classes.box}>
          <div className={classes.heading}>UPLOAD IMAGE</div>
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
          <div className={classes.title}>Choose File</div>
          <div className={classes.text}>Only jpg, jpeg, pdf</div>
          <input
            className={classes.inputFile}
            key={resetKey}
            type="file"
            name="file"
            accept="image/png, image/jpg, image/jpeg"
            onChange={fileChangeHandler}
          />

          <button type="submit" className={classes.uploadButton}>
            UPLOAD
          </button>
        </form>
        {/* {uploaded && (
          <div className="progress mt-2">
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuenow={uploaded}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: `${uploaded}%`, padding: "12px 0" }}
            >
              {`${uploaded}% Uploaded`}
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default UploadImage;
