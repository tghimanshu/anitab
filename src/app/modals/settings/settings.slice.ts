import { createSlice } from "@reduxjs/toolkit";

/**
 * Interface representing the state of the settings modal.
 */
export interface Setting {
  /**
   * Whether the settings modal is currently visible.
   */
  show: boolean;
}

const initialState: Setting = {
  show: false,
};

/**
 * Redux slice for managing the state of the settings modal.
 *
 * Handles actions for opening and closing the settings modal.
 */
const settingsSettingSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    /**
     * Opens the settings modal.
     *
     * @param {Setting} state - The current state.
     */
    openSettings(state) {
      state.show = true;
    },
    /**
     * Closes the settings modal.
     *
     * @param {Setting} state - The current state.
     */
    closeSettings(state) {
      state.show = false;
    },
  },
});

export const { openSettings, closeSettings } = settingsSettingSlice.actions;
export default settingsSettingSlice.reducer;
