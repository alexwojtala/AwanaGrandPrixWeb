import React, { useEffect, useState } from 'react';
import Select from 'react-select'
import axios from 'axios';
import Navigation from '../../components/Navigation/Navigation';
import './LineupPage.css'
import Table from '../../components/Table/Table';

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

  const options = [
    { value: 1, label: '1st Place' },
    { value: 2, label: '2nd Place' },
    { value: 3, label: '3rd Place' },
    { value: 4, label: '4th Place' }
  ]

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
          window.location.reload();
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
          headers={['Group Id', 'Name']} 
          content={nextRace.lanes_by_group_id.map((lane: number, i: number) => [lane, nextRace.lanes_by_clubber[i]])}
        />}
        {/* <table className={'nextRace'}>
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
        </table> */}
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
                  <Select 
                    options={options} 
                    isSearchable={true}
                    autosize={true}
                    onChange={(event: any) => {
                      places[i] = Number(event.value);
                    }}
                    styles={customStyles}
                  />
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
