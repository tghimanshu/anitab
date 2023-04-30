import React from "react";
import _ from "lodash";
import { AiOutlinePlus } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { deleteBookmark, openAddBookmark } from "./bookmarks.slice";
import { Avatar, Badge, IconButton } from "@mui/material";
import "./bookmarks.plugin.scss";
import { WidgetLayout } from "../../layouts/widget.layout";
import DeleteIcon from "@mui/icons-material/Delete";

export const Bookmarks = () => {
  const bookmarks = useAppSelector((state) => state.bookmarks.bookmarks);
  const dispatch = useAppDispatch();
  return (
    <WidgetLayout
      title="Bookmarks"
      actions={() => (
        <AiOutlinePlus
          className="bookmarks__add"
          onClick={() => dispatch(openAddBookmark())}
        />
      )}
    >
      {bookmarks.length === 0 && (
        <p className="bookmarks__empty">There are no bookmarks yet</p>
      )}
      <div className="bookmarks__container">
        {bookmarks.length !== 0 &&
          bookmarks.map((bookmark, i) => (
            <a
              href={bookmark.url.toString()}
              target="_blank"
              className="bookmark"
              key={i}
            >
              <Avatar
                className="bookmark__icon"
                alt="Sharp"
                src={`https://s2.googleusercontent.com/s2/favicons?domain=${
                  new URL(bookmark.url).hostname
                }`}
                sx={{
                  width: 48,
                  height: 48,
                }}
              />
              <p className="bookmark__title">{bookmark.title}</p>
              <IconButton
                color="error"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(deleteBookmark(bookmark));
                }}
                sx={{
                  position: "absolute",
                  top: "-15px",
                  right: "-15px",
                  background: "white",
                  // opacity: 0.4,
                  "&:hover": {
                    background: "white",
                    opacity: 1,
                  },
                }}
                className="bookmark__delete"
              >
                <DeleteIcon
                  sx={{
                    fontSize: "0.8em",
                  }}
                />
              </IconButton>
            </a>
          ))}
      </div>
    </WidgetLayout>
  );
};

export const BookmarksContainer = () => {
  return <Bookmarks />;
};
