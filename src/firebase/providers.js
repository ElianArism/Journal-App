import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
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
      photo: result.user.photoURL,
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
