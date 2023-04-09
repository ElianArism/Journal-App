import {
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./authSlice";

export const checkingAuthentication = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials({ status: "checking" }));
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials({ status: "checking" }));

    const result = await signInWithGoogle();

    if (result.ok) dispatch(login(result));
    else dispatch(logout(result.details));
  };
};

export const createUserWithEmailAndPassword = ({
  email,
  name,
  password,
}) => {
  return async (dispatch) => {
    dispatch(checkingCredentials({ status: "checking" }));

    const result = await registerWithEmailAndPassword({
      email,
      name,
      password,
    });
    console.log(result);
    // if (result.ok) dispatch(login(result));
    // else dispatch(logout(result.details));
  };
};
