import { createSlice } from "@reduxjs/toolkit";

const _initialState = {
  status: "not-authenticated", // 'not-authenticated' | 'authenticated'
  uid: null,
  email: null,
  photoUrl: null,
  displayName: null,
  errDetails: null,
};
export const authSlice = createSlice({
  name: "authSlice",
  initialState: _initialState,
  reducers: {
    login: (state, { payload }) => {
      return {
        ...payload,
        status: "authenticated",
        errDetails: null,
      };
    },
    checkingCredentials: (state) => {
      state.status = "checking";
    },
    logout: (state, { payload }) => {
      return {
        ..._initialState,
        errDetails: payload.details,
      };
    },
  },
});

export const { login, logout, checkingCredentials } =
  authSlice.actions;
