import React from "react";

import "./Leaderboard.css";

interface Leader {
  group_id: string;
  clubber: string;
  points: number;
}

interface LeaderboardProps {
  title: string;
  leaders: Leader[] | undefined;
}

const Leaderboard = ({ title, leaders }: LeaderboardProps): JSX.Element => {
  return (
    <div className={"leaderboardContainer"}>
      <h1>{title}</h1>
      <table className={"leaderboardTable"}>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>POINTS</th>
          </tr>
        </thead>
        <tbody>
          {leaders !== undefined &&
            leaders.map((leader: Leader, i: number) => {
              return (
                <tr key={"regular" + i}>
                  <td>{leader.group_id}</td>
                  <td>{leader.clubber}</td>
                  <td>{leader.points}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
