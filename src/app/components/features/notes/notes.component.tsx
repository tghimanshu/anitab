import React, { useEffect, useState } from "react";
import {
  AiFillCheckCircle,
  AiOutlineCloseCircle,
  AiOutlinePlus,
} from "react-icons/ai";
import {
  Note,
  addNote,
  loadNotes,
} from "../../../services/notes/notes.service";
import "./notes.component.scss";

const AddNote = (props: { setIsAdd: (arg0: boolean) => void }) => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  const onAddnote = () => {
    addNote(title, note);
    props.setIsAdd(false);
  };

  return (
    <div className="add-notes">
      <div className="add-notes__container">
        <div className="add-notes__header">
          <h1 className="add-notes__title">Add Mission</h1>
          <AiOutlineCloseCircle
            className="add-notes__close"
            onClick={() => props.setIsAdd(false)}
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
              onClick={() => props.setIsAdd(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Notes = (props: {
  notes: Note[];
  setNotes: any;
  isAdd: any;
  setIsAdd: any;
}) => {
  const { notes, isAdd, setIsAdd } = props;
  return (
    <section className="notes">
      <div className="notes__header">
        <h1 className="notes__title">Notes</h1>
        <AiOutlinePlus className="notes__add" onClick={() => setIsAdd(true)} />
      </div>
      <div className="notes__container">
        {notes.length === 0 && (
          <p className="notes__empty">There are no notes yet!</p>
        )}
        {notes.length !== 0 &&
          notes.map((note) => {
            return (
              note.createdDate.toDateString() ===
                new Date(Date.now()).toDateString() && (
                <div className="note">
                  <div className="note__title">{note.title}</div>
                  <hr className="note__divider" />
                  <div className="note__note">{note.note}</div>
                </div>
              )
            );
          })}
      </div>
      {isAdd && <AddNote setIsAdd={setIsAdd} />}
    </section>
  );
};

export const NotesContainer = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isAdd, setisAdd] = useState(false);

  useEffect(() => {
    setNotes(loadNotes());
  }, [isAdd]);

  useEffect(() => {
    setNotes(loadNotes());
  }, [notes]);

  return (
    <Notes
      notes={notes}
      setNotes={setNotes}
      isAdd={isAdd}
      setIsAdd={setisAdd}
    />
  );
};
