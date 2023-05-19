import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface Profile {
  username: string;
  greeting: string;
  background: {
    type: string;
    url: string;
  };
}
if (localStorage.getItem("username")) {
  let u = localStorage.getItem("username");
  localStorage.setItem("profile", JSON.stringify({ username: u }));
  localStorage.removeItem("username");
}

const initialState: Profile = JSON.parse(
  localStorage.getItem("profile") ||
    JSON.stringify({
      username: "Naruto",
      greeting: "Konnichiwa, ",
      background: { type: "default", url: "./assets/background.jpg" },
    })
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
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
