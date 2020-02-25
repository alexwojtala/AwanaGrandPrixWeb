import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navigation from '../../components/Navigation/Navigation';
import './LineupPage.css'

axios.defaults.headers.common = { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }

const Lineup = () => {
  const [currentRace, setCurrentRace] = useState();
  const [nextRace, setNextRace] = useState();
  const [raceGroup, setRaceGroup] = useState();
  const [places, setPlaces] = useState([0,0,0,0]);
  const [raceCount, setRaceCount] = useState(0);
  const [isSubmittedResultsValid, setIsSubmittedResultsValid] = useState(true)

  useEffect(() => {
    if (raceGroup) {
      getCurrentRace();
      getNextRace();
    }
  }, [raceGroup])

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

  const submitRaceResults = () => {
    if (places.includes(1) && places.includes(2) && places.includes(3) && places.includes(4)) {
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
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      setIsSubmittedResultsValid(false);
    }
  }

  const getCurrentRace = () => {
    axios.get(`/race-groups/${raceGroup}/races/current`, {})
        .then((response) => {
          setCurrentRace(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  const getNextRace = () => {
    axios.get(`/race-groups/${raceGroup}/races/next`, {})
        .then(function (response) {
          setNextRace(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  return (
    <div>
      <Navigation></Navigation>
      <div className={'nextRaceContainer'}>
        <h3>Up Next</h3>
        <table className={'nextRace'}>
          <thead>
            <tr>
              <th>Group Id</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>

            {nextRace != undefined && nextRace.lanes_by_group_id.map((lane: number, i: number) => {
              return (
                <tr>
                  <td>{lane}</td>
                  <td>{nextRace.lanes_by_clubber[i]}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <h3>Current Race ({ currentRace != undefined && raceCount != undefined && `${currentRace.id} / ${raceCount}`})</h3>
      <table className={'currentRace'}>
        <thead>
          <tr>
            <th>Group Id</th>
            <th>Name</th>
            <th>Place</th>
          </tr>
        </thead>
        <tbody>

          {currentRace != undefined && currentRace.lanes_by_group_id.map((lane: number, i: number) => {
            return (
              <tr>
                <td>{lane}</td>
                <td>{currentRace.lanes_by_clubber[i]}</td>
                <td>
                  <select onChange={(event) => {
                    places[i] = Number(event.target.value);
                    console.log(places);
                  }}>
                    <option selected disabled>Choose here</option>
                    <option value={1}>1st Place</option>
                    <option value={2}>2nd Place</option>
                    <option value={3}>3rd Place</option>
                    <option value={4}>4th Place</option>
                  </select>
                </td>
              </tr>
            );
          })
            

          }

        </tbody>
      </table>
      { raceGroup && <button className={'submit-race-results-button'} onClick={submitRaceResults}>submit results</button>}
      { !isSubmittedResultsValid && <div className={'submit-race-results-error-message'}>Must have all places (1st through 4th) filled out</div>}
    </div>
  );
}

export default Lineup;
