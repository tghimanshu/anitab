import { createSlice } from "@reduxjs/toolkit";

export interface Setting {
  show: boolean;
}

const initialState: Setting = {
  show: false,
};

const settingsSettingSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    openSettings(state) {
      state.show = true;
    },
    closeSettings(state) {
      state.show = false;
    },
  },
});

export const { openSettings, closeSettings } = settingsSettingSlice.actions;
export default settingsSettingSlice.reducer;
