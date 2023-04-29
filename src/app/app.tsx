import React, { useState } from "react";
import RGL, { Layout, WidthProvider } from "react-grid-layout";
import { TodosContainer } from "./plugins/todos/todos.plugin";
import { AddTodo } from "./plugins/todos/add-todo.plugin";
import { useAppSelector } from "./hooks";
import { NotesContainer } from "./plugins/notes/notes.plugin";
import { AddNote } from "./plugins/notes/add-note.plugin";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BookmarksContainer } from "./plugins/bookmarks/bookmarks.plugin";
import { AddBookmark } from "./plugins/bookmarks/add-bookmark.plugin";

const ReactGridLayout = WidthProvider(RGL);

export const App = () => {
  const isAddTodo = useAppSelector((state) => state.todos.isAdd);
  const isAddNote = useAppSelector((state) => state.notes.isAdd);
  const isAddBookmark = useAppSelector((state) => state.bookmarks.isAdd);

  const layout = JSON.parse(
    localStorage.getItem("layout") ||
      JSON.stringify([
        { i: "todos", x: 0, y: 0, w: 3, h: 3, minW: 3, minH: 3 },
        { i: "notes", x: 3, y: 0, w: 3, h: 3, minW: 3, minH: 3 },
        { i: "bookmarks", x: 6, y: 0, w: 3, h: 3, minW: 3, minH: 3 },
      ])
  );
  const [isNW, setIsNW] = useState(false);

  const getBackgroundImage = () => {
    let group = localStorage.getItem("group");
    if (group) {
      switch (group) {
        case "gaudmire":
          return "url(./assets/gaudmire.webp)";
        case "spectreseek":
          return "url(./assets/spectreseek.webp)";
        case "erevald":
          return "url(./assets/erevald.webp)";
        case "alterok":
          return "url(./assets/alterok.webp)";
        default:
          return "url(./assets/background.jpg)";
      }
    } else {
      return "url(./assets/background.jpg)";
    }
  };

  function onChangeLayout(newLayout: Layout[]) {
    localStorage.setItem("layout", JSON.stringify(newLayout));
  }
  return (
    <div
      className="main-screen"
      style={{
        background: `${getBackgroundImage()} no-repeat center center/cover`,
      }}
    >
      <ReactGridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={60}
        // width={1280}
        isDroppable
        draggableHandle=".drag-handle"
        onLayoutChange={onChangeLayout}
      >
        <div key="todos">
          <TodosContainer />
        </div>
        <div key="notes">
          <NotesContainer />
        </div>
        <div key="bookmarks">
          <BookmarksContainer />
        </div>
      </ReactGridLayout>
      {isAddTodo && <AddTodo />}
      {isAddNote && <AddNote />}
      <AddBookmark isAdd={isAddBookmark} />
      {isNW && (
        <iframe
          src="https://buildspace.so/home"
          className="nights-weekends__content"
        ></iframe>
      )}
    </div>
  );
};
