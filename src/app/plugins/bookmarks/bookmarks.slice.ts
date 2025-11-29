import { PayloadAction, createSlice } from "@reduxjs/toolkit";

/**
 * Interface representing a bookmark.
 */
export interface Bookmark {
  /**
   * Unique index/ID of the bookmark.
   */
  index: number;
  /**
   * Title of the bookmark.
   */
  title: string;
  /**
   * URL of the bookmark.
   */
  url: string;
}

/**
 * Initial state of the bookmarks slice.
 *
 * Loads the bookmarks and UI state from `localStorage` if available.
 */
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

/**
 * Redux slice for managing bookmarks.
 *
 * Handles actions for adding, deleting, and managing the "Add Bookmark" modal visibility.
 * All state changes are persisted to `localStorage`.
 */
const bookmarkSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {
    /**
     * Opens the "Add Bookmark" modal.
     *
     * @param {object} state - The current state.
     */
    openAddBookmark(state) {
      state.isAdd = true;
      localStorage.setItem("bookmarks", JSON.stringify(state));
    },
    /**
     * Closes the "Add Bookmark" modal.
     *
     * @param {object} state - The current state.
     */
    closeAddBookmark(state) {
      state.isAdd = false;
      localStorage.setItem("bookmarks", JSON.stringify(state));
    },
    /**
     * Adds a new bookmark to the list.
     *
     * @param {object} state - The current state.
     * @param {PayloadAction<Bookmark>} action - The action containing the new bookmark.
     */
    addBookmark(state, action: PayloadAction<Bookmark>) {
      state.bookmarks.push(action.payload);
      localStorage.setItem("bookmarks", JSON.stringify(state));
    },
    /**
     * Deletes a bookmark from the list.
     *
     * @param {object} state - The current state.
     * @param {PayloadAction<Bookmark>} action - The action containing the bookmark to delete.
     */
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
