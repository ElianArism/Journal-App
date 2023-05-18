import {
  collection,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore/lite";
import { FirestoreDB } from "../../../firebase/config";
import { fileUpload, loadNotes } from "../../../helpers";
import {
  addNewEmptyNote,
  deleteNoteById,
  noteUpdated,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
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

export const startUploadingFiles = (files = []) => {
  return async (dispatch) => {
    dispatch(startUpdatingNote());
    const photosToUpload = [];

    for (const file of files) {
      photosToUpload.push(fileUpload(file));
    }

    const urls = await Promise.all(photosToUpload);
    dispatch(setPhotosToActiveNote(urls));

    dispatch(startSaveNote());
  };
};

export const startDeletingNote = () => {
  return async (dispatch, getState) => {
    const {
      auth: { uid },
      journal: { activeNote },
    } = getState();
    const docRef = doc(
      FirestoreDB,
      `${uid}/journal/notes/${activeNote.id}`
    );
    await deleteDoc(docRef);
    dispatch(deleteNoteById(activeNote.id));
  };
};
