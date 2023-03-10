import React from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../store/loadingSlice";
import { toast } from "react-toastify";
import { setIsAdmin } from "../store/isAdminSlice";
import { setVerified } from "../store/verifiedSlice";
import { logoutSuccess } from "../store/userSlice";
import { url } from "../store/store";
import axios from "axios";
import { setIsBlocked } from "../store/isBlockedSlice";

function BlockPage() {
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      dispatch(setLoading(true));
      const { data } = await axios.get(`${url}/logout`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      dispatch(setLoading(false));
      dispatch(logoutSuccess(data.user));
      dispatch(setVerified(false));
      dispatch(setIsAdmin(false));
      dispatch(setIsBlocked(false));
      toast.success(`Logged Out Successfully`, {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (e) {
      console.log(e);
      dispatch(setLoading(false));
      toast.success(e.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div>
      You are blocked by the admin due to some malicuous activities.
      <br />
      Wait until you get unblocked.
      <button onClick={logoutHandler}>Logout</button>
    </div>
  );
}

export default BlockPage;
