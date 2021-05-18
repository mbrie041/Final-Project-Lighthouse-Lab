import React from "react";
import LeaderboardScoreList from "./LeaderboardScoreList.jsx";
import useApplicationData from "../../hooks/useLeaderboardData";
import { Table } from 'react-bootstrap';


export default function Leaderboard() {
  const { stats } = useApplicationData();

  return (
    <>
      <div className="leaderboard">
        <h2 className="leaderboard-title">HIGH SCORES</h2>
        <table className="css-serial">
          <thead>
            <tr>
              <th>RANK</th>
              <th>NAME</th>
              <th>SCORE</th>
              <th>TIME</th>
            </tr>
          </thead>
          {/* <div className="results-body"> */}
          <tbody>
            <LeaderboardScoreList stats={stats} />
          </tbody>
          {/* </div> */}
        </table>
      </div>
    </>
  );
}

