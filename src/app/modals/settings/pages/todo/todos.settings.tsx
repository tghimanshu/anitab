import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CalendarIcon from "@mui/icons-material/CalendarMonth";
import {
  FormGroup,
  Button,
  FormControlLabel,
  Switch,
  Grid,
  FormControl,
  Select,
  MenuItem,
  FormLabel,
  Box,
  Divider,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Tooltip,
  IconButton,
  Chip,
  TextField,
} from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { closeSettings } from "../../settings.slice";
import { useNavigate } from "react-router";
import "../../../../plugins/todos/todos.plugin.scss";
import { updateTodoSetting } from "./todos-settings.slice";

export const TodosSettings = () => {
  const [general, setGeneral] = useState({
    calendar: "google",
    includeEndDate: true,
    includeStartDate: true,
    includeEndTime: true,
    includeStartTime: true,
    includePriority: true,
    useCustomPriorities: false,
  });
  const [appearance, setAppearance] = useState({
    title: "Preview Text",
    completed: false,
    quickIcons: {
      calendar: true,
      edit: true,
      delete: true,
    },
    infoTexts: {
      priority: true,
      startDateTime: true,
      endDatetTime: true,
    },
  });

  const todoSetting = useAppSelector((state) => state.settings.todos);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setAppearance((settings) => ({
      ...settings,
      infoTexts: todoSetting.infoTexts,
      quickIcons: todoSetting.quickIcons,
    }));
    setGeneral((general) => ({
      ...general,
      calendar: todoSetting.calendar,
      includeStartDate: todoSetting.includeStartDate,
      includeStartTime: todoSetting.includeStartTime,
      includeEndDate: todoSetting.includeEndDate,
      includeEndTime: todoSetting.includeEndTime,
      includePriority: todoSetting.includePriority,
    }));
  }, [todoSetting]);

  const handleApply = () => {
    dispatch(
      updateTodoSetting({
        calendar: "google",
        includeEndDate: general.includeEndDate,
        includeStartDate: general.includeStartDate,
        includeEndTime: general.includeEndTime,
        includeStartTime: general.includeStartTime,
        includePriority: general.includePriority,
        priorityOptions: [],
        infoTexts: appearance.infoTexts,
        quickIcons: appearance.quickIcons,
      })
    );
    navigate("/");
    dispatch(closeSettings());
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <h2>Todos Settings</h2>

        <Divider />

        <General
          appearance={appearance}
          general={general}
          setGeneral={setGeneral}
          setAppearance={setAppearance}
        />
        <Appearance
          general={general}
          appearance={appearance}
          setAppearance={setAppearance}
        />

        <Box sx={{ mt: 2 }}>
          <Button variant="contained" sx={{ mr: 1 }} onClick={handleApply}>
            Apply
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              navigate("");
              dispatch(closeSettings());
            }}
          >
            Cancel
          </Button>
        </Box>
      </LocalizationProvider>
    </div>
  );
};

const General = ({
  general,
  appearance,
  setAppearance,
  setGeneral,
}: PropsGeneral) => {
  return (
    <>
      <Typography sx={{ mt: 2, mb: 1 }}>General</Typography>

      <Box about="Start Date" sx={{ mb: 2 }}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={general.includeStartDate}
                  onChange={() => {
                    setAppearance((appearance) => {
                      return {
                        ...appearance,
                        infoTexts: {
                          ...appearance.infoTexts,
                          startDateTime: !general.includeStartDate,
                        },
                      };
                    });
                    setGeneral((general) => ({
                      ...general,
                      includeStartDate: !general.includeStartDate,
                      includeStartTime: false,
                    }));
                  }}
                />
              }
              label={"Start Date"}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={general.includeStartTime}
                  disabled={!general.includeStartDate}
                  onChange={() =>
                    setGeneral((general) => ({
                      ...general,
                      includeStartTime: !general.includeStartTime,
                    }))
                  }
                />
              }
              label={"Start Time"}
            />
          </Grid>
        </Grid>
      </Box>
      <Box about="End Date" sx={{ mb: 2 }}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={general.includeEndDate}
                  onChange={() => {
                    setAppearance((appearance) => {
                      return {
                        ...appearance,
                        infoTexts: {
                          ...appearance.infoTexts,
                          endDatetTime: !general.includeEndDate,
                        },
                      };
                    });
                    setGeneral((general) => ({
                      ...general,
                      includeEndDate: !general.includeEndDate,
                      includeEndTime: false,
                    }));
                  }}
                />
              }
              label={"End Date"}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={general.includeEndTime}
                  disabled={!general.includeEndDate}
                  onChange={() =>
                    setGeneral((general) => ({
                      ...general,
                      includeEndTime: !general.includeEndTime,
                    }))
                  }
                />
              }
              label={"End Time"}
            />
          </Grid>
        </Grid>
      </Box>
      <Box about="Priority" sx={{ mb: 2 }}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={general.includePriority}
                  onChange={() => {
                    setAppearance((appearance) => {
                      return {
                        ...appearance,
                        infoTexts: {
                          ...appearance.infoTexts,
                          priority: !general.includePriority,
                        },
                      };
                    });
                    setGeneral((general) => ({
                      ...general,
                      includePriority: !general.includePriority,
                      useCustomPriorities: false,
                    }));
                  }}
                />
              }
              label={"Include Priority"}
            />
          </Grid>

          {/* <Grid item xs={6}>
            <FormControlLabel
              control={
                <Switch
                  disabled={!general.includePriority}
                  checked={general.useCustomPriorities}
                  onChange={() =>
                    setGeneral((general) => ({
                      ...general,
                      useCustomPriorities: !general.useCustomPriorities,
                    }))
                  }
                />
              }
              label={"Use Custom Priorities"}
            />
          </Grid> */}
        </Grid>
      </Box>

      <FormGroup>
        <FormLabel>Default Calendar</FormLabel>
        <FormControl fullWidth>
          <Select
            label="defaultCalendar"
            value={general.calendar}
            onChange={(e) =>
              setGeneral((general) => ({
                ...general,
                calendar: e.target.value,
              }))
            }
          >
            <MenuItem value={"google"}>Google</MenuItem>
            <MenuItem value={"outlook"}>Outlook</MenuItem>
          </Select>
        </FormControl>
      </FormGroup>
    </>
  );
};

const Appearance = ({ appearance, setAppearance, general }: Props) => {
  return (
    <>
      <Typography sx={{ mt: 2, mb: 1 }}>Appearance</Typography>

      <Paper sx={{ p: 2 }} variant="elevation">
        <div className="todos__container">
          <List>
            <ListItem
              className={`todo ` + (appearance.completed && "completed")}
              disablePadding
              divider
              onClick={() =>
                setAppearance((appearance: any) => ({
                  ...appearance,
                  completed: !appearance.completed,
                }))
              }
            >
              <ListItemButton role={undefined} dense>
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
                    {appearance.title}
                  </Typography>
                </ListItemText>
                <div className="todo__info">
                  {appearance.infoTexts.priority && (
                    <Chip label="Genin" color="primary" size="small" />
                  )}
                  {appearance.infoTexts.startDateTime && (
                    <Chip
                      // label={moment().format("MMM DD")}
                      label={"Start @ " + moment().format("HH:mm")}
                      color="primary"
                      size="small"
                    />
                  )}
                  {appearance.infoTexts.endDatetTime && (
                    <Chip
                      // label={moment().format("MMM DD")}
                      label={"Due @ " + moment().format("HH:mm")}
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
                        href={`https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20230521T104500Z%2F20230521T111500Z&text=`}
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
                      <IconButton>
                        <EditIcon fontSize="small" sx={{ fontSize: "1rem" }} />
                      </IconButton>
                    </Tooltip>
                  )}
                  {appearance.quickIcons.delete && (
                    <Tooltip title="Delete" placement="top" arrow={true}>
                      <IconButton>
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
          </List>
        </div>
      </Paper>

      <Typography sx={{ mt: 2, mb: 1 }}>Display</Typography>

      <FormGroup sx={{ mt: 2 }}>
        <FormLabel>Preview Text</FormLabel>
        <FormControl fullWidth>
          <TextField
            type="text"
            value={appearance.title}
            onChange={(e) =>
              setAppearance((appearance) => ({
                ...appearance,
                title: e.target.value,
              }))
            }
          ></TextField>
        </FormControl>
      </FormGroup>

      <Grid container spacing={1}>
        <Grid item xs={6}>
          <FormGroup>
            <FormControlLabel
              control={<Switch />}
              label={"Priority"}
              checked={appearance.infoTexts.priority}
              disabled={!general.includePriority}
              onClick={() => {
                setAppearance((appearance) => {
                  return {
                    ...appearance,
                    infoTexts: {
                      ...appearance.infoTexts,
                      priority: !appearance.infoTexts.priority,
                    },
                  };
                });
              }}
            />
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              control={<Switch />}
              label={"Start Date"}
              checked={appearance.infoTexts.startDateTime}
              disabled={!general.includeStartDate}
              onClick={() => {
                setAppearance((appearance) => {
                  return {
                    ...appearance,
                    infoTexts: {
                      ...appearance.infoTexts,
                      startDateTime: !appearance.infoTexts.startDateTime,
                    },
                  };
                });
              }}
            />
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              control={<Switch />}
              label={"Due Date"}
              checked={appearance.infoTexts.endDatetTime}
              disabled={!general.includeEndDate}
              onClick={() => {
                setAppearance((appearance) => {
                  return {
                    ...appearance,
                    infoTexts: {
                      ...appearance.infoTexts,
                      endDatetTime: !appearance.infoTexts.endDatetTime,
                    },
                  };
                });
              }}
            />
          </FormGroup>
        </Grid>
        <Grid item xs={6}>
          <FormGroup>
            <FormControlLabel
              control={<Switch />}
              label={"Add to Calendar"}
              checked={appearance.quickIcons.calendar}
              onClick={() => {
                setAppearance((appearance) => {
                  return {
                    ...appearance,
                    quickIcons: {
                      ...appearance.quickIcons,
                      calendar: !appearance.quickIcons.calendar,
                    },
                  };
                });
              }}
            />
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              control={<Switch />}
              label={"Edit"}
              checked={appearance.quickIcons.edit}
              onClick={() => {
                setAppearance((appearance) => {
                  return {
                    ...appearance,
                    quickIcons: {
                      ...appearance.quickIcons,
                      edit: !appearance.quickIcons.edit,
                    },
                  };
                });
              }}
            />
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              control={<Switch />}
              label={"Delete"}
              checked={appearance.quickIcons.delete}
              onClick={() => {
                setAppearance((appearance) => {
                  return {
                    ...appearance,
                    quickIcons: {
                      ...appearance.quickIcons,
                      delete: !appearance.quickIcons.delete,
                    },
                  };
                });
              }}
            />
          </FormGroup>
        </Grid>
      </Grid>
    </>
  );
};

type Props = {
  general: GeneralProps;
  appearance: AppearanceProps;
  setAppearance: React.Dispatch<React.SetStateAction<AppearanceProps>>;
};

type PropsGeneral = {
  general: GeneralProps;
  appearance: AppearanceProps;
  setAppearance: React.Dispatch<React.SetStateAction<AppearanceProps>>;
  setGeneral: React.Dispatch<React.SetStateAction<GeneralProps>>;
};

type AppearanceProps = {
  title: string;
  completed: boolean;
  quickIcons: {
    calendar: boolean;
    edit: boolean;
    delete: boolean;
  };
  infoTexts: {
    priority: boolean;
    startDateTime: boolean;
    endDatetTime: boolean;
  };
};

type GeneralProps = {
  calendar: string;
  includeEndDate: boolean;
  includeStartDate: boolean;
  includeEndTime: boolean;
  includeStartTime: boolean;
  includePriority: boolean;
  useCustomPriorities: boolean;
};
