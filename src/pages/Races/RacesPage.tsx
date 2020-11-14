import React, { useEffect, useState } from "react";
import axios from "axios";
import "./RacesPage.css";
import Page from "../../components/Page/Page";

axios.defaults.headers.common = {
  Authorization: `Bearer ${localStorage.getItem("authToken")}`,
};

enum TabState {
  RACE_STARTED,
  RACE_NOT_STARTED,
  CHOOSE_GROUP_TO_START,
}

interface Race {
  id: number;
  lanes_by_group_id: string[];
}

const Races = (): JSX.Element => {
  const [races, setRaces] = useState();
  const [tab, setTab] = useState(TabState.RACE_NOT_STARTED);

  useEffect(() => {
    axios
      .get("/race-groups/current", {})
      .then(function (response) {
        if (response.data.name && !response.data.is_finished) {
          setTab(TabState.RACE_STARTED);
          axios
            .get(`/race-groups/${response.data.id}/races`)
            .then((response) => {
              setRaces(response.data);
            });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  switch (tab) {
    case TabState.RACE_STARTED:
      return (
        <Page>
          <h1>Race Order</h1>
          <table className={"racesTable"}>
            <thead>
              <tr>
                <th>Race #</th>
                <th>LANE 1</th>
                <th>LANE 2</th>
                <th>LANE 3</th>
                <th>LANE 4</th>
              </tr>
            </thead>
            <tbody>
              {races !== undefined &&
                races.map((race: Race, i: number) => {
                  return (
                    <tr key={i}>
                      <td>{race.id}</td>
                      <td>{race.lanes_by_group_id[0]}</td>
                      <td>{race.lanes_by_group_id[1]}</td>
                      <td>{race.lanes_by_group_id[2]}</td>
                      <td>{race.lanes_by_group_id[3]}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </Page>
      );
    case TabState.CHOOSE_GROUP_TO_START:
      return (
        <Page>
          <div className={"choose-group-container"}>
            <h1>Which type?</h1>
            <button
              onClick={() => {
                axios.post("/race-groups/", { name: "Regular" }).then(() => {
                  setTab(TabState.RACE_STARTED);
                });
              }}
            >
              Regular
            </button>
            <button
              onClick={() => {
                axios.post("/race-groups/", { name: "Outlaw" }).then(() => {
                  setTab(TabState.RACE_STARTED);
                });
              }}
            >
              Outlaw
            </button>
          </div>
        </Page>
      );
    default:
      return (
        <Page>
          <div className={"start-race-container"}>
            <h1>No Races have been started.</h1>
            <button
              onClick={() => {
                setTab(TabState.CHOOSE_GROUP_TO_START);
              }}
            >
              Start Race
            </button>
          </div>
        </Page>
      );
  }
};

export default Races;
