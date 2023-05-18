import React, { useRef, useState, useEffect } from "react";
import _ from "lodash";
import { WidgetLayout } from "../../layouts/widget.layout";
import { Pause, PlayArrow, Settings } from "@mui/icons-material";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Button, ButtonGroup, IconButton } from "@mui/material";
import moment from "moment";
import { changeActiveTimer } from "./pomodoro.slice";
import { openSettings } from "../../modals/settings/settings.slice";
import { useNavigate } from "react-router";

export const Pomodoro = () => {
  const [size, setSize] = useState(150);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [key, setKey] = useState(0);
  const elem = useRef<HTMLDivElement>(null);
  const audio = new Audio("./assets/pomodoro-notification.mp3");

  const dispatch = useAppDispatch();
  const pomodoroWidget = useAppSelector((state) => state.settings.widgets).find(
    (widget) => widget.id === "pomodoro"
  );
  const pomodoro = useAppSelector((state) => state.pomodoro);
  const navigate = useNavigate();

  useEffect(() => {
    setSize(
      elem.current!.offsetHeight > elem.current!.offsetWidth
        ? elem.current!.offsetWidth - 75
        : elem.current!.offsetHeight - 75
    );
  }, [pomodoroWidget]);

  const handleTimerClick = () => {
    !isComplete && setIsPlaying((v) => !v);
    isComplete && setKey((k) => k + 1);
    setIsComplete(false);
  };
  const handleComplete = () => {
    setIsPlaying(false);
    audio.play();
    setIsComplete(true);
  };

  return (
    <WidgetLayout
      title="Pomodoro"
      actions={() => (
        <div
          onClick={() => {
            navigate("pomodoro");
            dispatch(openSettings());
          }}
        >
          <Settings
            sx={{
              fontSize: "0.9rem",
            }}
          />
        </div>
      )}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
        ref={elem}
      >
        <div onClick={handleTimerClick}>
          <CountdownCircleTimer
            isPlaying={isPlaying}
            size={size}
            duration={
              pomodoro.active === "work"
                ? pomodoro.workTime
                : pomodoro.breakTime
            }
            colors={["#EA9828", "#EA9828"]}
            colorsTime={[
              pomodoro.active === "work"
                ? pomodoro.workTime
                : pomodoro.breakTime,
              0,
            ]}
            strokeWidth={8}
            key={key}
            onComplete={handleComplete}
          >
            {({ remainingTime }) => (
              <div
                style={{
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontSize: size / 5,
                  }}
                >
                  {moment.utc(remainingTime * 1000).format("mm:ss")}
                </p>
                {isPlaying ? (
                  <Pause
                    sx={{
                      fontSize: size / 5,
                    }}
                  />
                ) : (
                  <PlayArrow
                    sx={{
                      fontSize: size / 5,
                    }}
                  />
                )}
              </div>
            )}
          </CountdownCircleTimer>
        </div>
        <ButtonGroup aria-label="outlined primary button group" size="small">
          <Button
            variant={pomodoro.active === "work" ? "contained" : "outlined"}
            onClick={() => {
              setIsPlaying(false);
              setKey((k) => k + 1);
              dispatch(changeActiveTimer("work"));
            }}
          >
            Work
          </Button>
          <Button
            variant={pomodoro.active === "break" ? "contained" : "outlined"}
            onClick={() => {
              setIsPlaying(false);
              setKey((k) => k + 1);
              dispatch(changeActiveTimer("break"));
            }}
          >
            Break
          </Button>
        </ButtonGroup>
      </div>
    </WidgetLayout>
  );
};

export const PomodoroContainer = (props: any) => {
  return <Pomodoro />;
};
