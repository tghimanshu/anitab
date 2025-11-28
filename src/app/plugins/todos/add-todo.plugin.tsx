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

/**
 * Dialog for adding or editing a todo item.
 *
 * This component displays a modal with a form to enter or modify the title
 * of a todo. It handles both creating new todos and updating existing ones
 * based on the `editingId` state from the store.
 *
 * @param {object} props - The component props.
 * @param {boolean} props.isAdd - Whether the dialog is currently open.
 * @returns {JSX.Element} The rendered Add/Edit Todo dialog.
 */
export const AddTodo = (props: { isAdd: boolean }) => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos.todos);
  const editingId = useAppSelector((state) => state.todos.isEditing);

  const [title, setTitle] = useState("");
  // const [priority, setPriority] = useState("Gennin");

  /**
   * Populates the form fields if the component is in edit mode.
   */
  useEffect(() => {
    if (editingId !== undefined) {
      const idx = todos.findIndex((v) => v.index === editingId);
      setTitle(todos[idx].title);
    }
  }, [editingId, todos]);

  /**
   * Handles the submission of a new todo.
   *
   * Creates a new todo object and dispatches an action to add it to the store.
   * Then resets the form and closes the dialog.
   *
   * @param {object} event - The form submission event.
   */
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

  /**
   * Handles the update of an existing todo.
   *
   * Dispatches an action to update the todo in the store with the new values.
   * Then resets the form and closes the dialog.
   *
   * @param {object} event - The form submission event.
   */
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
