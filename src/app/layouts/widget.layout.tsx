import React from "react";
import "./widget.layout.scss";

export const WidgetLayout = ({ children, actions, title }: Props) => {
  return (
    <section className="widget">
      <div className="widget__header">
        <h1 className="widget__title drag-handle">{title}</h1>
        {actions()}
      </div>
      <div className="widget__content">{children}</div>
    </section>
  );
};

type Props = {
  children: any;
  actions: any;
  title: string;
};
