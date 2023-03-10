import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../store/loadingSlice";
import { url } from "../store/store";
import { setVerified } from "../store/verifiedSlice";
import classes from "./Verify.module.css";
import { toast } from "react-toastify";

function Verify() {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const otpVerificationHandler = async () => {
    if (otp.length === 4) {
      try {
        dispatch(setLoading(true));
        const { data } = await axios.post(
          `${url}/verify`,
          {
            otp,
          },
          {
            headers: {
              "Content-type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            withCredentials: true,
          }
        );
        console.log(data);
        toast.success("Account Successfully Verified", {
          position: toast.POSITION.TOP_CENTER,
        });
        dispatch(setLoading(false));
        dispatch(setVerified(true));
        navigate("/");
      } catch (e) {
        // console.log(e);
        toast.error(`${e.response.data.message}`, {
          position: toast.POSITION.TOP_CENTER,
        });
        dispatch(setLoading(false));
      }
    } else {
      alert("Enter otp of length 4");
    }
  };

  return (
    <div className={classes.container}>
      <p className={classes.heading}>OTP Verification</p>
      <input
        className={classes.otpInput}
        type="text"
        value={otp}
        pattern="[0-9]"
        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
        maxLength={4}
        minLength={4}
      />
      <button onClick={otpVerificationHandler} className={classes.verifyButton}>
        Verify
      </button>
    </div>
  );
}

export default Verify;
