import axios from "axios";
import React, { useEffect, useState } from "react";
import { url } from "../../store/store";
import classes from "./Images.module.css";
import Image from "./ui/Image";
import UserNavBar from "./ui/UserNavBar";

function Images() {
  const [myImages, setMyImages] = useState([]);

  useEffect(() => {
    const getImages = async () => {
      try {
        const { data } = await axios.get(`${url}/my/images`, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        });
        setMyImages(data.images);
        // console.log(data.images);
      } catch (error) {
        console.log(error);
      }
    };
    getImages();
  }, []);

  return (
    <div className={classes.container}>
      <UserNavBar flag={true} />
      <div className={classes.heading}>Your Files-({myImages.length})</div>
      <div className={classes.container2}>
        {myImages.map((image) => (
          <Image
            key={image._id}
            title={image.title}
            cipherUrl={image.image.url}
            id={image._id}
          />
        ))}
      </div>
    </div>
  );
}

export default Images;
