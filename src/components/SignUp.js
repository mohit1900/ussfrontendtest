import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setLoading } from "../store/loadingSlice";
import { url } from "../store/store";
import { registerFail, registerSuccess } from "../store/userSlice";
import NavBar from "./NavBar";
import classes from "./SignUp.module.css";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [check, setCheck] = useState(false);
  const [file, setFile] = useState("");
  const [resetKey, setResetKey] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      name.length >= 3 &&
      name.length <= 18 &&
      email.length >= 12 &&
      email.length <= 30 &&
      password.length >= 6 &&
      password.length <= 16
    )
      setCheck(true);
    else setCheck(false);
  }, [name, email, password]);

  const resetKeyHandler = () => {
    setResetKey(Math.random().toString(36));
  };

  const profilePhotoChangeHandler = (e) => {
    let currentFile = e.target.files[0];
    if (!currentFile) return;

    if (currentFile.size > 10e6) {
      window.alert("Please upload image smaller than 10 MB");
      resetKeyHandler();
      return;
    }

    setFile(e.target.files[0]);
  };

  const signUpHandler = async (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("password", password);
    myForm.append("file", file);

    if (!check) {
      alert("Enter all the fields!");
      return;
    }
    if (file === "") {
      toast.error("No Image Selected");
      return;
    }

    try {
      dispatch(setLoading(true));
      const { data } = await axios.post(`${url}/register`, myForm, {
        headers: {
          "Content-Type": `multipart/form-data; `,
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
      });
      dispatch(setLoading(false));
      dispatch(registerSuccess(data.user));
      alert(
        `OTP has been send to ${email} with time limit of 5 mins to verify`
      );
      navigate("/verify");
    } catch (e) {
      console.log(e);
      dispatch(setLoading(false));
      dispatch(registerFail());
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className={classes.background}>
      <div className={classes.blur}>
        <NavBar flag={false} />
        <div className={classes.container}>
          <form
            // encType="application/x-www-form-urlencoded"
            onSubmit={signUpHandler}
            className={classes.signupForm}
          >
            <p className={classes.heading}>Sign Up</p>
            <div className={classes.container2}>
              <p className={classes.name_text}>Name</p>
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className={classes.email_input}
                type="text"
                maxLength={18}
                onPaste={(e) => {
                  e.preventDefault();
                  alert("You cannot copy paste due to security reasons");
                }}
              />
              <p className={classes.email_text}>E-mail</p>
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className={classes.email_input}
                type="text"
                maxLength={30}
                onPaste={(e) => {
                  e.preventDefault();
                  alert("You cannot copy paste due to security reasons");
                }}
              />
              <p className={classes.password_text}>Password</p>
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                maxLength={16}
                onPaste={(e) => {
                  e.preventDefault();
                  alert("You cannot copy paste due to security reasons");
                }}
                className={classes.password_input}
                type="password"
              />
              <div className={classes.fileUploadContainer}>
                <p className={classes.fileText}>Select your profile photo:</p>
                <input
                  // value={file}
                  name="file"
                  onChange={profilePhotoChangeHandler}
                  type="file"
                  key={resetKey}
                  accept="image/png, image/jpg, image/jpeg"
                />
              </div>
              <button type="submit" className={classes.signUpButton}>
                Create
              </button>
            </div>
            <div className={classes.container3}>
              <p className={classes.bottonText}>Already a user?</p>
              <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                <p className={classes.loginButton}>Log in</p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
