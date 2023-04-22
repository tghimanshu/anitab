import React, { useEffect, useState } from "react";
import {
  AiFillCheckCircle,
  AiOutlineCloseCircle,
  AiOutlinePlus,
} from "react-icons/ai";
import {
  Todo,
  addTodo,
  completeTodo,
  loadTodos,
} from "../../../services/todos/todos.service";
import "./todos.component.scss";
import { ProfileStatus } from "../profile-status/profile-status.component";

const AddTodo = (props: { setIsAdd: (arg0: boolean) => void }) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Gennin");

  const onAddTodo = () => {
    addTodo(title, priority);
    props.setIsAdd(false);
  };

  return (
    <div className="add-todos">
      <div className="add-todos__container">
        <div className="add-todos__header">
          <h1 className="add-todos__title">Add Mission</h1>
          <AiOutlineCloseCircle
            className="add-todos__close"
            onClick={() => props.setIsAdd(false)}
          />
        </div>
        <div className="add-todos__form">
          <input
            type="text"
            className="add-todos__input-title"
            placeholder="Enter Mission Title Here..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <select
            className="add-todos__input-priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Gennin">Gennin</option>
            <option value="Chunnin">Chunnin</option>
            <option value="Jonin">Jonin</option>
            <option value="Anbu">Anbu</option>
            <option value="Hokage">Hokage</option>
          </select>
          <div className="add-todos__actions">
            <button className="add-todos__submit" onClick={onAddTodo}>
              Add
            </button>
            <button
              className="add-todos__cancel"
              onClick={() => props.setIsAdd(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Todos = (props: {
  todos: Todo[];
  setTodos: any;
  isAdd: any;
  setIsAdd: any;
  onCompleteTodo: any;
}) => {
  const { todos, isAdd, setIsAdd, onCompleteTodo } = props;
  return (
    <section className="todos">
      <div className="todos__header">
        <h1 className="todos__title">Missions</h1>
        <AiOutlinePlus className="todos__add" onClick={() => setIsAdd(true)} />
      </div>
      <div className="todos__container">
        <h3 className="todo__section">Today</h3>
        {todos.length === 0 && (
          <p className="todos__empty">There are no missions yet!</p>
        )}
        {todos.length !== 0 &&
          todos.map((todo) => {
            return (
              todo.createdDate.toDateString() ===
                new Date(Date.now()).toDateString() && (
                <div
                  className={"todo " + (todo.completed ? "completed" : "")}
                  onClick={() => onCompleteTodo(todo.index)}
                >
                  <AiFillCheckCircle className="todo__btn" />
                  <div className="todo__title">{todo.title}</div>
                </div>
              )
            );
          })}
        <h3 className="todo__section">Older</h3>
        {todos.filter(
          (todo) =>
            todo.createdDate.toDateString() !==
              new Date(Date.now()).toDateString() && !todo.completed
        ).length === 0 && (
          <p className="todos__empty">There are no older missions yet!</p>
        )}
        {todos.length !== 0 &&
          todos.map((todo) => {
            return (
              todo.createdDate.toDateString() !==
                new Date(Date.now()).toDateString() &&
              !todo.completed && (
                <div
                  className={"todo " + (todo.completed ? "completed" : "")}
                  onClick={() => onCompleteTodo(todo.index)}
                >
                  <AiFillCheckCircle className="todo__btn" />
                  <div className="todo__title">{todo.title}</div>
                </div>
              )
            );
          })}
      </div>
      {isAdd && <AddTodo setIsAdd={setIsAdd} />}
    </section>
  );
};

export const TodosContainer = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isAdd, setisAdd] = useState(false);
  const [isNW, setIsNW] = useState(false);

  useEffect(() => {
    setTodos(loadTodos());
  }, [isAdd]);

  useEffect(() => {
    setTodos(loadTodos());
  }, [todos]);

  const onCompleteTodo = (index: number) => {
    completeTodo(index);
    setTodos((prev) => {
      let data = [...prev];
      let i = prev.findIndex((todo) => todo.index === index);
      data[i].completed = !data[i].completed;
      return data;
    });
  };
  return (
    <>
      <Todos
        todos={todos}
        setTodos={setTodos}
        isAdd={isAdd}
        setIsAdd={setisAdd}
        onCompleteTodo={onCompleteTodo}
      />
      <ProfileStatus todos={todos} />
    </>
  );
};
