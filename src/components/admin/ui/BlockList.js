import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../../../store/store";
import classes from "./BlockList.module.css";
import { toast } from "react-toastify";

function BlockList({ id, name, email, avatar }) {
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

  const unblockHandler = async () => {
    try {
      await axios.put(
        `${url}/user/unblock/${id}`,
        {},
        {
          headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        }
      );
      // console.log(data);
      toast.success("User Unblocked Successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
      alert("User Unblocked Successfully");
      navigate("/admin/dashboard");
    } catch (e) {
      // console.log(e);
      toast.error(e.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.profile}>
        <img className={classes.profileImage} src={image} alt="" />
      </div>
      <div className={classes.profileDetails}>
        <p className={classes.username}>{name}</p>
        <p className={classes.email}>{email}</p>
      </div>
      <button onClick={unblockHandler} className={classes.unblockButton}>
        Unblock
      </button>
    </div>
  );
}

export default BlockList;
