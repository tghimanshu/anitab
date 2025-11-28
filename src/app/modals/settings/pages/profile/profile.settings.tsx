import {
  FormControl,
  FormLabel,
  FormGroup,
  TextField,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { closeSettings } from "../../settings.slice";
import { updateProfile } from "./profile.slice";
import { useNavigate } from "react-router";

/**
 * The Profile Settings component.
 *
 * This component provides a form for users to update their profile information,
 * including their username, a custom greeting, and the background image of the
 * new tab page.
 *
 * @returns {JSX.Element} The rendered Profile settings page.
 */
export const ProfileSettings = () => {
  const [username, setUsername] = useState("");
  const [greeting, setGreeting] = useState("");
  const [background, setBackground] = useState<{ type: string; url: string }>({
    type: "default",
    url: "",
  });
  const widgets = useAppSelector((state) => state.settings.profile);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  /**
   * Initializes the local state with the current values from the Redux store.
   */
  useEffect(() => {
    setUsername(widgets.username);
    setGreeting(widgets.greeting);
    setBackground(widgets.background);
  }, [widgets]);

  /**
   * Handles changes to the username input field.
   *
   * @param {any} e - The change event.
   */
  const handleChange = (e: any) => {
    setUsername(e.target.value);
  };
  return (
    <div>
      <h2>General Settings</h2>
      <FormControl component="fieldset" variant="standard">
        <FormLabel component="legend">Update your Profile Details</FormLabel>
        <FormGroup sx={{ mt: 2 }}>
          <FormLabel>Username</FormLabel>
          <FormControl fullWidth>
            <TextField
              type="text"
              value={username}
              onChange={handleChange}
            ></TextField>
          </FormControl>
        </FormGroup>
        <FormGroup sx={{ mt: 2 }}>
          <FormLabel>Greeting</FormLabel>
          <FormControl fullWidth>
            <TextField
              type="text"
              value={greeting}
              onChange={(e) => setGreeting(e.target.value)}
            ></TextField>
          </FormControl>
        </FormGroup>
        <FormGroup sx={{ mt: 2 }}>
          <FormLabel>Background Type</FormLabel>
          <FormControl fullWidth>
            <Select
              labelId="type"
              value={background.type}
              label="Age"
              onChange={(e) =>
                setBackground((bg) => ({ ...bg, type: e.target.value }))
              }
            >
              <MenuItem value={"default"}>Default</MenuItem>
              <MenuItem value={"custom"}>Custom</MenuItem>
            </Select>
          </FormControl>
        </FormGroup>
        {background.type !== "default" && (
          <FormGroup sx={{ mt: 2 }}>
            <FormLabel>Background Url</FormLabel>
            <FormControl fullWidth>
              <TextField
                type="text"
                value={background.url}
                onChange={(e) =>
                  setBackground((bg) => ({ ...bg, url: e.target.value }))
                }
              ></TextField>
            </FormControl>
          </FormGroup>
        )}
        <div style={{ marginTop: 25 }}>
          <Button
            variant="contained"
            sx={{ mr: 1 }}
            onClick={() => {
              dispatch(
                updateProfile({
                  username: username,
                  background: {
                    type: background.type,
                    url:
                      background.type === "custom"
                        ? background.url
                        : widgets.background.url,
                  },
                  greeting: greeting,
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
      </FormControl>
    </div>
  );
};
