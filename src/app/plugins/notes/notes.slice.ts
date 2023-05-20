import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface Note {
  index: number;
  title: string;
  note: string;
  createdDate: string;
  archived: boolean;
}

const initialState: {
  notes: Note[];
  isAdd: boolean;
  isEditing?: number;
} = JSON.parse(
  localStorage.getItem("notes") || JSON.stringify({ notes: [], isAdd: false })
);

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    openAddNote(state) {
      state.isAdd = true;
      localStorage.setItem("notes", JSON.stringify(state));
    },
    openEditNote(state, action: PayloadAction<number>) {
      state.isAdd = true;
      state.isEditing = action.payload;
      localStorage.setItem("notes", JSON.stringify(state));
    },
    closeAddNote(state) {
      if (state.isEditing) state.isEditing = undefined;
      state.isAdd = false;
      localStorage.setItem("notes", JSON.stringify(state));
    },
    addNote(state, action: PayloadAction<Note>) {
      state.notes.push(action.payload);
      localStorage.setItem("notes", JSON.stringify(state));
    },
    updateNote(state, action: PayloadAction<Note>) {
      let idx = state.notes.findIndex((v) => v.index === action.payload.index);
      state.notes[idx] = {
        ...action.payload,
      };
      localStorage.setItem("notes", JSON.stringify(state));
    },
    deleteNote(state, action: PayloadAction<Note>) {
      let i = state.notes.findIndex(
        (note) => note.index === action.payload.index
      );
      state.notes.splice(i, 1);
      localStorage.setItem("notes", JSON.stringify(state));
    },
  },
});

export const {
  addNote,
  closeAddNote,
  openAddNote,
  deleteNote,
  openEditNote,
  updateNote,
} = noteSlice.actions;
export default noteSlice.reducer;
