import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Note, addNote, closeAddNote, updateNote } from "./notes.slice";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
} from "@mui/material";

/**
 * Dialog for adding or editing a note.
 *
 * This component displays a modal with a form to enter or modify the title and content
 * of a note. It handles both creating new notes and updating existing ones based on
 * the `editingId` state from the store.
 *
 * @param {object} props - The component props.
 * @param {boolean} props.isAdd - Whether the dialog is currently open.
 * @returns {JSX.Element} The rendered Add/Edit Note dialog.
 */
export const AddNote = (props: { isAdd: boolean }) => {
  const dispatch = useAppDispatch();
  const notes = useAppSelector((state) => state.notes.notes);
  const editingId = useAppSelector((state) => state.notes.isEditing);

  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  /**
   * Populates the form fields if the component is in edit mode.
   */
  useEffect(() => {
    if (editingId !== undefined) {
      let idx = notes.findIndex((v) => v.index === editingId);
      setTitle(notes[idx].title);
      setNote(notes[idx].note);
    }
  }, [editingId, notes]);

  /**
   * Handles the submission of a new note.
   *
   * Creates a new note object and dispatches an action to add it to the store.
   * Then resets the form and closes the dialog.
   *
   * @param {object} event - The form submission event.
   */
  const handleAddNote = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const newNote: Note = {
      index: notes.length === 0 ? 1 : notes[notes.length - 1].index + 1,
      title,
      note,
      createdDate: new Date(Date.now()).toDateString(),
      archived: false,
    };
    dispatch(addNote(newNote));
    setTitle("");
    setNote("");
    dispatch(closeAddNote());
  };

  /**
   * Handles the update of an existing note.
   *
   * Dispatches an action to update the note in the store with the new values.
   * Then resets the form and closes the dialog.
   *
   * @param {object} event - The form submission event.
   */
  const handleEditNote = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (editingId !== undefined) {
      let idx = notes.findIndex((v) => v.index === editingId);
      dispatch(
        updateNote({
          ...notes[idx],
          title: title,
          note: note,
        })
      );
    }
    setTitle("");
    setNote("");
    dispatch(closeAddNote());
  };
  return (
    <Dialog
      open={props.isAdd}
      onClose={() => {
        setTitle("");
        setNote("");
        dispatch(closeAddNote());
      }}
    >
      <DialogTitle>Add Note</DialogTitle>
      <DialogContent>
        <form
          onSubmit={editingId === undefined ? handleAddNote : handleEditNote}
        >
          <FormControl fullWidth>
            <TextField
              autoFocus
              label="Note Title"
              variant="standard"
              value={title}
              sx={{
                marginBottom: "10px",
              }}
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              label="Note"
              variant="standard"
              value={note}
              sx={{
                marginBottom: "10px",
              }}
              onChange={(e) => setNote(e.target.value)}
              multiline
              rows={4}
            />
          </FormControl>
          <DialogActions
            sx={{
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <Button variant="contained" type="submit">
              {editingId === undefined ? "Add " : "Edit "}
              Note
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setTitle("");
                setNote("");
                dispatch(closeAddNote());
              }}
            >
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};
