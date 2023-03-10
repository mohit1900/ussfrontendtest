import { createSlice } from "@reduxjs/toolkit";

const verifiedSlice = createSlice({
  name: "isVerified",
  initialState: { value: false },
  reducers: {
    setVerified(state, action) {
      state.value = action.payload;
    },
  },
});

export const { setVerified } = verifiedSlice.actions;

export default verifiedSlice.reducer;
