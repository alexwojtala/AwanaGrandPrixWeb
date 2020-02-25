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
        <div>
          <h3>Role:</h3>
          <input type="radio" name="role" value="guest" onChange={(event) => { setRole(event.target.value) }} /> <label>Guest</label>
          <input type="radio" name="role" value="volunteer" onChange={(event) => { setRole(event.target.value) }} /> <label>Volunteer</label>
          <input type="radio" name="role" value="admin" onChange={(event) => { setRole(event.target.value) }} /> <label>Admin</label><br />

          <label>Password:</label> <input type="password" onChange={(event) => { setPassword(event.target.value) }} /><br />

          <button onClick={(event: any) => {
            SignIn(event);
            console.log('here');
            console.log('here');
          }}>Submit</button>
        </div>
      }
    </>
  );
}

export default App;
