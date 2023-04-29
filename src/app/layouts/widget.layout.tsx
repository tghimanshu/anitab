import React from "react";

export const WidgetLayout = ({ children }: Props) => {
  return (
    <div
      style={{
        background: "red",
      }}
    >
      {children}
    </div>
  );
};

type Props = {
  children: string | JSX.Element | JSX.Element[] | null;
};
