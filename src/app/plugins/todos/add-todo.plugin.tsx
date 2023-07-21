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
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

export const AddTodo = (props: { isAdd: boolean }) => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos.todos);
  const editingId = useAppSelector((state) => state.todos.isEditing);
  const todosSettings = useAppSelector((state) => state.settings.todos);

  const [title, setTitle] = useState("");
  // const [dates, setDates] = useState<{
  //   startDate?: string;
  //   startTime?: string;
  //   endDate?: string;
  //   endTime?: string;
  // } | null>(null);
  const [priority, setPriority] = useState(
    JSON.stringify({ level: 1, name: "P1" })
  );

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
      priority: JSON.parse(priority),
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
      <DialogTitle>Add Mission</DialogTitle>
      <DialogContent>
        <form
          onSubmit={editingId === undefined ? handleAddTodo : handleEditTodo}
        >
          <FormControl fullWidth>
            <TextField
              autoFocus
              label="Todo"
              variant="outlined"
              value={title}
              sx={{
                marginTop: "10px",
                marginBottom: "10px",
              }}
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
          {todosSettings.includePriority && (
            <FormControl fullWidth>
              <Select
                label="Priority"
                variant="outlined"
                value={priority}
                sx={{
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
                required
                onChange={(e) => setPriority(e.target.value)}
              >
                <MenuItem value={JSON.stringify({ level: 1, name: "P1" })}>
                  Priority 1
                </MenuItem>
                <MenuItem value={JSON.stringify({ level: 1, name: "P2" })}>
                  Priority 2
                </MenuItem>
                <MenuItem value={JSON.stringify({ level: 1, name: "P3" })}>
                  Priority 3
                </MenuItem>
                <MenuItem value={JSON.stringify({ level: 1, name: "P4" })}>
                  Priority 4
                </MenuItem>
                <MenuItem value={JSON.stringify({ level: 1, name: "P5" })}>
                  Priority 5
                </MenuItem>
              </Select>
            </FormControl>
          )}
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <Grid container spacing={2}>
              {todosSettings.includeStartDate && (
                <Grid item lg={6}>
                  <FormControl fullWidth>
                    <DatePicker label="Start Date" />
                  </FormControl>
                </Grid>
              )}
              {todosSettings.includeStartTime && (
                <Grid item lg={6}>
                  <FormControl fullWidth>
                    <TimePicker label="Start Time" />
                  </FormControl>
                </Grid>
              )}
              {todosSettings.includeEndDate && (
                <Grid item lg={6}>
                  <FormControl fullWidth>
                    <DatePicker label="End Date" />
                  </FormControl>
                </Grid>
              )}
              {todosSettings.includeEndTime && (
                <Grid item lg={6}>
                  <FormControl fullWidth>
                    <TimePicker label="Start Time" />
                  </FormControl>
                </Grid>
              )}
            </Grid>
          </LocalizationProvider>
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
