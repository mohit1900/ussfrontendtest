import React, { useEffect, useState } from "react";
import classes from "./Login.module.css";
import { url } from "../store/store";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading } from "../store/loadingSlice";
import { loginFail, loginSuccess } from "../store/userSlice";
import { setVerified } from "../store/verifiedSlice";
import NavBar from "./NavBar";
import { setIsAdmin } from "../store/isAdminSlice";
// import toast, { Toaster } from "react-hot-toast";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [check, setCheck] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      email.length >= 12 &&
      email.length <= 30 &&
      password.length >= 6 &&
      password.length <= 16
    )
      setCheck(true);
    else setCheck(false);
  }, [email, password]);

  const loginHandler = async () => {
    if (!check) {
      alert("Enter both the fields carefully!");
    } else {
      try {
        dispatch(setLoading(true));
        const { data } = await axios.post(
          `${url}/login`,
          {
            email,
            password,
          },
          {
            headers: {
              "Content-type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            withCredentials: true,
          }
        );
        // console.log(data.user);
        dispatch(setLoading(false));
        dispatch(loginSuccess(data.user));
        if (data.user.verified) {
          dispatch(setVerified(true));
          toast.success(`Logged In Successfully`, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
        if (data.user.role === "admin") {
          dispatch(setIsAdmin(true));
          toast.info(`Welcome Admin`, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      } catch (e) {
        console.log(e);
        toast.error(`Login Failed ${e.response.data.message}`, {
          position: toast.POSITION.TOP_CENTER,
        });
        dispatch(setLoading(false));
        dispatch(loginFail());
      }
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className={classes.background}>
      <div className={classes.blur}>
        <NavBar flag={true} />
        <div className={classes.container}>
          <div className={classes.welcome_text}>
            <h1>Welcome, Some welcome text</h1>
          </div>
          <div className={classes.loginForm}>
            <div className={classes.loginContainer}>
              <div className={classes.heading}>Login</div>
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
              <button
                // disabled={true}
                onClick={loginHandler}
                className={classes.loginButton}
              >
                Login
              </button>
              <div className={classes.bottom_text}>
                <p className={classes.text2}>Don't have an account?</p>
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to="/signup"
                >
                  <p className={classes.signin_button}>SignUp</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
