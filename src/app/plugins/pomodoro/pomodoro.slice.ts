import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Pomodoro {
  workTime: number;
  breakTime: number;
  active: string;
}

const initialState: Pomodoro = JSON.parse(
  localStorage.getItem("pomodoro") ||
    JSON.stringify({
      workTime: 1500,
      breakTime: 300,
      active: "work",
    })
);
const pomodoroSlice = createSlice({
  name: "pomodoro",
  initialState,
  reducers: {
    setTimers(
      state,
      action: PayloadAction<{ workTime: number; breakTime: number }>
    ) {
      state.workTime = action.payload.workTime;
      state.breakTime = action.payload.breakTime;
      localStorage.setItem("pomodoro", JSON.stringify(state));
    },
    changeActiveTimer(state, action: PayloadAction<string>) {
      state.active = action.payload;
    },
  },
});

export const { changeActiveTimer, setTimers } = pomodoroSlice.actions;
export default pomodoroSlice.reducer;
