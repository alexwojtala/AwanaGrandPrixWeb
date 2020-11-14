import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { Redirect } from "react-router";

const App = (): JSX.Element => {
  const [role, setRole] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);

  const SignIn = () => {
    axios
      .post(
        "/sign-in",
        {},
        {
          auth: {
            username: role,
            password: password,
          },
        }
      )
      .then((response) => {
        localStorage.setItem("authToken", response.data.token);
        axios.defaults.headers.common = {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        };
        localStorage.setItem("role", response.data.user.role);
        console.log(response.data.user.role);
        setRedirect(true);
        setLoading(false);
        setLoginFailed(false);
      })
      .catch((error) => {
        setLoading(false);
        setLoginFailed(true);
        console.log(error);
      });
    setLoading(true);
  };

  return (
    <>
      {redirect && <Redirect to="/cars" push />}
      {!redirect && (
        <>
          <div className={"signInContainer"}>
            <h1>Sign in to Awana Grand Prix</h1>
            <h3 className={"roleLoginInputLabel"}>Role</h3>
            <div className={"roleRadioButtons"}>
              <input
                id="role-guest"
                type="radio"
                name="role"
                value="guest"
                onChange={(event) => {
                  setRole(event.target.value);
                }}
              />{" "}
              <label htmlFor="role-guest">Guest</label>
              <input
                id="role-volunteer"
                type="radio"
                name="role"
                value="volunteer"
                onChange={(event) => {
                  setRole(event.target.value);
                }}
              />{" "}
              <label htmlFor="role-volunteer">Volunteer</label>
              <input
                id="role-admin"
                type="radio"
                name="role"
                value="admin"
                onChange={(event) => {
                  setRole(event.target.value);
                }}
              />{" "}
              <label htmlFor="role-volunteer">Admin</label>
              <br />
            </div>
            <label htmlFor="password" className={"roleLoginInputLabel"}>
              Password
            </label>{" "}
            <br />
            <input
              id="password"
              className={"rolePasswordInput"}
              type="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <br />
            {loading && (
              <div className="loadingContainer">
                <div>Authenticating</div>
                <div className="loader" />
              </div>
            )}
            {!loading && loginFailed && (
              <div className="loginFailed">
                Login failed. Invalid credentials.
              </div>
            )}
            <button
              onClick={() => {
                SignIn();
              }}
            >
              Login
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default App;
