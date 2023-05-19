import { combineReducers, configureStore } from "@reduxjs/toolkit";
import todosReducer from "./plugins/todos/todos.slice";
import notesReducer from "./plugins/notes/notes.slice";
import bookmarkReducer from "./plugins/bookmarks/bookmarks.slice";
import pomodoroReducer from "./plugins/pomodoro/pomodoro.slice";
import widgetSettingReducer from "./modals/settings/pages/widget/widget.slice";
import settingsReducer from "./modals/settings/settings.slice";
import profileReducer from "./modals/settings/pages/profile/profile.slice";

export const store = configureStore({
  reducer: combineReducers({
    todos: todosReducer,
    notes: notesReducer,
    bookmarks: bookmarkReducer,
    pomodoro: pomodoroReducer,
    settings: combineReducers({
      widgets: widgetSettingReducer,
      settings: settingsReducer,
      profile: profileReducer,
    }),
  }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
