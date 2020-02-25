import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navigation from '../../components/Navigation/Navigation';
import './LeaderboardPage.css'

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
            <div className={'leaderboardContainer'}>
                <div className={'regularLeaderboardContainer'}>
                    <h1>Regular</h1>
                    <table className={'leaderboardTable'}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>POINTS</th>
                            </tr>
                        </thead>
                        <tbody>
                            { regulars !== undefined && regulars.map((regular: any, i: number) => {
                                return (
                                    <tr key={'regular' + i}>
                                        <td>{regular.group_id}</td>
                                        <td>{regular.clubber}</td>
                                        <td>{regular.points}</td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>
                </div>
                <div className={'outlawLeaderboardContainer'}>
                    <h1>Outlaw</h1>
                    <table className={'leaderboardTable'}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>POINTS</th>
                            </tr>
                        </thead>
                        <tbody>
                            { outlaws !== undefined && outlaws.map((outlaw: any, i: number) => {
                                return (
                                    <tr key={'outlaw' + i}>
                                        <td>{outlaw.group_id}</td>
                                        <td>{outlaw.clubber}</td>
                                        <td>{outlaw.points}</td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default LeaderboardPage;