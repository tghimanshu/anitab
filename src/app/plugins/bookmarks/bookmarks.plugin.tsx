import React from "react";
import _ from "lodash";
import { AiOutlinePlus } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { openAddBookmark } from "./bookmarks.slice";
import { Avatar } from "@mui/material";
import "./bookmarks.plugin.scss";

export const Bookmarks = () => {
  const bookmarks = useAppSelector((state) => state.bookmarks.bookmarks);
  const dispatch = useAppDispatch();
  return (
    <section className="bookmarks">
      <div className="bookmarks__header">
        <h1 className="bookmarks__title drag-handle">Bookmarks</h1>
        <AiOutlinePlus
          className="bookmarks__add"
          onClick={() => dispatch(openAddBookmark())}
        />
      </div>
      <div className="bookmarks__container" style={{}}>
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
            </a>
          ))}
      </div>
    </section>
  );
};

export const BookmarksContainer = () => {
  return <Bookmarks />;
};
