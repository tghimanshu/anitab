import { combineReducers, configureStore } from "@reduxjs/toolkit";
import todosReducer from "./plugins/todos/todos.slice";
import notesReducer from "./plugins/notes/notes.slice";
import bookmarkReducer from "./plugins/bookmarks/bookmarks.slice";
import pomodoroReducer from "./plugins/pomodoro/pomodoro.slice";
import widgetSettingReducer from "./modals/settings/pages/widget/widget.slice";
import settingsReducer from "./modals/settings/settings.slice";
import profileReducer from "./modals/settings/pages/profile/profile.slice";

/**
 * The Redux store configuration for the application.
 *
 * This store combines reducers from various features (plugins) and settings:
 * - `todos`: Manages the state of the Todo List plugin.
 * - `notes`: Manages the state of the Notes plugin.
 * - `bookmarks`: Manages the state of the Bookmarks plugin.
 * - `pomodoro`: Manages the state of the Pomodoro timer plugin.
 * - `settings`: Aggregates settings-related state:
 *   - `widgets`: Manages widget layout and visibility.
 *   - `settings`: Manages general application settings.
 *   - `profile`: Manages user profile information.
 */
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

/**
 * Type representing the `dispatch` function of the Redux store.
 */
export type AppDispatch = typeof store.dispatch;

/**
 * Type representing the root state of the Redux store.
 */
export type RootState = ReturnType<typeof store.getState>;
