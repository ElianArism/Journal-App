import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    status: "not-authenticated", // 'not-authenticated' | 'authenticated'
    uid: null,
    email: null,
    photoUrl: null,
    displayName: null,
    errorMessage: null,
  },
  reducers: {
    login: (state, action) => {},
    logout: (state, action) => {},
    checkingCredentials: (state) => {
      state.status = "checking";
    },
  },
});

export const { login, logout, checkingCredentials } =
  authSlice.actions;