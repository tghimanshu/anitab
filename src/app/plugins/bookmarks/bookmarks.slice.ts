import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Bookmark {
  title: string;
  url: URL;
}

const initialState: {
  bookmarks: Bookmark[];
  isAdd: boolean;
} = JSON.parse(
  localStorage.getItem("bookmarks") ||
    JSON.stringify({
      bookmarks: [
        {
          title: "stackoverflow",
          url: "https://stackoverflow.com/questions/71829854/cognito-error-invalid-userpoolid-format",
        },
      ],
      isAdd: false,
    })
);

const bookmarkSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {
    openAddBookmark(state) {
      state.isAdd = true;
      localStorage.setItem("bookmarks", JSON.stringify(state));
    },
    closeAddBookmark(state) {
      state.isAdd = false;
      localStorage.setItem("bookmarks", JSON.stringify(state));
    },
    addBookmark(state, action: PayloadAction<Bookmark>) {
      state.bookmarks.push(action.payload);
      localStorage.setItem("bookmarks", JSON.stringify(state));
    },
  },
});

export const { openAddBookmark, closeAddBookmark, addBookmark } =
  bookmarkSlice.actions;
export default bookmarkSlice.reducer;
