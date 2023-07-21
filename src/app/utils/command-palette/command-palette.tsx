import React from "react";
import CommandPalette, { Command } from "react-command-palette";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../hooks";
import { openSettings } from "../../modals/settings/settings.slice";
import { openAddTodo } from "../../plugins/todos/todos.slice";

export const AniTabCommandPalette = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const commands: Command[] = [
    {
      id: 0,
      name: "Open Todos Settings",
      color: "#fff",
      command() {
        navigate("/todos");
        dispatch(openSettings());
      },
    },
    {
      id: 1,
      name: "Add Todos",
      color: "#fff",
      command() {
        dispatch(openAddTodo());
      },
    },
  ];
  return (
    <CommandPalette
      commands={commands}
      display="modal"
      hotKeys={"mod+p"}
      defaultInputValue=""
      closeOnSelect
    />
  );
};
