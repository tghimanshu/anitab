enum Priority {
  Gennin = "Gennin",
  Chunnin = "Chunnin",
  Jonin = "Jonin",
  Anbu = "Anbu",
  Hokage = "Hokage",
}
export interface Todo {
  index: number;
  title: string;
  completed: boolean;
  createdDate: Date;
  priority: Priority;
}
export const todos: Todo[] = [];

export const loadTodos = () => {
  const data = localStorage.getItem("todos");
  if (data) {
    todos.splice(0, todos.length);
    todos.push(
      ...(JSON.parse(data) as Todo[]).map((todo) => ({
        ...todo,
        createdDate: new Date(todo.createdDate),
      }))
    );
  }
  return todos;
};

export const addTodo = (title: string, priority: string) => {
  todos.push({
    index: todos.length === 0 ? 1 : todos[todos.length - 1].index + 1,
    title,
    completed: false,
    priority: priority as Priority,
    createdDate: new Date(),
  });
  localStorage.setItem("todos", JSON.stringify(todos));
};

export const completeTodo = (index: number) => {
  const idx = todos.findIndex((todo) => todo.index === index);
  todos[idx].completed = !todos[idx].completed;
  localStorage.setItem("todos", JSON.stringify(todos));
  return todos;
};
