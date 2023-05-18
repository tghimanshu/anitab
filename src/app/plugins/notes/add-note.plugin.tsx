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

export const AddNote = (props: { isAdd: boolean }) => {
  const dispatch = useAppDispatch();
  const notes = useAppSelector((state) => state.notes.notes);
  const editingId = useAppSelector((state) => state.notes.isEditing);

  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  // useEffect(() => {
  //   if (editingId !== undefined) {
  //     setTitle(notes[editingId].title);
  //     setNote(notes[editingId].note);
  //   }
  // }, [editingId]);

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

  const handleEditNote = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (editingId !== undefined) {
      dispatch(
        updateNote({
          index: notes[editingId].index,
          title: notes[editingId].title,
          note: notes[editingId].note,
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
