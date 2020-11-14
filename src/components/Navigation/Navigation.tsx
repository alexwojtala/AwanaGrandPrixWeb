import React from "react";
import "./Navigation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlagCheckered } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router-dom";
import NavigationLink from "./NavigationLink";

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
        <NavigationLink
          path="/check-in"
          text="Check In"
          currentPathname={props.location.pathname}
        />
        <NavigationLink
          path="/cars"
          text="Cars"
          currentPathname={props.location.pathname}
        />
        <NavigationLink
          path="/races"
          text="Races"
          currentPathname={props.location.pathname}
        />
        <NavigationLink
          path="/lineup"
          text="Lineup"
          currentPathname={props.location.pathname}
        />
        <NavigationLink
          path="/leaderboard"
          text="Leaderboard"
          currentPathname={props.location.pathname}
        />
      </div>
    </div>
  );
};

export default withRouter(Navigation);
