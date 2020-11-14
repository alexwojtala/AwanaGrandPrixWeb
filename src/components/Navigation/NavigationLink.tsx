import React from "react";
import "./NavigationLink.css";

interface Props {
  path: string;
  text: string;
  currentPathname: string;
}

const NavigationLink = ({
  path,
  text,
  currentPathname,
}: Props): JSX.Element => {
  return (
    <a
      className={`navLink` + (currentPathname === path ? " selectedLink" : "")}
      href={path}
    >
      {text}
    </a>
  );
};

export default NavigationLink;
