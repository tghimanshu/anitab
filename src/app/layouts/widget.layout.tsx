import React from "react";
import "./widget.layout.scss";

/**
 * A layout wrapper for widgets.
 *
 * This component provides a standard structure for widgets, including a header
 * with a draggable title and an actions area, followed by the widget's content.
 *
 * @param {Props} props - The component props.
 * @returns {JSX.Element} The rendered widget layout.
 */
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

// type Props = {
//   children: string | JSX.Element | JSX.Element[] | null;
//   actions: any;
// };

/**
 * Props for the WidgetLayout component.
 */
type Props = {
  /**
   * The content to display inside the widget.
   */
  children: any;
  /**
   * A function that returns a JSX element representing the actions (buttons, icons)
   * to display in the widget header.
   */
  actions: any;
  /**
   * The title of the widget.
   */
  title: string;
};
