import React, { useState } from 'react';
import Navigation from '../../components/Navigation/Navigation'
import './CheckInPage.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons'

axios.defaults.headers.common = { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }

enum TabState {
    FORM,
    SUBMITTED
}

const CheckInPage = () => {
  const [groupId, setGroupId] = useState();
  const [clubber, setClubber] = useState();
  const [meetsRequirments, setMeetsRequirements] = useState();
  const [club, setClub] = useState();
  const [tab, setTab] = useState(TabState.FORM);

  const registerVehicle = (event: any) => {
      event.preventDefault();
    axios.post('/cars', {
        clubber,
        meets_requirements: meetsRequirments,
        club
    })
      .then(response => {
          setGroupId(response.data.group_id)
          setTab(TabState.SUBMITTED)
      })
      .catch(error => {
        console.log(error);
      });
  };

  switch(tab) {
      case TabState.SUBMITTED:
          return (
              <>
              <Navigation></Navigation>
              <div className={'container'}>
                <h2>you're entered <FontAwesomeIcon icon={faCheck} /></h2>
                <div>{clubber} is <strong>#{groupId}</strong></div>
                <button className={'enrollClubber'} onClick={() => {
                    setTab(TabState.FORM);
                }}>Enroll next clubber</button>
              </div>
              </>
          )
        default:
            return (
            <>
                <Navigation></Navigation>
                <form className={'container'} onSubmit={registerVehicle}>
                    <h1>Welcome to the Awana Grand Prix</h1>
                    <h2>Racer's Name</h2>
                    <input type="text" aria-label="Racer's Name" onChange={(event) => setClubber(event.target.value)} required></input>
                    <h2>group</h2>
                    <div>
                        <label>
                            <input type="radio" name="awana-group" value="Sparks" onChange={(event) => setClub(event.target.value)} required/>
                            Sparks
                        </label>
                        <label>
                            <input type="radio" name="awana-group" value="Ultimate Adventure" onChange={(event) => setClub(event.target.value)}/>
                            Ultimate Adventure
                        </label>
                        <label>
                            <input type="radio" name="awana-group" value="Ultimate Challenge" onChange={(event) => setClub(event.target.value)}/>
                            Ultimate Challenge
                        </label>
                        <label>
                            <input type="radio" name="awana-group" value="Other" onChange={(event) => setClub(event.target.value)}/>
                            Other
                        </label>
                    </div>
                    <h2>division</h2>
                    <div>
                        {club !== 'Other' &&
                            <label>
                                <input type="radio" name="division" value="Normal" onChange={(event) => setMeetsRequirements(true)}/>
                                Normal
                            </label>
                        }
                        { club === 'Other' &&
                            <label className="disabled">
                                <input type="radio" name="division" value="Normal" onChange={(event) => setMeetsRequirements(true)} disabled/>
                                Normal
                            </label>
                        }
                        <label>
                            <input type="radio" name="division" value="Outlaw" onChange={(event) => setMeetsRequirements(false)} required/>
                            Outlaw
                        </label>
                    </div>
                    <button className={'enter'}>Enter</button>
                </form>
            </>
            );

  }
  
}

export default CheckInPage;