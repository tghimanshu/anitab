import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Interface representing the state of the Pomodoro timer.
 */
export interface Pomodoro {
  /**
   * Duration of the work timer in seconds.
   */
  workTime: number;
  /**
   * Duration of the break timer in seconds.
   */
  breakTime: number;
  /**
   * The currently active timer mode ("work" or "break").
   */
  active: string;
}

/**
 * Initial state of the Pomodoro slice.
 *
 * Loads the timer settings from `localStorage` if available.
 * Defaults to 25 minutes (1500s) for work and 5 minutes (300s) for break.
 */
const initialState: Pomodoro = JSON.parse(
  localStorage.getItem("pomodoro") ||
    JSON.stringify({
      workTime: 1500,
      breakTime: 300,
      active: "work",
    })
);

/**
 * Redux slice for managing the Pomodoro timer state.
 *
 * Handles actions for updating timer durations and switching between work and break modes.
 */
const pomodoroSlice = createSlice({
  name: "pomodoro",
  initialState,
  reducers: {
    /**
     * Sets the durations for work and break timers.
     *
     * @param {Pomodoro} state - The current state.
     * @param {PayloadAction<{ workTime: number; breakTime: number }>} action - The action containing new durations.
     */
    setTimers(
      state,
      action: PayloadAction<{ workTime: number; breakTime: number }>
    ) {
      state.workTime = action.payload.workTime;
      state.breakTime = action.payload.breakTime;
      localStorage.setItem("pomodoro", JSON.stringify(state));
    },
    /**
     * Changes the active timer mode (e.g., from "work" to "break").
     *
     * @param {Pomodoro} state - The current state.
     * @param {PayloadAction<string>} action - The new active mode.
     */
    changeActiveTimer(state, action: PayloadAction<string>) {
      state.active = action.payload;
    },
  },
});

export const { changeActiveTimer, setTimers } = pomodoroSlice.actions;
export default pomodoroSlice.reducer;
