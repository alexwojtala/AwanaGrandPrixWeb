import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./LineupPage.css";
import Table from "../../components/Table/Table";
import RaceGroupService, { Race } from "../../services/RaceGroupService";
import PlaceDropdown from "../../components/PlaceDropdown/PlaceDropdown";
import Page from "../../components/Page/Page";

axios.defaults.headers.common = {
  Authorization: `Bearer ${localStorage.getItem("authToken")}`,
};

const Lineup = (): JSX.Element => {
  const [currentRace, setCurrentRace] = useState<Race>();
  const [nextRace, setNextRace] = useState<Race>();
  const [raceGroup, setRaceGroup] = useState<number>(-1);
  const [places, setPlaces] = useState([0, 0, 0, 0]);
  const [raceCount, setRaceCount] = useState(0);
  const [isSubmittedResultsValid, setIsSubmittedResultsValid] = useState(true);

  const getCurrentRace = useCallback(() => {
    RaceGroupService.getCurrentRace(raceGroup).then(setCurrentRace);
  }, [raceGroup]);

  const getNextRace = useCallback(() => {
    RaceGroupService.getNextRace(raceGroup).then(setNextRace);
  }, [raceGroup]);

  useEffect(() => {
    if (raceGroup !== -1) {
      getCurrentRace();
      getNextRace();
    }
  }, [raceGroup, getCurrentRace, getNextRace]);

  useEffect(() => {
    RaceGroupService.getCurrentRaceGroup().then((raceGroup) => {
      if (raceGroup.id) {
        setRaceCount(raceGroup.race_count);
        setRaceGroup(raceGroup.id);
      }
    });
  }, []);

  const submitRaceResults = () => {
    if (
      currentRace &&
      places.includes(1) &&
      places.includes(2) &&
      places.includes(3) &&
      places.includes(4)
    ) {
      const raceResult = { race_id: currentRace.id, places: places };

      RaceGroupService.postRaceResults(raceGroup, raceResult).then(() => {
        setPlaces([0, 0, 0, 0]);
        getCurrentRace();
        getNextRace();
        setIsSubmittedResultsValid(true);
        window.location.reload();
      });
    } else {
      setIsSubmittedResultsValid(false);
    }
  };

  return (
    <Page>
      <div className={"nextRaceContainer"}>
        <h1>Race Lineup</h1>
        <h2>Up Next</h2>
        {nextRace !== undefined && (
          <Table
            className={"nextRace"}
            headers={["Group Id", "Name"]}
            content={nextRace.lanes_by_group_id.map(
              (lane: string, i: number) => [lane, nextRace.lanes_by_clubber[i]]
            )}
          />
        )}
      </div>

      <h2>
        Current Race (
        {currentRace !== undefined &&
          raceCount !== undefined &&
          `${currentRace.id} / ${raceCount}`}
        )
      </h2>
      {currentRace !== undefined && (
        <Table
          className={"currentRace"}
          headers={["Group Id", "Name", "Place"]}
          content={currentRace.lanes_by_group_id.map(
            (lane: string, i: number) => [
              lane,
              currentRace.lanes_by_clubber[i],
              <PlaceDropdown
                key={`lane${i}`}
                label={`lane${i}Position`}
                onChangeCallback={(place: number) => {
                  places[i] = Number(place);
                }}
              />,
            ]
          )}
        />
      )}
      {raceGroup && (
        <button
          className={"submit-race-results-button"}
          onClick={submitRaceResults}
        >
          submit results
        </button>
      )}
      {!isSubmittedResultsValid && (
        <div className={"submit-race-results-error-message"}>
          Must have all places (1st through 4th) filled out
        </div>
      )}
    </Page>
  );
};

export default Lineup;
