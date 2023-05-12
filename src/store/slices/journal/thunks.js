import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirestoreDB } from "../../../firebase/config";
import { loadNotes } from "../../../helpers";
import {
  addNewEmptyNote,
  noteUpdated,
  savingNewNote,
  setActiveNote,
  setNotes,
  startUpdatingNote,
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
    newNote.id = newDocumentRef.id;
    await setDoc(newDocumentRef, newNote);
    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const {
      auth: { uid },
    } = getState();

    dispatch(setNotes(await loadNotes(uid)));
  };
};

export const startSaveNote = () => {
  return async (dispatch, getState) => {
    dispatch(startUpdatingNote());
    const { uid } = getState().auth;
    const {
      activeNote: { id, ...noteToSave },
    } = getState().journal;
    const docRef = doc(FirestoreDB, `${uid}/journal/notes/${id}`);
    await setDoc(docRef, noteToSave, { merge: true });
    dispatch(noteUpdated());
  };
};
