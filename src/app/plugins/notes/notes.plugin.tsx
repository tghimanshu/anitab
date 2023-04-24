import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { openAddNote } from "./notes.slice";
import "./notes.plugin.scss";

export const Notes = () => {
  const notes = useAppSelector((state) => state.notes.notes);
  const dispatch = useAppDispatch();
  return (
    <section className="notes">
      <div className="notes__header">
        <h1 className="notes__title">Notes</h1>
        <AiOutlinePlus
          className="notes__add"
          onClick={() => dispatch(openAddNote())}
        />
      </div>
      <div className="notes__container">
        {notes.length === 0 && (
          <p className="notes__empty">There are no notes yet!</p>
        )}
        {notes.length !== 0 &&
          notes.map((note) => {
            return (
              new Date(note.createdDate).toDateString() ===
                new Date(Date.now()).toDateString() && (
                <div className="note" key={note.index}>
                  <div className="note__title">{note.title}</div>
                  <hr className="note__divider" />
                  <div className="note__note">{note.note}</div>
                </div>
              )
            );
          })}
      </div>
    </section>
  );
};

export const NotesContainer = () => {
  return <Notes />;
};
