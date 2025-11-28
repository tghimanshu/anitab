import React from "react";
import RGL, { Layout, WidthProvider } from "react-grid-layout";
import { AddTodo } from "./plugins/todos/add-todo.plugin";
import { useAppDispatch, useAppSelector } from "./hooks";
import { AddNote } from "./plugins/notes/add-note.plugin";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { AddBookmark } from "./plugins/bookmarks/add-bookmark.plugin";
import { Header } from "./header/header";
import {
  allWidgets,
  updateLayout,
} from "./modals/settings/pages/widget/widget.slice";
import { HashRouter } from "react-router-dom";

const ReactGridLayout = WidthProvider(RGL);

/**
 * The main application component.
 *
 * This component sets up the layout of the application, including the background,
 * header, and the grid of widgets. It uses `react-grid-layout` to manage the
 * positioning of widgets and handles the display of modal dialogs for adding
 * todos, notes, and bookmarks.
 *
 * It uses Redux for state management to retrieve user preferences (profile background)
 * and widget configurations.
 *
 * @returns {JSX.Element} The rendered application component.
 */
export const App = () => {
  const dispatch = useAppDispatch();
  const isAddTodo = useAppSelector((state) => state.todos.isAdd);
  const isAddNote = useAppSelector((state) => state.notes.isAdd);
  const isAddBookmark = useAppSelector((state) => state.bookmarks.isAdd);

  const widgets = useAppSelector((state) => state.settings.widgets);
  const profile = useAppSelector((state) => state.settings.profile);

  /**
   * Handler for layout changes in the grid.
   *
   * Dispatches an action to update the widget layout in the Redux store
   * whenever the user rearranges or resizes widgets.
   *
   * @param {Layout[]} newLayout - The new layout configuration provided by `react-grid-layout`.
   */
  function onChangeLayout(newLayout: Layout[]) {
    dispatch(updateLayout(newLayout.map((v) => ({ ...v, id: v.i }))));
  }
  return (
    <HashRouter>
      <div
        className="main-screen"
        style={{
          background: `url(${profile.background.url}) no-repeat center center/cover`,
        }}
      >
        <Header />
        <div className="main-content">
          <ReactGridLayout
            className="layout"
            layout={widgets.map((widget) => ({
              ...widget,
              i: widget.id,
            }))}
            cols={12}
            rowHeight={60}
            isDroppable
            draggableHandle=".drag-handle"
            onLayoutChange={onChangeLayout}
          >
            {/* <div key="todos">
          <TodosContainer />
        </div>
        <div key="notes">
          <NotesContainer />
        </div>
        <div key="bookmarks">
          <BookmarksContainer />
        </div> */}
            {widgets.map((widget) => {
              return widget.visible && allWidgets[widget.id].component();
            })}
          </ReactGridLayout>
        </div>
        <AddTodo isAdd={isAddTodo} />
        <AddNote isAdd={isAddNote} />
        <AddBookmark isAdd={isAddBookmark} />
      </div>
    </HashRouter>
  );
};
