import {
  Modal,
  Box,
  List,
  ListSubheader,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import React from "react";
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import { GeneralSettings } from "./pages/widget/widget.settings";
import { PomodoroSettings } from "./pages/pomodoro/pomodoro.settings";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { closeSettings } from "./settings.slice";
import { ProfileSettings } from "./pages/profile/profile.settings";

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60vw",
  height: "80vh",
  bgcolor: "background.paper",
  // border: "2px solid #000",
  borderRadius: 5,
  boxShadow: 24,
  display: "flex",
  // p: 4,
};

export const SettingsModal = () => {
  const settings = useAppSelector((state) => state.settings.settings);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleClose = () => {
    navigate("");
    dispatch(closeSettings());
  };
  return (
    <Modal
      open={settings.show}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Box
          sx={{
            width: 200,
            background: "black",
            height: "100%",
            color: "white",
            overflowY: "auto",
          }}
          role="presentation"
        >
          <List
            subheader={
              <ListSubheader
                sx={{
                  background: "black",
                  color: "white",
                }}
              >
                Settings
              </ListSubheader>
            }
          >
            <ListItem disablePadding>
              <ListItemButton component={Link} to={"my-profile"}>
                <ListItemText primary={"My Profile"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to={"widgets"}>
                <ListItemText primary={"Widget"} />
              </ListItemButton>
            </ListItem>
            <Divider sx={{ background: "#555" }} />
            <ListItem disablePadding>
              <ListItemButton component={Link} to={"pomodoro"}>
                <ListItemText primary={"Pomodoro"} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
        <Box sx={{ flexGrow: 1, py: 2, px: 4, overflowY: "auto" }}>
          <Routes>
            <Route path="/" element={<Navigate to={"my-profile"} replace />} />
            <Route path="/my-profile" element={<ProfileSettings />}></Route>
            <Route path="/widgets" element={<GeneralSettings />}></Route>
            <Route path="/pomodoro" element={<PomodoroSettings />}></Route>
          </Routes>
        </Box>
      </Box>
    </Modal>
  );
};
