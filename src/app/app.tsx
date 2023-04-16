import React, { useState, useEffect } from "react";
import { Todos } from "./components/todos/todos.component";
import { ProfileStatus } from "./components/profile-status/profile-status.component";
import { Todo, completeTodo, loadTodos } from "./services/todos/todos.service";

export const App = () => {
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

  const getBackgroundImage = () => {
    let group = localStorage.getItem("group");
    if (group) {
      switch (group) {
        case "gaudmire":
          return "url(./assets/gaudmire.webp)";
        case "spectreseek":
          return "url(./assets/spectreseek.webp)";
        case "erevald":
          return "url(./assets/erevald.webp)";
        case "alterok":
          return "url(./assets/alterok.webp)";
        default:
          return "url(./assets/background.jpg)";
      }
    } else {
      return "url(./assets/background.jpg)";
    }
  };

  return (
    <div
      className="main-screen"
      style={{
        background: `${getBackgroundImage()} no-repeat center center/cover`,
      }}
    >
      <Todos
        todos={todos}
        setTodos={setTodos}
        isAdd={isAdd}
        setIsAdd={setisAdd}
        onCompleteTodo={onCompleteTodo}
      />
      <ProfileStatus todos={todos} />
      <div className="nights-weekends">
        {localStorage.getItem("group") &&
          localStorage.getItem("group") !== "none" && (
            <button
              className="nights-weekends__toggler"
              onClick={() => {
                setIsNW(!isNW);
              }}
            >
              Switch to {isNW ? "AniTab" : "N&W"}
            </button>
          )}
        {isNW && (
          <iframe
            src="https://buildspace.so/home"
            className="nights-weekends__content"
          ></iframe>
        )}
      </div>
    </div>
  );
};
