import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import moment, { Moment } from "moment";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { closeSettings } from "../../settings.slice";
import { useNavigate } from "react-router";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import "../../../../plugins/todos/todos.plugin.scss";

export const TodosSettings = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <h2>Todos Settings</h2>

        <Divider />

        <General />
        <Appearance />

        <Box sx={{ mt: 2 }}>
          <Button variant="contained" sx={{ mr: 1 }}>
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

const General = () => {
  return (
    <>
      <Typography sx={{ mt: 2, mb: 1 }}>General</Typography>

      <Box about="Start Date" sx={{ mb: 2 }}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Switch
                // checked={widget.visible}
                // onChange={() => handleChange(widget.id)}
                />
              }
              label={"Start Date"}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Switch
                // checked={widget.visible}
                // onChange={() => handleChange(widget.id)}
                />
              }
              label={"Start Time"}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormLabel>Default Start Date</FormLabel>
            <FormControl>
              <DatePicker disabled defaultValue={moment()}></DatePicker>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormLabel>Default Start Time</FormLabel>
            <FormControl>
              <TimePicker
                disabled
                defaultValue={moment({ minutes: 0, hours: 0 })}
              ></TimePicker>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
      <Box about="End Date" sx={{ mb: 2 }}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Switch
                // checked={widget.visible}
                // onChange={() => handleChange(widget.id)}
                />
              }
              label={"End Date"}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Switch
                // checked={widget.visible}
                // onChange={() => handleChange(widget.id)}
                />
              }
              label={"End Time"}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormLabel>Default End Date</FormLabel>
            <FormControl>
              <DatePicker disabled defaultValue={moment()}></DatePicker>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormLabel>Default End Time</FormLabel>
            <FormControl>
              <TimePicker
                disabled
                defaultValue={moment({ minutes: 0, hours: 0 })}
              ></TimePicker>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
      <FormGroup>
        <FormLabel>Default Calendar</FormLabel>
        <FormControl fullWidth>
          <Select
            label="defaultCalendar"
            value={"google"}
            // onChange={(e) => setTheme(e.target.value)}
          >
            <MenuItem value={"google"}>Google</MenuItem>
            <MenuItem value={"outlook"}>Outlook</MenuItem>
          </Select>
        </FormControl>
      </FormGroup>
    </>
  );
};

const Appearance = () => {
  return (
    <>
      <Typography sx={{ mt: 2, mb: 1 }}>Appearance</Typography>

      <Paper sx={{ p: 2 }} variant="elevation">
        <div className="todos__container">
          <List>
            <ListItem className={`todo`} disablePadding divider>
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
                    Sample Text
                  </Typography>
                </ListItemText>
                <div className="todo__actions">
                  <Tooltip title="Add to Calendar" placement="top" arrow={true}>
                    <IconButton
                      href={`https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20230521T104500Z%2F20230521T111500Z&text=`}
                      onClick={(e) => e.stopPropagation()}
                      target="_blank"
                    >
                      <CalendarIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit" placement="top" arrow={true}>
                    <IconButton>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete" placement="top" arrow={true}>
                    <IconButton>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </div>
              </ListItemButton>
            </ListItem>
          </List>
        </div>
      </Paper>

      <Typography sx={{ mt: 2, mb: 1 }}>Display</Typography>

      <Grid container spacing={1}>
        <Grid item xs={6}>
          <FormGroup>
            <FormControlLabel control={<Switch />} label={"Due Date"} />
          </FormGroup>
          <FormGroup>
            <FormControlLabel control={<Switch />} label={"Priority"} />
          </FormGroup>
        </Grid>
        <Grid item xs={6}>
          <FormGroup>
            <FormControlLabel control={<Switch />} label={"Edit"} />
          </FormGroup>
          <FormGroup>
            <FormControlLabel control={<Switch />} label={"Delete"} />
          </FormGroup>
          <FormGroup>
            <FormControlLabel control={<Switch />} label={"Add to Calendar"} />
          </FormGroup>
        </Grid>
      </Grid>
    </>
  );
};
