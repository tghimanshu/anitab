import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./plugins/todos/todos.slice";
import notesReducer from "./plugins/notes/notes.slice";
import bookmarkReducer from "./plugins/bookmarks/bookmarks.slice";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    notes: notesReducer,
    bookmarks: bookmarkReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
