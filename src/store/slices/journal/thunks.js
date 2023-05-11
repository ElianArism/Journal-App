import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirestoreDB } from "../../../firebase/config";
import {
  addNewEmptyNote,
  savingNewNote,
  setActiveNote,
} from "./journalSlice";

export const startAddNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote());
    const {
      auth: { uid },
    } = getState();
    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
      imageUrls: [],
    };
    const newDocumentRef = doc(
      collection(FirestoreDB, `${uid}/journal/notes`)
    );
    await setDoc(newDocumentRef, newNote);
    newNote.id = newDocumentRef.id;
    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};
