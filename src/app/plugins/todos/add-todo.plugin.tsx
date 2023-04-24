import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Todo, addTodo, closeAddTodo } from "./todos.slice";
import { AiOutlineCloseCircle } from "react-icons/ai";

export const AddTodo = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos.todos);

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Gennin");

  const onAddTodo = () => {
    const todo: Todo = {
      index: todos.length === 0 ? 1 : todos[todos.length - 1].index + 1,
      title,
      priority,
      completed: false,
      createdDate: new Date(),
    };
    dispatch(addTodo(todo));
    dispatch(closeAddTodo());
  };

  return (
    <div className="add-todos">
      <div className="add-todos__container">
        <div className="add-todos__header">
          <h1 className="add-todos__title">Add Mission</h1>
          <AiOutlineCloseCircle
            className="add-todos__close"
            onClick={() => dispatch(closeAddTodo())}
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
              onClick={() => dispatch(closeAddTodo())}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
