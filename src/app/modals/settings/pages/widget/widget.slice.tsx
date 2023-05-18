import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import React from "react";
import { Todos, TodosContainer } from "../../../../plugins/todos/todos.plugin";
import { NotesContainer } from "../../../../plugins/notes/notes.plugin";
import { BookmarksContainer } from "../../../../plugins/bookmarks/bookmarks.plugin";
import { PomodoroContainer } from "../../../../plugins/pomodoro/pomodor.plugin";
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

export interface Widget {
  id: string;
  i?: string;
  title: string;
  visible: boolean;
  minW: number;
  minH: number;
  w: number;
  h: number;
  x: number;
  y: number;
}
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

const widgetsSettingSlice = createSlice({
  name: "widgetSettings",
  initialState,
  reducers: {
    toggleWidget: (state, action: PayloadAction<string>) => {
      const i = state.findIndex((todo) => todo.id === action.payload);
      state[i].visible = !state[i].visible;
    },
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
