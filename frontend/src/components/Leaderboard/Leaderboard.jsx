import React from "react";
import LeaderboardScoreList from "./LeaderboardScoreList.jsx";
import useApplicationData from "../../hooks/useLeaderboardData";
import { Table } from 'react-bootstrap';


export default function Leaderboard() {
  const { stats } = useApplicationData();

  return (
    <>
      <div className="leaderboard">
        <h2 className="leaderboard-title">LEADERBOARD</h2>
        <div className="table-body">
          <table className="css-serial">
            <thead>
              <tr>
                <th>RANK</th>
                <th>NAME</th>
                <th>SCORE</th>
                <th>TIME</th>
              </tr>
            </thead>
            <tbody>
              <LeaderboardScoreList stats={stats} />
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

