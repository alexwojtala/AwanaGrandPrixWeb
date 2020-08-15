import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navigation from '../../components/Navigation/Navigation';
import './RacesPage.css'

axios.defaults.headers.common = { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }

enum TabState {
  RACE_STARTED,
  RACE_NOT_STARTED,
  CHOOSE_GROUP_TO_START
}

const Races = () => {
  const [races, setRaces] = useState();
  const [tab, setTab] = useState(TabState.RACE_NOT_STARTED);

  useEffect(() => {
    axios.get('/race-groups/current', {})
      .then(function (response) {
        if(response.data.name && !response.data.is_finished) {
          setTab(TabState.RACE_STARTED)
          axios.get(`/race-groups/${response.data.id}/races`)
          .then(response => {
            setRaces(response.data);
          })
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [])

  switch(tab) {
    case TabState.RACE_STARTED:
        return (
          <>
            <Navigation></Navigation>
      
            <table className={'racesTable'}>
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
      
                {races !== undefined && races.map((race: any, i: number) => {
                  return (
                    <tr key={i}>
                      <td>{race.id}</td>
                      <td>{race.lanes_by_group_id[0]}</td>
                      <td>{race.lanes_by_group_id[1]}</td>
                      <td>{race.lanes_by_group_id[2]}</td>
                      <td>{race.lanes_by_group_id[3]}</td>
                    </tr>
                  )
                })}
                
              </tbody>
            </table>
          </>
        );
    case TabState.CHOOSE_GROUP_TO_START:
      return (
        <>
          <Navigation></Navigation>
          <div className={'choose-group-container'}>
            <h1>Which type?</h1>
            <button onClick={() => {
                axios.post('/race-groups/', { name: "Regular"})
                .then(() => {
                  setTab(TabState.RACE_STARTED)
                })
            }}>Regular</button>
            <button onClick={() => {
              axios.post('/race-groups/', { name: "Outlaw"})
              .then(() => {
                setTab(TabState.RACE_STARTED)
              })
            }}>Outlaw</button>
          </div>
        </>
      );
    default:
        return (
          <>
            <Navigation></Navigation>
            <div className={'start-race-container'}>
              <div>No Races have been started.</div>
              <button onClick={() => {
                setTab(TabState.CHOOSE_GROUP_TO_START);
              }}>Start Race</button>
            </div>
          </>
        );
  }
  
}

export default Races;
