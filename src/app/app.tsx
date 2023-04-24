import * as Dialog from "@radix-ui/react-dialog";
// import React, { useState, useEffect } from "react";
// import { TodosContainer } from "./components/features/todos/todos.component";
// import { NotesContainer } from "./components/features/notes/notes.component";
import React from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import { TodosContainer } from "./plugins/todos/todos.plugin";
import { AddTodo } from "./plugins/todos/add-todo.plugin";
import { useAppSelector } from "./hooks";
import { NotesContainer } from "./plugins/notes/notes.plugin";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { AddNote } from "./plugins/notes/add-note.plugin";

const ReactGridLayout = WidthProvider(RGL);

// export const App = () => {
//   const [isNW, setIsNW] = useState(false);

//   const getBackgroundImage = () => {
//     let group = localStorage.getItem("group");
//     if (group) {
//       switch (group) {
//         case "gaudmire":
//           return "url(./assets/gaudmire.webp)";
//         case "spectreseek":
//           return "url(./assets/spectreseek.webp)";
//         case "erevald":
//           return "url(./assets/erevald.webp)";
//         case "alterok":
//           return "url(./assets/alterok.webp)";
//         default:
//           return "url(./assets/background.jpg)";
//       }
//     } else {
//       return "url(./assets/background.jpg)";
//     }
//   };

//   return (
//     <div
//       className="main-screen"
//       style={{
//         background: `${getBackgroundImage()} no-repeat center center/cover`,
//       }}
//     >
//       <TodosContainer />
//       <NotesContainer />
//       <div className="nights-weekends">
//         {localStorage.getItem("group") &&
//           localStorage.getItem("group") !== "none" && (
//             <button
//               className="nights-weekends__toggler"
//               onClick={() => {
//                 setIsNW(!isNW);
//               }}
//             >
//               Switch to {isNW ? "AniTab" : "N&W"}
//             </button>
//           )}
//         {isNW && (
//           <iframe
//             src="https://buildspace.so/home"
//             className="nights-weekends__content"
//           ></iframe>
//         )}
//       </div>
//     </div>
//   );
// };

// export const App = () => {
//   return (
//     <div>
//       <DropDrag domElements={[]} />
//     </div>
//   );
// };

export const App = () => {
  const isAddTodo = useAppSelector((state) => state.todos.isAdd);
  const isAddNote = useAppSelector((state) => state.notes.isAdd);
  const layout = [
    { i: "todos", x: 0, y: 0, w: 3, h: 3, minW: 3, minH: 3 },
    { i: "notes", x: 3, y: 0, w: 3, h: 3, minW: 3, minH: 3 },
  ];
  return (
    <>
      <ReactGridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={60}
        // width={1280}
        isDroppable
        draggableHandle=".drag-handle"
      >
        <div key="todos">
          <TodosContainer />
        </div>
        <div key="notes">
          <NotesContainer />
        </div>
      </ReactGridLayout>
      {isAddTodo && <AddTodo />}
      {isAddNote && <AddNote />}
    </>
  );
};
