import React from "react";
import "./Navigation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlagCheckered } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router-dom";

interface Location {
  pathname: string;
}

interface Props {
  location: Location;
}

const Navigation = (props: Props) => {
  return (
    <div>
      <div className={"navContainer"}>
        <div className={"logo"}>
          <FontAwesomeIcon icon={faFlagCheckered} />
          &nbsp;&nbsp;&nbsp;AWANA Grand Prix
        </div>
        <a className={"loginLink"} href="/">
          {localStorage.getItem("role")
            ? localStorage.getItem("role")
            : "login"}
        </a>
        <a
          className={
            "navLink" +
            (props.location.pathname === "/check-in" ? " selectedLink" : "")
          }
          href="/check-in"
        >
          Check In
        </a>
        <a
          className={
            "navLink" +
            (props.location.pathname === "/cars" ? " selectedLink" : "")
          }
          href="/cars"
        >
          Cars
        </a>
        <a
          className={
            "navLink" +
            (props.location.pathname === "/races" ? " selectedLink" : "")
          }
          href="/races"
        >
          Races
        </a>
        <a
          className={
            "navLink" +
            (props.location.pathname === "/lineup" ? " selectedLink" : "")
          }
          href="/lineup"
        >
          Lineup
        </a>
        <a
          className={
            "navLink" +
            (props.location.pathname === "/leaderboard" ? " selectedLink" : "")
          }
          href="/leaderboard"
        >
          Leaderboard
        </a>
      </div>
    </div>
  );
};

export default withRouter(Navigation);
