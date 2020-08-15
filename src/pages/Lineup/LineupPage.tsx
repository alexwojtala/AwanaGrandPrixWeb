import React, { useEffect, useState, useCallback } from 'react';
import Select from 'react-select'
import axios from 'axios';
import Navigation from '../../components/Navigation/Navigation';
import './LineupPage.css'
import Table from '../../components/Table/Table';
import RaceGroupService, {Race} from '../../services/RaceGroupService';

axios.defaults.headers.common = { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }

const Lineup = () => {
  const [currentRace, setCurrentRace] = useState<Race>();
  const [nextRace, setNextRace] = useState<Race>();
  const [raceGroup, setRaceGroup] = useState<number>(-1);
  const [places, setPlaces] = useState([0,0,0,0]);
  const [raceCount, setRaceCount] = useState(0);
  const [isSubmittedResultsValid, setIsSubmittedResultsValid] = useState(true)

  const getCurrentRace = useCallback(() => {
    RaceGroupService.getCurrentRace(raceGroup).then(setCurrentRace)
  }, [raceGroup])

  const getNextRace = useCallback(() => {
    RaceGroupService.getNextRace(raceGroup).then(setNextRace)
  }, [raceGroup])

  useEffect(() => {
    if (raceGroup !== -1) {
      getCurrentRace();
      getNextRace();
    }
  }, [raceGroup, getCurrentRace, getNextRace])

  useEffect(() => {
    axios.get('/race-groups/current', {})
      .then(function (response) {
        if (response.data.id) {
          setRaceCount(response.data.race_count);
          setRaceGroup(response.data.id);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [])

  const options = [
    { value: 1, label: '1st Place' },
    { value: 2, label: '2nd Place' },
    { value: 3, label: '3rd Place' },
    { value: 4, label: '4th Place' }
  ]

  const submitRaceResults = () => {
    if (currentRace && places.includes(1) && places.includes(2) && places.includes(3) && places.includes(4)) {
      axios.post(`/race-groups/${raceGroup}/races/${currentRace.id}/result`, {
        result: {
          race_id: currentRace.id,
          places: places
        }
      }
      )
        .then(function (response) {
          console.log(response);
          setPlaces([0, 0, 0, 0])
          getCurrentRace();
          getNextRace();
          setIsSubmittedResultsValid(true);
          window.location.reload();
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      setIsSubmittedResultsValid(false);
    }
  }

  const placeDropdown = (laneNumber: number) => <Select 
    options={options} 
    isSearchable={true}
    autosize={true}
    onChange={(event: any) => {
      places[laneNumber] = Number(event.value);
    }}
    styles={customStyles}
  />

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      width: 200,
    })
  }

  return (
    <div>
      <Navigation></Navigation>
      <div className={'nextRaceContainer'}>
        <h3>Up Next</h3>
        {nextRace !== undefined && <Table 
          className={'nextRace'}
          headers={['Group Id', 'Name']} 
          content={nextRace.lanes_by_group_id.map((lane: string, i: number) => [lane, nextRace.lanes_by_clubber[i]])}
        />}
        
      </div>

      <h3>Current Race ({ currentRace !== undefined && raceCount !== undefined && `${currentRace.id} / ${raceCount}`})</h3>
      {currentRace !== undefined && <Table 
          className={'currentRace'}
          headers={['Group Id', 'Name', 'Place']} 
          content={currentRace.lanes_by_group_id.map((lane: string, i: number) => [lane, currentRace.lanes_by_clubber[i], placeDropdown(i)])}
        />}
      { raceGroup && <button className={'submit-race-results-button'} onClick={submitRaceResults}>submit results</button>}
      { !isSubmittedResultsValid && <div className={'submit-race-results-error-message'}>Must have all places (1st through 4th) filled out</div>}
    </div>
  );
}

export default Lineup;
