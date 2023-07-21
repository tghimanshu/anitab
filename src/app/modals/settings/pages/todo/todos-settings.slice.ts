import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TodoPriority } from "../../../../plugins/todos/todos.slice";

export interface TodosSetting {
  calendar: string;
  includeStartDate: boolean;
  includeStartTime: boolean;
  includeEndDate: boolean;
  includeEndTime: boolean;
  includePriority: boolean;
  priorityOptions: TodoPriority[];
  quickIcons: {
    calendar: boolean;
    edit: boolean;
    delete: boolean;
  };
  infoTexts: {
    priority: boolean;
    startDateTime: boolean;
    endDatetTime: boolean;
  };
}

const initialState: TodosSetting = JSON.parse(
  localStorage.getItem("todosSetting") ||
    JSON.stringify({
      calendar: "",
      includeStartDate: true,
      includeStartTime: true,
      includeEndDate: true,
      includeEndTime: true,
      includePriority: true,
      priorityOptions: [] ,
      quickIcons: {
        calendar: true,
        edit: true,
        delete: true,
      },
      infoTexts: {
        priority: true,
        startDateTime: true,
        endDatetTime: false,
      },
    })
);

const todosSettingsSlice = createSlice({
  name: "todosSettings",
  initialState,
  reducers: {
    updateTodoSetting(state, action: PayloadAction<TodosSetting>) {
      console.log(action.payload.quickIcons);
      localStorage.setItem("todosSetting", JSON.stringify(action.payload));
      return action.payload;
    },
  },
});

export const { updateTodoSetting } = todosSettingsSlice.actions;
export default todosSettingsSlice.reducer;
