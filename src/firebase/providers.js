import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(
      FirebaseAuth,
      googleProvider
    );
    return {
      name: result.user.displayName,
      email: result.user.email,
      photo: resu1lt.user.photoURL,
      uid: result.user.uid,
      ok: true,
    };
  } catch (error) {
    const emailUsed = error.customData.email;
    const errorMessage = error.message;
    const errorCode = error.code;

    return {
      ok: false,
      details: {
        errorCode,
        errorMessage,
        email: emailUsed,
      },
    };
  }
};

export const registerWithEmailAndPassword = async ({
  email,
  password,
  name,
}) => {
  try {
    const resp = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    const { uid, photoURL = null } = resp.user;
    updateProfile(FirebaseAuth.currentUser, {
      displayName: name,
      photoURL,
    });
    return {
      ok: true,
      uid,
      email,
      password,
      name,
      photoURL,
    };
  } catch (error) {
    const emailUsed = error.customData.email;
    const errorMessage = error.message;
    const errorCode = error.code;
    return {
      ok: false,
      details: {
        email: emailUsed,
        errorMessage,
        errorCode,
      },
    };
  }
};
