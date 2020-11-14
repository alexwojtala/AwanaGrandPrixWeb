import React, { useState } from "react";
import "./CheckInPage.css";
import axios from "axios";
import CheckInConfirmation from "../../components/CheckInConfirmation/CheckInConfirmation";
import Page from "../../components/Page/Page";

axios.defaults.headers.common = {
  Authorization: `Bearer ${localStorage.getItem("authToken")}`,
};

enum TabState {
  FORM,
  SUBMITTED,
}

const CheckInPage = (): JSX.Element => {
  const [groupId, setGroupId] = useState<string>();
  const [clubber, setClubber] = useState<string>();
  const [meetsRequirments, setMeetsRequirements] = useState<boolean>();
  const [club, setClub] = useState<string>();
  const [tab, setTab] = useState<TabState>(TabState.FORM);

  const registerVehicle = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    axios
      .post("/cars", {
        clubber,
        meets_requirements: meetsRequirments,
        club,
      })
      .then((response) => {
        setGroupId(response.data.group_id);
        setTab(TabState.SUBMITTED);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  switch (tab) {
    case TabState.SUBMITTED:
      return (
        <Page>
          <CheckInConfirmation
            clubber={clubber}
            groupId={groupId}
            onContinue={() => {
              setTab(TabState.FORM);
            }}
          />
        </Page>
      );
    default:
      return (
        <Page>
          <form className={"container"} onSubmit={registerVehicle}>
            <h1>Welcome to the Awana Grand Prix</h1>
            <h2>Racer Name</h2>
            <input
              type="text"
              aria-label="Racer's Name"
              onChange={(event) => setClubber(event.target.value)}
              required
            ></input>
            <h2>group</h2>
            <div>
              <label>
                <input
                  type="radio"
                  name="awana-group"
                  value="Sparks"
                  onChange={(event) => setClub(event.target.value)}
                  required
                />
                Sparks
              </label>
              <label>
                <input
                  type="radio"
                  name="awana-group"
                  value="Ultimate Adventure"
                  onChange={(event) => setClub(event.target.value)}
                />
                Ultimate Adventure
              </label>
              <label>
                <input
                  type="radio"
                  name="awana-group"
                  value="Ultimate Challenge"
                  onChange={(event) => setClub(event.target.value)}
                />
                Ultimate Challenge
              </label>
              <label>
                <input
                  type="radio"
                  name="awana-group"
                  value="Other"
                  onChange={(event) => setClub(event.target.value)}
                />
                Other
              </label>
            </div>
            <h2>division</h2>
            <div>
              {club !== "Other" && (
                <label>
                  <input
                    type="radio"
                    name="division"
                    value="Normal"
                    onChange={() => setMeetsRequirements(true)}
                  />
                  Normal
                </label>
              )}
              {club === "Other" && (
                <label className="disabled">
                  <input
                    type="radio"
                    name="division"
                    value="Normal"
                    onChange={() => setMeetsRequirements(true)}
                    disabled
                  />
                  Normal
                </label>
              )}
              <label>
                <input
                  type="radio"
                  name="division"
                  value="Outlaw"
                  onChange={() => setMeetsRequirements(false)}
                  required
                />
                Outlaw
              </label>
            </div>
            <button className={"enter"}>Enter</button>
          </form>
        </Page>
      );
  }
};

export default CheckInPage;
