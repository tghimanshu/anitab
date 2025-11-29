import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import React from "react";
import { TodosContainer } from "../../../../plugins/todos/todos.plugin";
import { NotesContainer } from "../../../../plugins/notes/notes.plugin";
import { BookmarksContainer } from "../../../../plugins/bookmarks/bookmarks.plugin";
import { PomodoroContainer } from "../../../../plugins/pomodoro/pomodor.plugin";

/**
 * Registry of all available widgets with their configuration.
 *
 * Each entry includes the widget's ID, title, default visibility, component to render,
 * and default grid layout properties (dimensions, position).
 */
export const allWidgets: {
  [key: string]: {
    id: string;
    title: string;
    visible: boolean;
    component: () => JSX.Element;
    minW: number;
    minH: number;
    w: number;
    h: number;
    x: number;
    y: number;
  };
} = {
  todos: {
    id: "todos",
    title: "Todos",
    component: () => (
      <div key={"todos"}>
        <TodosContainer />
      </div>
    ),
    visible: true,
    minW: 3,
    minH: 3,
    w: 3,
    h: 3,
    x: 0,
    y: 0,
  },
  bookmarks: {
    id: "bookmarks",
    title: "Bookmarks",
    component: () => (
      <div key={"bookmarks"}>
        <BookmarksContainer />
      </div>
    ),
    visible: true,
    minW: 3,
    minH: 3,
    w: 3,
    h: 3,
    x: 0,
    y: 0,
  },
  notes: {
    id: "notes",
    title: "Notes",
    component: () => (
      <div key={"notes"}>
        <NotesContainer />
      </div>
    ),
    visible: true,
    minW: 3,
    minH: 3,
    w: 3,
    h: 3,
    x: 0,
    y: 0,
  },
  pomodoro: {
    id: "pomodoro",
    title: "Pomodoro",
    component: () => (
      <div key={"pomodoro"}>
        <PomodoroContainer />
      </div>
    ),
    visible: true,
    minW: 2,
    minH: 3,
    w: 2,
    h: 3,
    x: 3,
    y: 0,
  },
};

/**
 * Interface representing the state and layout configuration of a widget.
 */
export interface Widget {
  /**
   * Unique identifier for the widget.
   */
  id: string;
  /**
   * Internal identifier used by react-grid-layout (optional).
   */
  i?: string;
  /**
   * Display title of the widget.
   */
  title: string;
  /**
   * Whether the widget is currently visible on the dashboard.
   */
  visible: boolean;
  /**
   * Minimum width of the widget in grid units.
   */
  minW: number;
  /**
   * Minimum height of the widget in grid units.
   */
  minH: number;
  /**
   * Current width of the widget in grid units.
   */
  w: number;
  /**
   * Current height of the widget in grid units.
   */
  h: number;
  /**
   * Current X position of the widget in grid units.
   */
  x: number;
  /**
   * Current Y position of the widget in grid units.
   */
  y: number;
}

// Migrate legacy "layout" from localStorage to "widgets" object.
if (localStorage.getItem("layout")) {
  let data: {
    i: string;
    w: number;
    h: number;
    x: number;
    y: number;
  }[] = JSON.parse(localStorage.getItem("layout") || "[]");
  let newData = Object.values(allWidgets).map((v) => {
    let val = data.findIndex((data) => data.i === v.id);
    return {
      id: v.id,
      title: v.title,
      visible: v.visible,
      minW: v.minW,
      minH: v.minH,
      w: val !== -1 ? data[val].w : v.w,
      h: val !== -1 ? data[val].h : v.h,
      x: val !== -1 ? data[val].x : v.x,
      y: val !== -1 ? data[val].y : v.y,
    };
  });
  localStorage.setItem("widgets", JSON.stringify(newData));
  localStorage.removeItem("layout");
}

const localLayout: Widget[] = JSON.parse(
  localStorage.getItem("widgets") || "[]"
).map((v: Widget) => ({
  id: v.id,
  title: v.title,
  visible: v.visible,
  minW: v.minW,
  minH: v.minH,
  w: v.w,
  h: v.h,
  x: v.x,
  y: v.y,
}));

/**
 * The initial state of the widgets.
 *
 * It combines the default configuration (`allWidgets`) with any persisted layout
 * information found in `localStorage`.
 */
const initialState: Widget[] = Object.values(
  localLayout.length !== 0 ? localLayout : allWidgets
).map((v) => {
  return {
    id: v.id,
    title: v.title,
    visible: v.visible,
    minW: v.minW,
    minH: v.minH,
    w: v.w,
    h: v.h,
    x: v.x,
    y: v.y,
  };
});

/**
 * Redux slice for managing widget settings and layout.
 *
 * Handles actions for toggling widget visibility and updating their layout positions.
 */
const widgetsSettingSlice = createSlice({
  name: "widgetSettings",
  initialState,
  reducers: {
    /**
     * Toggles the visibility of a widget.
     *
     * @param {Widget[]} state - The current state.
     * @param {PayloadAction<string>} action - The action containing the widget ID.
     */
    toggleWidget: (state, action: PayloadAction<string>) => {
      const i = state.findIndex((todo) => todo.id === action.payload);
      state[i].visible = !state[i].visible;
    },
    /**
     * Updates the layout (position and size) of the widgets.
     *
     * @param {Widget[]} state - The current state.
     * @param {PayloadAction<Partial<Widget>[]>} action - The action containing the new layout data.
     */
    updateLayout: (state, action: PayloadAction<Partial<Widget>[]>) => {
      for (let layout of state) {
        if (layout.visible) {
          const i = action.payload.findIndex((v) => v.id === layout.id);
          layout.x = action.payload[i].x!;
          layout.y = action.payload[i].y!;
          layout.w = action.payload[i].w!;
          layout.h = action.payload[i].h!;
        }
      }
      localStorage.setItem("widgets", JSON.stringify(state));
    },
  },
});

export const { toggleWidget, updateLayout } = widgetsSettingSlice.actions;
export default widgetsSettingSlice.reducer;
