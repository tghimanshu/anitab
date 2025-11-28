import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import "./header.scss";
import { Settings } from "@mui/icons-material";
import { SettingsModal } from "../modals/settings/settings.modal";
import { useAppDispatch, useAppSelector } from "../hooks";
import { openSettings } from "../modals/settings/settings.slice";
import { useNavigate } from "react-router";

/**
 * The Header component of the application.
 *
 * It displays a greeting with the username, the current time and date,
 * and a user avatar with a dropdown menu. The menu allows access to account
 * settings and general application settings.
 *
 * It uses `moment.js` to handle real-time clock updates.
 *
 * @returns {JSX.Element} The rendered Header component.
 */
export const Header = () => {
  const [time, setTime] = useState("00:00:00");
  const [date, setDate] = useState("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const profile = useAppSelector((state) => state.settings.profile);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  /**
   * Handles the click event on the avatar to open the user menu.
   *
   * @param {React.MouseEvent<HTMLElement>} event - The click event.
   */
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * Closes the user menu.
   */
  const handleClose = () => {
    setAnchorEl(null);
  };

  /**
   * Sets up the clock interval to update the time every second
   * and sets the initial date.
   */
  useEffect(() => {
    setDate(moment().format("MM/DD/YYYY"));
    setInterval(() => {
      setTime(moment().format("hh:mm:ss"));
    }, 1000);
  }, []);

  return (
    <div className="header">
      <h1 className="header__title">
        {profile.greeting + " " + profile.username}
      </h1>
      <div className="header__content">
        <div className="header__time">
          <h2 className="header__time-clock">{time}</h2>
          <span className="header__time-date">{date}</span>
        </div>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            // sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar>{profile.username.substring(0, 1)}</Avatar>
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem
            onClick={() => {
              navigate("my-profile");
              dispatch(openSettings());
            }}
          >
            <Avatar>{profile.username.substring(0, 1)}</Avatar>
            My account
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              navigate("widgets");
              dispatch(openSettings());
            }}
          >
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          {/* <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem> */}
        </Menu>
      </div>
      <SettingsModal />
    </div>
  );
};
