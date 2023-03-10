import React, { useState } from "react";
import classes from "./ForgotPassword.module.css";

function ForgotPassword() {
  const [enteredEmail, setEnteredEmail] = useState("");

  const sendResetTokenHandler = () => {
    if (enteredEmail.length >= 12 && enteredEmail.length <= 30) {
      alert("Reset link send to email");
    } else {
      alert("Enter valid email");
    }
  };

  return (
    <div className={classes.container}>
      <p className={classes.heading}>Forgot Password</p>
      <input
        className={classes.emailInput}
        value={enteredEmail}
        type="text"
        maxLength={30}
        onChange={(e) => {
          setEnteredEmail(e.target.value);
        }}
        onPaste={(e) => {
          e.preventDefault();
          alert("You cannot copy paste due to security reasons");
        }}
        placeholder="Enter your email"
      />
      <button
        onClick={sendResetTokenHandler}
        className={classes.continueButton}
      >
        Continue
      </button>
    </div>
  );
}

export default ForgotPassword;
