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
import { useAppDispatch } from "../../hooks";
import { Bookmark, addBookmark, closeAddBookmark } from "./bookmarks.slice";

export const AddBookmark = (props: { isAdd: boolean }) => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleAddBookmark = () => {
    const bookmark: Bookmark = {
      title,
      url: new URL(url),
    };
    dispatch(addBookmark(bookmark));
    dispatch(closeAddBookmark());
  };
  return (
    <Dialog open={props.isAdd} onClose={() => dispatch(closeAddBookmark())}>
      <DialogTitle>Add Bookmark</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <TextField
            id="standard-basic"
            label="Bookmark Title"
            variant="standard"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            id="standard-basic"
            label="Bookmark Link"
            variant="standard"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </FormControl>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: "center",
        }}
      >
        <Button variant="contained" onClick={handleAddBookmark}>
          Add Bookmark
        </Button>
        <Button variant="outlined" onClick={() => dispatch(closeAddBookmark())}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
