import { createSlice } from "@reduxjs/toolkit";

export interface TodosSetting {
  calendar?: string;
  includeStartDate?: boolean;
  includeStartTime?: boolean;
  includeEndDate?: boolean;
  includeEndTime?: boolean;
  quickIcons: {
    calendar: boolean;
    edit: boolean;
    delete: boolean;
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
      quickIcons: {
        calendar: true,
        edit: true,
        delete: true,
      },
    })
);

const todosSettingsSlice = createSlice({
  name: "todosSettings",
  initialState,
  reducers: {},
});

// export const {} = todosSettingsSlice.actions;
export default todosSettingsSlice.reducer;
