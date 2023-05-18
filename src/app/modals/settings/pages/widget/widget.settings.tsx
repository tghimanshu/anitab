import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { toggleWidget } from "./widget.slice";

export const GeneralSettings = () => {
  const widgets = useAppSelector((state) => state.settings.widgets);
  const dispatch = useAppDispatch();

  const handleChange = (id: string) => {
    dispatch(toggleWidget(id));
  };
  return (
    <div>
      <h2>General Settings</h2>
      <FormControl component="fieldset" variant="standard">
        <FormLabel component="legend">
          Select Necessary Widgets you like to use{" "}
        </FormLabel>
        <FormGroup>
          {widgets &&
            widgets.map((widget) => (
              <FormControlLabel
                control={
                  <Switch
                    checked={widget.visible}
                    onChange={() => handleChange(widget.id)}
                  />
                }
                label={widget.title}
                key={widget.id}
              />
            ))}
        </FormGroup>
      </FormControl>
    </div>
  );
};
