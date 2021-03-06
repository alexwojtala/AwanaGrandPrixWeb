import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Route, BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import CheckInPage from "./pages/CheckIn/CheckInPage";
import Cars from "./pages/Cars/cars";
import RacesPage from "./pages/Races/RacesPage";
import LineupPage from "./pages/Lineup/LineupPage";
import LeaderboardPage from "./pages/Leaderboard/LeaderboardPage";
import axios from "axios";

axios.defaults.baseURL = "https://awana-grand-prix-api.herokuapp.com/";
axios.defaults.headers.common = {
  Authorization: `Bearer ${localStorage.getItem("authToken")}`,
};

const routing = (
  <Router basename={process.env.PUBLIC_URL}>
    <div>
      <Route exact path="/" component={App} />
      <Route exact path="/check-in" component={CheckInPage} />
      <Route exact path="/cars" component={Cars} />
      <Route exact path="/races" component={RacesPage} />
      <Route exact path="/lineup" component={LineupPage} />
      <Route exact path="/leaderboard" component={LeaderboardPage} />
    </div>
  </Router>
);

if (process.env.NODE_ENV !== "production") {
  import("react-axe").then((axe) => {
    axe.default(React, ReactDOM, 1000);
    ReactDOM.render(routing, document.getElementById("root"));
  });
} else {
  ReactDOM.render(routing, document.getElementById("root"));
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
