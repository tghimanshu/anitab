import React from "react";
import { useAppSelector } from "../hooks";
import { AddTodo } from "../plugins/todos/add-todo.plugin";
import { AddNote } from "../plugins/notes/add-note.plugin";
import { AddBookmark } from "../plugins/bookmarks/add-bookmark.plugin";

export const Modals = () => {
  const isAddTodo = useAppSelector((state) => state.todos.isAdd);
  const isAddNote = useAppSelector((state) => state.notes.isAdd);
  const isAddBookmark = useAppSelector((state) => state.bookmarks.isAdd);

  return (
    <>
      <AddTodo isAdd={isAddTodo} />
      <AddNote isAdd={isAddNote} />
      <AddBookmark isAdd={isAddBookmark} />
    </>
  );
};
