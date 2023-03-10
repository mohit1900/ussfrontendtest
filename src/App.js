import "./App.css";
import Login from "./components/Login";
import { Route, Routes, useNavigate } from "react-router-dom";
import SignUp from "./components/SignUp";
import Home from "./components/user/Home";
import { ProtectedRoute } from "protected-route-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { url } from "./store/store";
import { setLoading } from "./store/loadingSlice";
import { loadUserFail, loadUserSuccess } from "./store/userSlice";
import { setVerified } from "./store/verifiedSlice";
// import Loader from "./components/Loader";
import AboutUs from "./components/AboutUs";
import Verify from "./components/Verify";
import Dashboard from "./components/admin/Dashboard";
import Users from "./components/admin/Users";
import { setIsAdmin } from "./store/isAdminSlice";
import BlockedUsers from "./components/admin/BlockedUsers";
import Account from "./components/admin/Account";
import ForgotPassword from "./components/ForgotPassword";
import { ToastContainer } from "react-toastify";
import BlockPage from "./components/BlockPage";
import { setIsBlocked } from "./store/isBlockedSlice";
import UserProfile from "./components/user/UserProfile";
import UploadImage from "./components/user/UploadImage";
import AddNote from "./components/user/AddNote";
import Notes from "./components/user/Notes";
import Backdrop from "@mui/material/Backdrop";
import { CircularProgress } from "@mui/material";
import Images from "./components/user/Images";

function App() {
  const isVerified = useSelector((state) => state.isVerified);
  const loading = useSelector((state) => state.loading);
  const isAdmin = useSelector((state) => state.isAdmin);
  const isBlocked = useSelector((state) => state.isBlocked);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      try {
        dispatch(setLoading(true));
        const { data } = await axios.get(`${url}/me`, {
          headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        });
        dispatch(loadUserSuccess(data.user));
        dispatch(setLoading(false));
        if (data.user.role === "admin") {
          dispatch(setIsAdmin(true));
          // console.log("user is admin!");
        }
        if (data.user.verified) dispatch(setVerified(true));
        if (data.user.blocked) dispatch(setIsBlocked(true));
      } catch (e) {
        console.log(e);
        // console.log(e.response.data);
        dispatch(setLoading(false));
        dispatch(loadUserFail());
      }
    };
    loadUser();
  }, [dispatch]);

  useEffect(() => {
    // console.log("isVerified : ", isVerified.value);
    // console.log("isAdmin : ", isAdmin.value);
    // console.log("and", isVerified && !isAdmin.value);

    if (isBlocked.value) navigate("/blocked");

    if (isVerified.value && !isAdmin.value && !isBlocked.value)
      navigate("/home");
    else if (isVerified && isAdmin.value && !isBlocked.value)
      navigate("/admin/dashboard");
  }, [isVerified, isAdmin]);

  return (
    <>
      {loading.value ? (
        // <Loader />
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/about" element={<AboutUs />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/verify" element={<Verify />} />
            <Route exact path="/forgotpassword" element={<ForgotPassword />} />
            <Route
              exact
              path="/blocked"
              element={
                <ProtectedRoute
                  isAuthenticated={
                    isVerified.value && !isAdmin.value && isBlocked.value
                  }
                  redirect="/"
                >
                  <BlockPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/home"
              element={
                <ProtectedRoute
                  isAuthenticated={
                    isVerified.value && !isAdmin.value && !isBlocked.value
                  }
                  redirect="/"
                >
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/uploadimage"
              element={
                <ProtectedRoute
                  isAuthenticated={
                    isVerified.value && !isAdmin.value && !isBlocked.value
                  }
                  redirect="/"
                >
                  <UploadImage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/images"
              element={
                <ProtectedRoute
                  isAuthenticated={
                    isVerified.value && !isAdmin.value && !isBlocked.value
                  }
                  redirect="/"
                >
                  <Images />
                </ProtectedRoute>
              }
            />
            <Route
              path="/addnote"
              element={
                <ProtectedRoute
                  isAuthenticated={
                    isVerified.value && !isAdmin.value && !isBlocked.value
                  }
                  redirect="/"
                >
                  <AddNote />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notes"
              element={
                <ProtectedRoute
                  isAuthenticated={
                    isVerified.value && !isAdmin.value && !isBlocked.value
                  }
                  redirect="/"
                >
                  <Notes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/myprofile"
              element={
                <ProtectedRoute
                  isAuthenticated={
                    isVerified.value && !isAdmin.value && !isBlocked.value
                  }
                  redirect="/"
                >
                  <UserProfile />
                </ProtectedRoute>
              }
            />

            {/* admin links */}

            <Route
              exact
              path="/admin/dashboard"
              element={
                <ProtectedRoute isAuthenticated={isAdmin.value} redirect="/">
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/admin/users"
              element={
                <ProtectedRoute isAuthenticated={isAdmin.value} redirect="/">
                  <Users />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/admin/blockedusers"
              element={
                <ProtectedRoute isAuthenticated={isAdmin.value} redirect="/">
                  <BlockedUsers />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/admin/account"
              element={
                <ProtectedRoute isAuthenticated={isAdmin.value} redirect="/">
                  <Account />
                </ProtectedRoute>
              }
            />
          </Routes>
          <ToastContainer autoClose={2000} newestOnTop={true} />
        </>
      )}
    </>
  );
}

export default App;
