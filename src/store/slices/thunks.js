import { signInWithGoogle } from "../../firebase/providers";
import { checkingCredentials } from "./authSlice";

export const checkingAuthentication = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials({ status: "checking" }));
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials({ status: "checking" }));

    const result = await signInWithGoogle();
    console.log(result);
    // TODO: Continue implementation
  };
};
