import React from "react";
import LeaderboardScoreList from "./LeaderboardScoreList.jsx";
import useApplicationData from "../../hooks/useLeaderboardData";
import { Table } from 'react-bootstrap';


export default function Leaderboard() {
  const { stats } = useApplicationData();

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
            <LeaderboardScoreList stats={stats} />
          </tbody>
        </table>
      </div>
    </>
  );
}

