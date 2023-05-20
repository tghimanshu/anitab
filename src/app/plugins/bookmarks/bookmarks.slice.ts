import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Bookmark {
  index: number;
  title: string;
  url: string;
}

const initialState: {
  bookmarks: Bookmark[];
  isAdd: boolean;
} = JSON.parse(
  localStorage.getItem("bookmarks") ||
    JSON.stringify({
      bookmarks: [],
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
    deleteBookmark(state, action: PayloadAction<Bookmark>) {
      let i = state.bookmarks.findIndex(
        (bookmark) => bookmark.index === action.payload.index
      );
      state.bookmarks.splice(i, 1);
      localStorage.setItem("bookmarks", JSON.stringify(state));
    },
  },
});

export const {
  openAddBookmark,
  closeAddBookmark,
  addBookmark,
  deleteBookmark,
} = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
