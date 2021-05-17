import React from "react";
import LeaderboardScoreList from "./LeaderboardScoreList.jsx";
import useApplicationData from "../../hooks/useApplicationData";
import { Table } from 'react-bootstrap';


export default function Leaderboard() {
  const { state } = useApplicationData();

  return (
    <>
      <div className="leaderboard">
        <h2 className="leaderboard-title">High Scores</h2>
        <table className="css-serial">
          <thead>
            <tr>
              <th>rank</th>
              <th>name</th>
              <th>score</th>
              <th>time</th>
            </tr>
          </thead>
          <tbody>
            <LeaderboardScoreList stats={state.stats} />
          </tbody>
        </table>
      </div>
    </>
  );
}

