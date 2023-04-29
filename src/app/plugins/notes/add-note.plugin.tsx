import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Note, addNote, closeAddNote } from "./notes.slice";
import { AiOutlineCloseCircle } from "react-icons/ai";

export const AddNote = () => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const dispatch = useAppDispatch();
  const notes = useAppSelector((state) => state.notes.notes);

  const onAddnote = () => {
    const newNote: Note = {
      index: notes.length === 0 ? 1 : notes[notes.length - 1].index + 1,
      title,
      note,
      createdDate: new Date(Date.now()).toDateString(),
      archived: false,
    };
    dispatch(addNote(newNote));
    dispatch(closeAddNote());
  };

  return (
    <div className="add-notes">
      <div className="add-notes__container">
        <div className="add-notes__header">
          <h1 className="add-notes__title">Add Mission</h1>
          <AiOutlineCloseCircle
            className="add-notes__close"
            onClick={() => dispatch(closeAddNote())}
          />
        </div>
        <div className="add-notes__form">
          <input
            type="text"
            className="add-notes__input-title"
            placeholder="Enter Mission Title Here..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="add-notes__input-priority"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
          <div className="add-notes__actions">
            <button className="add-notes__submit" onClick={onAddnote}>
              Add Note
            </button>
            <button
              className="add-notes__cancel"
              onClick={() => dispatch(closeAddNote())}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
