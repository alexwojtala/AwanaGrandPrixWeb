import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import './Navigation.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlagCheckered } from '@fortawesome/free-solid-svg-icons'
import {withRouter} from 'react-router-dom';

const Navigation = (props: any) => {
    const [redirectToCheckin, setRedirectToCheckin] = useState(false);
    const [redirectToCars, setRedirectToCars] = useState(false);
    const [redirectToRaces, setRedirectToRaces] = useState(false);
    const [redirectToLineup, setRedirectToLineup] = useState(false);
    const [redirectToLeaderboard, setRedirectToLeaderboard] = useState(false);
    const [redirectToLogin, setRedirectToLogin] = useState(false);

    return (
        <div>
            <div className={'navContainer'}>
                { redirectToCheckin && <Redirect to='/check-in' />}
                { redirectToCars && <Redirect to='/cars' />}
                { redirectToRaces && <Redirect to='/races' />}
                { redirectToLineup && <Redirect to='/lineup' />}
                { redirectToLeaderboard && <Redirect to='/leaderboard' />}
                { redirectToLogin && <Redirect to='/' />}
                <div className={'logo'} ><FontAwesomeIcon icon={faFlagCheckered} />&nbsp;&nbsp;&nbsp;AWANA Grand Prix</div>
                <div className={'loginLink'} onClick={() => { setRedirectToLogin(true) }}>{localStorage.getItem('role') ? localStorage.getItem('role') : 'login'}</div>
                <div className={'navLink' + (props.location.pathname === '/check-in' ? ' selectedLink' : '')} onClick={() => { setRedirectToCheckin(true) }}>Check In</div>
                <div className={'navLink' + (props.location.pathname === '/cars' ? ' selectedLink' : '')} onClick={() => { setRedirectToCars(true) }}>Cars</div>
            </div>
        </div>
    )
}

export default withRouter(Navigation);