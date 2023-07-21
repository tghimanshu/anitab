import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CalendarIcon from "@mui/icons-material/CalendarMonth";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  Todo,
  deleteTodo,
  openAddTodo,
  openEditTodo,
  toggleComplete,
} from "./todos.slice";
import { WidgetLayout } from "../../layouts/widget.layout";
import {
  Chip,
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
import moment from "moment";

export const Todos = () => {
  const { todos } = useAppSelector((state) => state.todos);
  const appearance = useAppSelector((state) => state.settings.todos);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleAddToCalendar = (todo: Todo) => {
    switch (appearance.calendar) {
      case "outlook":
        return `https://outlook.live.com/calendar/0/deeplink/compose?allday=false&enddt=2023-05-21T11%3A15%3A00%2B00%3A00&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=2023-05-21T10%3A45%3A00%2B00%3A00&subject=${encodeURIComponent(
          todo.title
        )}`;
      case "google":
      default:
        return `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20230521T104500Z%2F20230521T111500Z&text=${encodeURIComponent(
          todo.title
        )}`;
    }
  };

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
                      // role={undefined}
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
                      <div className="todo__info">
                        {appearance.infoTexts.priority && (
                          <Chip
                            label={todo.priority.name}
                            color="primary"
                            size="small"
                          />
                        )}
                        {appearance.infoTexts.startDateTime && (
                          <Chip
                            // label={moment().format("MMM DD")}
                            label={
                              `Start @ ` +
                              moment(
                                `${
                                  todo.startTime
                                    ? todo.startTime
                                    : todo.createdDate
                                }`
                              ).format("HH:mm")
                            }
                            color="primary"
                            size="small"
                          />
                        )}
                        {appearance.infoTexts.endDatetTime && (
                          <Chip
                            // label={moment().format("MMM DD")}
                            label={
                              `Due @ ` +
                              moment(
                                `${
                                  todo.endTime ? todo.endTime : todo.createdDate
                                }`
                              ).format("HH:mm")
                            }
                            color="primary"
                            size="small"
                          />
                        )}
                      </div>
                      <div className="todo__actions">
                        {appearance.quickIcons.calendar && (
                          <Tooltip
                            title="Add to Calendar"
                            placement="top"
                            arrow={true}
                          >
                            <IconButton
                              sx={todo.completed ? { color: "white" } : {}}
                              href={handleAddToCalendar(todo)}
                              onClick={(e) => e.stopPropagation()}
                              target="_blank"
                            >
                              <CalendarIcon
                                fontSize="small"
                                sx={{ fontSize: "1rem" }}
                              />
                            </IconButton>
                          </Tooltip>
                        )}
                        {appearance.quickIcons.edit && (
                          <Tooltip title="Edit" placement="top" arrow={true}>
                            <IconButton
                              sx={todo.completed ? { color: "white" } : {}}
                              onClick={(e) => {
                                e.stopPropagation();

                                dispatch(openEditTodo(todo.index));
                              }}
                            >
                              <EditIcon
                                fontSize="small"
                                sx={{ fontSize: "1rem" }}
                              />
                            </IconButton>
                          </Tooltip>
                        )}
                        {appearance.quickIcons.delete && (
                          <Tooltip title="Delete" placement="top" arrow={true}>
                            <IconButton
                              sx={todo.completed ? { color: "white" } : {}}
                              onClick={(e) => {
                                e.stopPropagation();

                                dispatch(deleteTodo(todo));
                              }}
                            >
                              <DeleteIcon
                                fontSize="small"
                                sx={{ fontSize: "1rem" }}
                              />
                            </IconButton>
                          </Tooltip>
                        )}
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
                        {appearance.quickIcons.calendar && (
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
                              <CalendarIcon
                                fontSize="small"
                                sx={{ fontSize: "1rem" }}
                              />
                            </IconButton>
                          </Tooltip>
                        )}
                        {appearance.quickIcons.edit && (
                          <Tooltip title="Edit" placement="top" arrow={true}>
                            <IconButton
                              sx={todo.completed ? { color: "white" } : {}}
                              onClick={(e) => {
                                e.stopPropagation();

                                dispatch(openEditTodo(todo.index));
                              }}
                            >
                              <EditIcon
                                fontSize="small"
                                sx={{ fontSize: "1rem" }}
                              />
                            </IconButton>
                          </Tooltip>
                        )}
                        {appearance.quickIcons.delete && (
                          <Tooltip title="Delete" placement="top" arrow={true}>
                            <IconButton
                              sx={todo.completed ? { color: "white" } : {}}
                              onClick={(e) => {
                                e.stopPropagation();

                                dispatch(deleteTodo(todo));
                              }}
                            >
                              <DeleteIcon
                                fontSize="small"
                                sx={{ fontSize: "1rem" }}
                              />
                            </IconButton>
                          </Tooltip>
                        )}
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
