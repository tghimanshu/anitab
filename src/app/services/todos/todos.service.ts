/**
 * Enum representing the priority levels of a todo.
 * Uses Naruto ranks as priority levels.
 */
enum Priority {
  Gennin = "Gennin",
  Chunnin = "Chunnin",
  Jonin = "Jonin",
  Anbu = "Anbu",
  Hokage = "Hokage",
}

/**
 * Interface representing a todo item.
 */
export interface Todo {
  /**
   * Unique index/ID of the todo.
   */
  index: number;
  /**
   * Title of the todo.
   */
  title: string;
  /**
   * Whether the todo is completed.
   */
  completed: boolean;
  /**
   * Date the todo was created.
   */
  createdDate: Date;
  /**
   * Priority of the todo.
   */
  priority: Priority;
}

/**
 * Array to store todos in memory.
 */
export const todos: Todo[] = [];

/**
 * Loads todos from local storage.
 *
 * This function retrieves the 'todos' item from localStorage, parses it,
 * converts the date strings back to Date objects, and populates the `todos` array.
 *
 * @returns {Todo[]} The loaded todos array.
 */
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

/**
 * Adds a new todo.
 *
 * Creates a new todo object with the given title and priority, adds it to the
 * `todos` array, and saves the updated array to localStorage.
 *
 * @param {string} title - The title of the new todo.
 * @param {string} priority - The priority of the new todo (will be cast to Priority enum).
 */
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

/**
 * Toggles the completion status of a todo.
 *
 * Finds the todo by its index, flips its `completed` status, saves the changes
 * to localStorage, and returns the updated todos array.
 *
 * @param {number} index - The index/ID of the todo to toggle.
 * @returns {Todo[]} The updated todos array.
 */
export const completeTodo = (index: number) => {
  const idx = todos.findIndex((todo) => todo.index === index);
  todos[idx].completed = !todos[idx].completed;
  localStorage.setItem("todos", JSON.stringify(todos));
  return todos;
};
