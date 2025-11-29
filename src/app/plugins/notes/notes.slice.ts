import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Interface representing a note.
 */
export interface Note {
  /**
   * Unique index/ID of the note.
   */
  index: number;
  /**
   * Title of the note.
   */
  title: string;
  /**
   * Content of the note.
   */
  note: string;
  /**
   * Date the note was created (as a string).
   */
  createdDate: string;
  /**
   * Whether the note is archived (unused currently).
   */
  archived: boolean;
}

/**
 * Initial state of the notes slice.
 *
 * Loads the notes and UI state from `localStorage` if available.
 */
const initialState: {
  notes: Note[];
  isAdd: boolean;
  isEditing?: number;
} = JSON.parse(
  localStorage.getItem("notes") || JSON.stringify({ notes: [], isAdd: false })
);

/**
 * Redux slice for managing notes.
 *
 * Handles actions for adding, editing, deleting notes, and managing the "Add/Edit Note" modal visibility.
 * All state changes are persisted to `localStorage`.
 */
const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    /**
     * Opens the "Add Note" modal.
     *
     * @param {object} state - The current state.
     */
    openAddNote(state) {
      state.isAdd = true;
      localStorage.setItem("notes", JSON.stringify(state));
    },
    /**
     * Opens the "Edit Note" modal for a specific note.
     *
     * @param {object} state - The current state.
     * @param {PayloadAction<number>} action - The ID of the note to edit.
     */
    openEditNote(state, action: PayloadAction<number>) {
      state.isAdd = true;
      state.isEditing = action.payload;
      localStorage.setItem("notes", JSON.stringify(state));
    },
    /**
     * Closes the "Add/Edit Note" modal.
     *
     * @param {object} state - The current state.
     */
    closeAddNote(state) {
      if (state.isEditing) state.isEditing = undefined;
      state.isAdd = false;
      localStorage.setItem("notes", JSON.stringify(state));
    },
    /**
     * Adds a new note to the list.
     *
     * @param {object} state - The current state.
     * @param {PayloadAction<Note>} action - The action containing the new note.
     */
    addNote(state, action: PayloadAction<Note>) {
      state.notes.push(action.payload);
      localStorage.setItem("notes", JSON.stringify(state));
    },
    /**
     * Updates an existing note.
     *
     * @param {object} state - The current state.
     * @param {PayloadAction<Note>} action - The action containing the updated note.
     */
    updateNote(state, action: PayloadAction<Note>) {
      let idx = state.notes.findIndex((v) => v.index === action.payload.index);
      state.notes[idx] = {
        ...action.payload,
      };
      localStorage.setItem("notes", JSON.stringify(state));
    },
    /**
     * Deletes a note from the list.
     *
     * @param {object} state - The current state.
     * @param {PayloadAction<Note>} action - The action containing the note to delete.
     */
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
