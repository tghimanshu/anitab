import React, { useState, useEffect } from "react";
import { TodosContainer } from "./components/features/todos/todos.component";
import { ProfileStatus } from "./components/features/profile-status/profile-status.component";
import { Todo, completeTodo, loadTodos } from "./services/todos/todos.service";
import { NotesContainer } from "./components/features/notes/notes.component";
// import React from "react";
// import DropDrag from "./layouts/GridLayout";

export const App = () => {
  const [isNW, setIsNW] = useState(false);

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
      <TodosContainer />
      <NotesContainer />
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

// export const App = () => {
//   return (
//     <div>
//       <DropDrag domElements={[]} />
//     </div>
//   );
// };
