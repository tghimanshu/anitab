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

/**
 * The General Settings (Widget Settings) component.
 *
 * This component allows users to toggle the visibility of various widgets
 * on the main dashboard. It renders a list of switches corresponding to
 * each available widget.
 *
 * @returns {JSX.Element} The rendered Widget settings page.
 */
export const GeneralSettings = () => {
  const widgets = useAppSelector((state) => state.settings.widgets);
  const dispatch = useAppDispatch();

  /**
   * Handles the toggling of a widget's visibility.
   *
   * @param {string} id - The ID of the widget to toggle.
   */
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
