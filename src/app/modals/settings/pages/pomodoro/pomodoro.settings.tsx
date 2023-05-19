import React, { useState, useEffect } from "react";
import { FormGroup, Button } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import moment, { Moment } from "moment";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { setTimers } from "../../../../plugins/pomodoro/pomodoro.slice";
import { closeSettings } from "../../settings.slice";
import { useNavigate } from "react-router";

export const PomodoroSettings = () => {
  const [workTime, setWorkTime] = useState<Moment>(moment());
  const [breakTime, setBreakTime] = useState<Moment>(moment());

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const pomodoro = useAppSelector((state) => state.pomodoro);

  useEffect(() => {
    setWorkTime(
      moment(
        `${Math.floor(pomodoro.workTime / 60)}:${pomodoro.workTime % 60}`,
        "mm:ss"
      )
    );
    setBreakTime(
      moment(
        `${Math.floor(pomodoro.breakTime / 60)}:${pomodoro.breakTime % 60}`,
        "mm:ss"
      )
    );
  }, [pomodoro.breakTime, pomodoro.workTime]);

  return (
    <div>
      <h2>Pomodoro Settings</h2>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <FormGroup>
          <DesktopTimePicker
            label={"Work Time"}
            views={["minutes", "seconds"]}
            format="mm:ss"
            value={workTime}
            onChange={(value: any) => setWorkTime(value)}
            sx={{
              mt: 2,
            }}
          />
        </FormGroup>
        <FormGroup>
          <DesktopTimePicker
            label={"Break Time"}
            views={["minutes", "seconds"]}
            format="mm:ss"
            value={breakTime}
            onChange={(value: any) => setBreakTime(value)}
            sx={{
              mt: 2,
            }}
          />
        </FormGroup>
        <div style={{ marginTop: 25 }}>
          <Button
            variant="contained"
            sx={{ mr: 1 }}
            onClick={() => {
              dispatch(
                setTimers({
                  workTime: workTime!.minutes() * 60 + workTime!.seconds(),
                  breakTime: breakTime!.minutes() * 60 + breakTime!.seconds(),
                })
              );
              dispatch(closeSettings());
            }}
          >
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
        </div>
      </LocalizationProvider>
    </div>
  );
};
