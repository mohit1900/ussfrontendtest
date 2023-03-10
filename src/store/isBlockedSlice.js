import { createSlice } from "@reduxjs/toolkit";

const isBlockedSlice = createSlice({
  name: "isBlocked",
  initialState: { value: false },
  reducers: {
    setIsBlocked(state, action) {
      state.value = action.payload;
    },
  },
});

export const { setIsBlocked } = isBlockedSlice.actions;

export default isBlockedSlice.reducer;
