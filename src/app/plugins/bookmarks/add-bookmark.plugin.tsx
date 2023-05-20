import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Bookmark, addBookmark, closeAddBookmark } from "./bookmarks.slice";

export const AddBookmark = (props: { isAdd: boolean }) => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const bookmarks: Bookmark[] = useAppSelector(
    (state) => state.bookmarks.bookmarks
  );

  const handleAddBookmark = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const bookmark: Bookmark = {
      index:
        bookmarks.length === 0 ? 1 : bookmarks[bookmarks.length - 1].index + 1,
      title,
      url: url,
    };
    dispatch(addBookmark(bookmark));
    setTitle("");
    setUrl("");
    dispatch(closeAddBookmark());
  };
  return (
    <Dialog
      open={props.isAdd}
      onClose={() => {
        setTitle("");
        setUrl("");
        dispatch(closeAddBookmark());
      }}
    >
      <DialogTitle>Add Bookmark</DialogTitle>
      <DialogContent>
        <form onSubmit={handleAddBookmark}>
          <FormControl fullWidth>
            <TextField
              autoFocus
              id="standard-basic"
              label="Bookmark Title"
              variant="standard"
              value={title}
              sx={{
                marginBottom: "10px",
              }}
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              type="url"
              label="Bookmark Link"
              variant="standard"
              value={url}
              sx={{
                marginBottom: "10px",
              }}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </FormControl>
          <DialogActions
            sx={{
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <Button variant="contained" type="submit">
              Add Bookmark
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setTitle("");
                setUrl("");
                dispatch(closeAddBookmark());
              }}
            >
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};
