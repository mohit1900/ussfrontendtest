const { createSlice } = require("@reduxjs/toolkit");

const userSlice = createSlice({
  name: "user",
  initialState: { userinfo: "" },
  reducers: {
    registerSuccess(state, action) {
      state.userinfo = action.payload;
    },
    registerFail(state, action) {
      state.userinfo = null;
    },
    loginSuccess(state, action) {
      state.userinfo = action.payload;
    },
    loginFail(state, action) {
      state.userinfo = null;
    },
    logoutSuccess(state, action) {
      state.userinfo = null;
    },
    logoutFail(state, action) {
      state.userinfo = action.payload;
    },
    loadUserSuccess(state, action) {
      state.userinfo = action.payload;
    },
    loadUserFail(state, action) {
      state.userinfo = null;
    },
    addNoteSuccess(state, action) {
      state.userinfo.notes.push(action.payload);
    },
  },
});

export const {
  loginSuccess,
  logoutSuccess,
  loadUserFail,
  loadUserSuccess,
  loginFail,
  logoutFail,
  registerFail,
  registerSuccess,
  addNoteSuccess,
} = userSlice.actions;
export default userSlice.reducer;
