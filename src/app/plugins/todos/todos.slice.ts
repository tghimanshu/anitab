import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
  index: number;
  title: string;
  completed: boolean;
  createdDate: string;
  priority: string;
}

const initialState: {
  todos: Todo[];
  isAdd: boolean;
  isEditing?: number;
} = JSON.parse(
  localStorage.getItem("todos") || JSON.stringify({ todos: [], isAdd: false })
) as { todos: Todo[]; isAdd: boolean };

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    openAddTodo(state) {
      state.isAdd = true;
      localStorage.setItem("todos", JSON.stringify(state));
    },
    openEditTodo(state, action: PayloadAction<number>) {
      state.isAdd = true;
      state.isEditing = action.payload;
      localStorage.setItem("todos", JSON.stringify(state));
    },
    closeAddTodo(state) {
      if (state.isEditing) delete state.isEditing;
      state.isAdd = false;
      localStorage.setItem("todos", JSON.stringify(state));
    },
    addTodo(state, action: PayloadAction<Todo>) {
      state.todos.push(action.payload);
      localStorage.setItem("todos", JSON.stringify(state));
    },
    toggleComplete(state, action: PayloadAction<number>) {
      const index = state.todos.findIndex(
        (todo) => todo.index === action.payload
      );
      state.todos[index].completed = !state.todos[index].completed;
      localStorage.setItem("todos", JSON.stringify(state));
    },
    deleteTodo(state, action: PayloadAction<Todo>) {
      let i = state.todos.findIndex(
        (todo) => todo.index === action.payload.index
      );
      state.todos.splice(i, 1);
      localStorage.setItem("todos", JSON.stringify(state));
    },
  },
});

export const {
  addTodo,
  closeAddTodo,
  openAddTodo,
  toggleComplete,
  deleteTodo,
} = todoSlice.actions;
export default todoSlice.reducer;
