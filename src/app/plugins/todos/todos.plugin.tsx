import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CalendarIcon from "@mui/icons-material/CalendarMonth";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  deleteTodo,
  openAddTodo,
  openEditTodo,
  toggleComplete,
} from "./todos.slice";
import { WidgetLayout } from "../../layouts/widget.layout";
import {
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Tooltip,
  Typography,
} from "@mui/material";
import "./todos.plugin.scss";
import { Settings } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { openSettings } from "../../modals/settings/settings.slice";

export const Todos = () => {
  const { todos } = useAppSelector((state) => state.todos);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <WidgetLayout
      title="Missions"
      actions={() => (
        <Grid>
          <span
            onClick={() => {
              navigate("todos");
              dispatch(openSettings());
            }}
          >
            <Settings
              sx={{
                fontSize: "0.9rem",
                mr: 1.5,
              }}
            />
          </span>
          <AiOutlinePlus
            className="todos__add"
            onClick={() => dispatch(openAddTodo())}
          />
        </Grid>
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
                    disablePadding
                    divider
                  >
                    <ListItemButton
                      role={undefined}
                      onClick={() => dispatch(toggleComplete(todo.index))}
                      dense
                    >
                      <ListItemText
                        sx={{
                          width: 0,
                          overflow: "hidden",
                          flexGrow: "1",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                      >
                        <Typography
                          sx={{
                            overflow: "hidden",
                            flexGrow: "1",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {todo.title}
                        </Typography>
                      </ListItemText>
                      <div className="todo__actions">
                        <Tooltip
                          title="Add to Calendar"
                          placement="top"
                          arrow={true}
                        >
                          <IconButton
                            sx={todo.completed ? { color: "white" } : {}}
                            href={`https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20230521T104500Z%2F20230521T111500Z&text=${encodeURIComponent(
                              todo.title
                            )}`}
                            onClick={(e) => e.stopPropagation()}
                            target="_blank"
                          >
                            <CalendarIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit" placement="top" arrow={true}>
                          <IconButton
                            sx={todo.completed ? { color: "white" } : {}}
                            onClick={(e) => {
                              e.stopPropagation();

                              dispatch(openEditTodo(todo.index));
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete" placement="top" arrow={true}>
                          <IconButton
                            sx={todo.completed ? { color: "white" } : {}}
                            onClick={(e) => {
                              e.stopPropagation();

                              dispatch(deleteTodo(todo));
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </ListItemButton>
                  </ListItem>
                );
              })}
          </List>
        ) : (
          todos.filter(
            (todo) =>
              !todo.completed &&
              new Date(todo.createdDate).toDateString() !==
                new Date(Date.now()).toDateString()
          ).length === 0 && (
            <p className="todos__empty">There are no missions yet</p>
          )
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
                      <ListItemText
                        sx={{
                          width: 0,
                          overflow: "hidden",
                          flexGrow: "1",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                      >
                        <Typography
                          sx={{
                            overflow: "hidden",
                            flexGrow: "1",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {todo.title}
                        </Typography>
                      </ListItemText>
                      <div className="todo__actions">
                        <Tooltip
                          title="Add to Calendar"
                          placement="top"
                          arrow={true}
                        >
                          <IconButton
                            sx={todo.completed ? { color: "white" } : {}}
                            href={`https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20230521T104500Z%2F20230521T111500Z&text=${encodeURIComponent(
                              todo.title
                            )}`}
                            onClick={(e) => e.stopPropagation()}
                            target="_blank"
                          >
                            <CalendarIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit" placement="top" arrow={true}>
                          <IconButton
                            sx={todo.completed ? { color: "white" } : {}}
                            onClick={(e) => {
                              e.stopPropagation();

                              dispatch(openEditTodo(todo.index));
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete" placement="top" arrow={true}>
                          <IconButton
                            sx={todo.completed ? { color: "white" } : {}}
                            onClick={(e) => {
                              e.stopPropagation();

                              dispatch(deleteTodo(todo));
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </ListItemButton>
                  </ListItem>
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
