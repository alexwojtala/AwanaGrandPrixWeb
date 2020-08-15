import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navigation from '../../components/Navigation/Navigation';
import './LeaderboardPage.css'
import Leaderboard from '../../components/Leaderboard/Leaderboard';

axios.defaults.headers.common = { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }

const LeaderboardPage = () => {
    const [outlaws, setOutlaws] = useState()
    const [regulars, setRegulars] = useState()

    useEffect(() => {
        axios.get('/points-leaderboard')
        .then(function (response) {
          setOutlaws(response.data.outlaws)
          setRegulars(response.data.regular)
          console.log(response.data.regular)
        })
        .catch(function (error) {
          console.log(error);
        });
      }, [])

    return (
        <>
            <Navigation></Navigation>
            <div className={'leaderboardsContainer'}>
                <Leaderboard title={'Regular'} leaders={regulars} />
                <Leaderboard title={'Outlaw'} leaders={outlaws} />
            </div>
        </>
    )
}

export default LeaderboardPage;