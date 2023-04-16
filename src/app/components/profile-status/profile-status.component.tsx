import React, { useEffect, useState } from "react";
import "./profile-status.component.scss";
import { Todo } from "../../services/todos/todos.service";
import { FiCheck, FiEdit2 } from "react-icons/fi";

export const ProfileStatus = (props: { todos: Todo[] }) => {
  const [userName, setUserName] = useState("Naruto");
  const [isEditing, setIsEditing] = useState(false);
  const { todos } = props;

  useEffect(() => {
    let user = localStorage.getItem("username");
    if (user) {
      setUserName(user);
    }
  }, []);

  const getAvatar = () => {
    const today = todos.filter((todo) => {
      return (
        todo.createdDate.toDateString() === new Date(Date.now()).toDateString()
      );
    }).length;
    const todayDone = todos.filter((todo) => {
      return (
        todo.createdDate.toDateString() ===
          new Date(Date.now()).toDateString() && todo.completed
      );
    }).length;
    const old = todos.filter((todo) => {
      return (
        todo.createdDate.toDateString() !==
          new Date(Date.now()).toDateString() && !todo.completed
      );
    }).length;
    if (today / 2 <= old) {
      return "sakura";
    } else if (todayDone > Math.floor(today * 0.5)) {
      return "itachi";
    } else {
      return "naruto";
    }
  };

  const setUser = () => {
    localStorage.setItem("username", userName);
    if (userName.toLowerCase().includes("gaudmire")) {
      localStorage.setItem("group", "gaudmire");
    } else if (userName.toLowerCase().includes("alterok")) {
      localStorage.setItem("group", "alterok");
    } else if (userName.toLowerCase().includes("spectreseek")) {
      localStorage.setItem("group", "spectreseek");
    } else if (userName.toLowerCase().includes("erevald")) {
      localStorage.setItem("group", "erevald");
    }
    setIsEditing(false);
  };

  return (
    <section className="profile-status">
      <h1 className="profile-status__title">Your Rank</h1>
      <img
        src={`../${getAvatar()}.png`}
        width={100}
        className="profile-status__image"
        alt=""
      />
      <div className="profile-status__info">
        {isEditing ? (
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="profile-status__edit-input"
          />
        ) : (
          <h4>{userName}</h4>
        )}
        {isEditing ? (
          <FiCheck className="profile-status__edit-icon" onClick={setUser} />
        ) : (
          <FiEdit2
            className="profile-status__edit-icon"
            onClick={() => setIsEditing(!isEditing)}
          />
        )}
      </div>
    </section>
  );
};
