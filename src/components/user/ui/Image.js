import axios from "axios";
import React, { useEffect, useState } from "react";
import { url } from "../../../store/store";
import classes from "./Image.module.css";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Image({ cipherUrl, title, id }) {
  const [decryptedImage, setDecryptedImage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const decryptImage = async () => {
      const { data } = await axios.post(
        `${url}/image/decrypt`,
        { cipherUrl: cipherUrl },
        {
          headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        }
      );

      setDecryptedImage(data.url);
    };
    decryptImage();
  }, []);

  const downloadHandler = () => {
    saveAs(decryptedImage, "image.jpg");
  };

  const deleteImageHandler = async () => {
    if (
      window.confirm(
        "Sure want to delete the file? Note: Deleted files can't be restored"
      )
    ) {
      try {
        await axios.delete(`${url}/image/delete?id=${id}`, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        });
        toast.success(`Image deleted Successfully`, {
          position: toast.POSITION.TOP_CENTER,
        });
        navigate("/home");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.title}>{title}</div>
      <div className={classes.imageView}>
        <img className={classes.image} src={decryptedImage} alt="image" />
      </div>
      <div className={classes.buttons}>
        <div onClick={deleteImageHandler} className={classes.deleteButton}>
          Delete
        </div>
        <div onClick={downloadHandler} className={classes.downloadButton}>
          Download
        </div>
      </div>
    </div>
  );
}

export default Image;
