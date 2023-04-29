import React, { useEffect, useState } from "react";
import {
  AiFillCalendar,
  AiFillCheckCircle,
  AiOutlinePlus,
} from "react-icons/ai";
import "./todos.plugin.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { openAddTodo, toggleComplete } from "./todos.slice";
import { WidgetLayout } from "../../layouts/widget.layout";
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Checkbox,
  ListSubheader,
} from "@mui/material";
import { completeTodo } from "../../services/todos/todos.service";

export const Todos = () => {
  const { todos } = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();

  return (
    <WidgetLayout
      title="Missions"
      actions={() => (
        <AiOutlinePlus
          className="todos__add"
          onClick={() => dispatch(openAddTodo())}
        />
      )}
    >
      <div className="todos__container">
        {todos.filter(
          (todo) =>
            new Date(todo.createdDate).toDateString() ===
            new Date(Date.now()).toDateString()
        ).length !== 0 ? (
          <List
            sx={{
              width: "100%",
              bgcolor: "background.paper",
              marginBottom: "10px",
            }}
            component="nav"
            subheader={
              <ListSubheader
                component="div"
                sx={{
                  lineHeight: "40px",
                  fontWeight: "bold",
                  fontStyle: "italic",
                  borderBottom: "0.2px solid #ccc",
                }}
              >
                Today
              </ListSubheader>
            }
          >
            {[
              ...todos.filter(
                (todo) =>
                  new Date(todo.createdDate).toDateString() ===
                  new Date(Date.now()).toDateString()
              ),
            ]
              .sort((a, b): number => {
                return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
              })
              .map((todo, i) => {
                return (
                  <ListItem
                    className={`todo` + (todo.completed ? " completed" : "")}
                    key={i}
                    // secondaryAction={
                    //   <IconButton edge="end" aria-label="comments" size="small">
                    //     <AiFillCalendar />
                    //   </IconButton>
                    // }
                    disablePadding
                    divider
                  >
                    <ListItemButton
                      role={undefined}
                      onClick={() => dispatch(toggleComplete(todo.index))}
                      dense
                    >
                      {/* <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={todo.completed}
                        tabIndex={-1}
                        disableRipple
                        size="small"
                        color="warning"
                      />
                    </ListItemIcon> */}
                      <ListItemText>{todo.title}</ListItemText>
                    </ListItemButton>
                  </ListItem>
                );
              })}
          </List>
        ) : (
          <p className="todos__empty">There are no missions yet</p>
        )}
        {todos.filter(
          (todo) =>
            !todo.completed &&
            new Date(todo.createdDate).toDateString() !==
              new Date(Date.now()).toDateString()
        ).length !== 0 && (
          <List
            sx={{ width: "100%", bgcolor: "background.paper" }}
            component="nav"
            subheader={
              <ListSubheader
                component="div"
                sx={{
                  lineHeight: "40px",
                  fontWeight: "bold",
                  fontStyle: "italic",
                }}
              >
                Older
              </ListSubheader>
            }
          >
            {todos
              .filter(
                (todo) =>
                  !todo.completed &&
                  new Date(todo.createdDate).toDateString() !==
                    new Date(Date.now()).toDateString()
              )
              .map((todo, i) => {
                return (
                  new Date(todo.createdDate).toDateString() ===
                    new Date(Date.now()).toDateString() && (
                    <ListItem
                      className={`todo` + (todo.completed ? " completed" : "")}
                      key={i}
                      // secondaryAction={
                      //   <IconButton edge="end" aria-label="comments" size="small">
                      //     <AiFillCalendar />
                      //   </IconButton>
                      // }
                      disablePadding
                      divider
                    >
                      <ListItemButton
                        role={undefined}
                        onClick={() => dispatch(toggleComplete(todo.index))}
                        dense
                      >
                        {/* <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={todo.completed}
                        tabIndex={-1}
                        disableRipple
                        size="small"
                        color="warning"
                      />
                    </ListItemIcon> */}
                        <ListItemText>{todo.title}</ListItemText>
                      </ListItemButton>
                    </ListItem>
                  )
                );
              })}
          </List>
        )}
      </div>
    </WidgetLayout>
  );
};

export const TodosContainer = () => {
  return <Todos />;
};
