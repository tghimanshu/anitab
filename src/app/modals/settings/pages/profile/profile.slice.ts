import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Interface representing a user profile.
 */
export interface Profile {
  /**
   * The username of the user.
   */
  username: string;
  /**
   * The greeting message to display (e.g., "Good morning").
   */
  greeting: string;
  /**
   * The background configuration for the new tab page.
   */
  background: {
    /**
     * The type of background ("default" or "custom").
     */
    type: string;
    /**
     * The URL of the background image.
     */
    url: string;
  };
}

// Migrate legacy "username" from localStorage to "profile" object.
if (localStorage.getItem("username")) {
  let u = localStorage.getItem("username");
  localStorage.setItem("profile", JSON.stringify({ username: u }));
  localStorage.removeItem("username");
}

/**
 * The initial state of the profile.
 *
 * It attempts to load the profile from `localStorage`. If not found, it defaults
 * to a preset profile (Naruto theme).
 */
const initialState: Profile = JSON.parse(
  localStorage.getItem("profile") ||
    JSON.stringify({
      username: "Naruto",
      greeting: "Konnichiwa, ",
      background: { type: "default", url: "./assets/background.jpg" },
    })
);

/**
 * Redux slice for managing the user profile state.
 *
 * Handles actions for updating profile details like username, greeting, and background.
 * It also includes some easter eggs for specific usernames that change the default background.
 */
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    /**
     * Updates the user profile.
     *
     * This reducer updates the state with the provided payload and persists
     * the new state to `localStorage`. It also handles logic for setting
     * default backgrounds based on specific usernames (easter eggs).
     *
     * @param {Profile} state - The current state.
     * @param {PayloadAction<Profile>} action - The action containing the new profile data.
     */
    updateProfile(state, action: PayloadAction<Profile>) {
      state.username = action.payload.username;
      state.greeting = action.payload.greeting;
      if (action.payload.background.type === "default") {
        state.background.type = action.payload.background.type;
        if (action.payload.username.toLowerCase().includes("gaudmire")) {
          state.background.url = "./assets/gaudmire.webp";
        } else if (
          action.payload.username.toLowerCase().includes("spectreseek")
        ) {
          state.background.url = "./assets/spectreseek.webp";
        } else if (action.payload.username.toLowerCase().includes("erevald")) {
          state.background.url = "./assets/erevald.webp";
        } else if (action.payload.username.toLowerCase().includes("alterok")) {
          state.background.url = "./assets/alterok.webp";
        } else {
          state.background.url = "./assets/background.jpg";
        }
      } else {
        state.background.type = action.payload.background.type;
        state.background.url = action.payload.background.url;
      }
      localStorage.setItem("profile", JSON.stringify(state));
    },
  },
});

export const { updateProfile } = profileSlice.actions;
export default profileSlice.reducer;
