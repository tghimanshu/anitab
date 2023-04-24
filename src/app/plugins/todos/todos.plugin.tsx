import React, { useEffect, useState } from "react";
import { AiFillCheckCircle, AiOutlinePlus } from "react-icons/ai";
import "./todos.plugin.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { openAddTodo, toggleComplete } from "./todos.slice";

export const Todos = () => {
  const { todos } = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();

  return (
    <section className="todos">
      <div className="todos__header">
        <h1 className="todos__title drag-handle">Missions</h1>
        <AiOutlinePlus
          className="todos__add"
          onClick={() => dispatch(openAddTodo())}
        />
      </div>
      <div className="todos__container">
        <h3 className="todo__section">Today</h3>
        {todos.length === 0 && (
          <p className="todos__empty">There are no missions yet!</p>
        )}
        {todos.length !== 0 &&
          todos.map((todo) => {
            return (
              new Date(todo.createdDate).toDateString() ===
                new Date(Date.now()).toDateString() && (
                <div
                  className={"todo " + (todo.completed ? "completed" : "")}
                  onClick={() => dispatch(toggleComplete(todo.index))}
                  key={todo.index}
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
            new Date(todo.createdDate).toDateString() !==
              new Date(Date.now()).toDateString() && !todo.completed
        ).length === 0 && (
          <p className="todos__empty">There are no older missions yet!</p>
        )}
        {todos.length !== 0 &&
          todos.map((todo) => {
            return (
              new Date(todo.createdDate).toDateString() !==
                new Date(Date.now()).toDateString() &&
              !todo.completed && (
                <div
                  className={"todo" + (todo.completed ? " completed" : "")}
                  onClick={() => dispatch(toggleComplete(todo.index))}
                  key={todo.index}
                >
                  <AiFillCheckCircle className="todo__btn" />
                  <div className="todo__title">{todo.title}</div>
                </div>
              )
            );
          })}
      </div>
    </section>
  );
};

export const TodosContainer = () => {
  return <Todos />;
};
