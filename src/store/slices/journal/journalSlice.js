import { createSlice } from "@reduxjs/toolkit";

export const journalSlice = createSlice({
  name: "journal",
  initialState: {
    isSaving: false,
    uiMessage: "",
    notes: [],
    activeNote: null,
    // activeNote: {
    //   id: "",
    //   title: "",
    //   body: "",
    //   date: Date.now(),
    //   imageUrls: [],
    // },
  },
  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true;
    },
    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload);
      state.isSaving = false;
    },
    setActiveNote: (state, action) => {
      state.activeNote = action.payload;
      state.uiMessage = "";
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    startUpdatingNote: (state) => {
      state.isSaving = true;
      state.uiMessage = "";
    },
    noteUpdated: (state) => {
      state.isSaving = false;
      state.notes = state.notes.map((note) => {
        if (note.id === state.activeNote.id) {
          return state.activeNote;
        }
        return note;
      });
      state.uiMessage = `${state.activeNote.title} updated correctly`;
    },
    deleteNoteById: (state, action) => {},
  },
});

export const {
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  startUpdatingNote,
  noteUpdated,
  deleteNoteById,
  savingNewNote,
} = journalSlice.actions;
