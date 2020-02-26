import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { Redirect } from 'react-router';

const App = () => {
  const [role, setRole] = useState();
  const [password, setPassword] = useState();
  const [redirect, setRedirect] = useState(false);

  const SignIn = (event: any) => {
    axios.post('/sign-in', {}, {
      auth: {
        username: role,
        password: password
      }
    })
      .then(function (response) {
        localStorage.setItem('authToken', response.data.token);
        axios.defaults.headers.common = { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
        localStorage.setItem('role', response.data.user.role);
        console.log(response.data.user.role);
        setRedirect(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      { redirect && <Redirect to="/cars" push /> }
      {
        !redirect && 
        <>
          <div className={'signInContainer'}>
            <h1>Sign in to Awana Grand Prix</h1>
            <h3 className={'roleLoginInputLabel'}>Role</h3>
            <div className={'roleRadioButtons'}>
              <input type="radio" name="role" value="guest" onChange={(event) => { setRole(event.target.value) }} /> <label>Guest</label>
              <input type="radio" name="role" value="volunteer" onChange={(event) => { setRole(event.target.value) }} /> <label>Volunteer</label>
              <input type="radio" name="role" value="admin" onChange={(event) => { setRole(event.target.value) }} /> <label>Admin</label><br />
            </div>
              
            <label className={'roleLoginInputLabel'}>Password</label> <br />
            <input className={'rolePasswordInput'}type="password" onChange={(event) => { setPassword(event.target.value) }} /><br />

            <button onClick={(event: any) => {
              SignIn(event);
            }}>Login</button>
          </div>
        </>
      }
    </>
  );
}

export default App;
