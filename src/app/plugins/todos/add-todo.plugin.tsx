import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Todo, addTodo, closeAddTodo, updateTodo } from "./todos.slice";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
} from "@mui/material";

export const AddTodo = (props: { isAdd: boolean }) => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos.todos);
  const editingId = useAppSelector((state) => state.todos.isEditing);

  const [title, setTitle] = useState("");
  // const [priority, setPriority] = useState("Gennin");

  useEffect(() => {
    if (editingId !== undefined) {
      const idx = todos.findIndex((v) => v.index === editingId);
      setTitle(todos[idx].title);
    }
  }, [editingId, todos]);

  const handleAddTodo = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const todo: Todo = {
      index: todos.length === 0 ? 1 : todos[todos.length - 1].index + 1,
      title,
      priority: "Genin",
      completed: false,
      createdDate: new Date().toISOString(),
    };
    dispatch(addTodo(todo));
    setTitle("");
    dispatch(closeAddTodo());
  };

  const handleEditTodo = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (editingId !== undefined) {
      const idx = todos.findIndex((v) => v.index === editingId);
      dispatch(
        updateTodo({
          ...todos[idx],
          title: title,
        })
      );
    }
    setTitle("");
    dispatch(closeAddTodo());
  };

  return (
    <Dialog
      open={props.isAdd}
      onClose={() => {
        setTitle("");
        dispatch(closeAddTodo());
      }}
    >
      <DialogTitle>Add Todo</DialogTitle>
      <DialogContent>
        <form
          onSubmit={editingId === undefined ? handleAddTodo : handleEditTodo}
        >
          <FormControl fullWidth>
            <TextField
              autoFocus
              label="Todo"
              variant="standard"
              value={title}
              sx={{
                marginBottom: "10px",
              }}
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
          <DialogActions
            sx={{
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <Button variant="contained" type="submit">
              {editingId === undefined ? "Add " : "Edit "}
              Todo
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setTitle("");
                dispatch(closeAddTodo());
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
