import React, { useEffect, useState } from "react";
import axios from "axios";
import "./LeaderboardPage.css";
import Leaderboard from "../../components/Leaderboard/Leaderboard";
import Page from "../../components/Page/Page";

axios.defaults.headers.common = {
  Authorization: `Bearer ${localStorage.getItem("authToken")}`,
};

const LeaderboardPage = (): JSX.Element => {
  const [outlaws, setOutlaws] = useState();
  const [regulars, setRegulars] = useState();

  useEffect(() => {
    axios
      .get("/points-leaderboard")
      .then(function (response) {
        setOutlaws(response.data.outlaws);
        setRegulars(response.data.regular);
        console.log(response.data.regular);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <Page>
      <div className={"leaderboardsContainer"}>
        <Leaderboard title={"Regular"} leaders={regulars} />
        <Leaderboard title={"Outlaw"} leaders={outlaws} />
      </div>
    </Page>
  );
};

export default LeaderboardPage;
