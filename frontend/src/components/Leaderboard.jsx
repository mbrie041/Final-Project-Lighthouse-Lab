import React, { useState, useEffect } from "react";
import axios from "axios";
import LeaderboardScoreList from "./LeaderboardScoreList.jsx";

export default function Leaderboard() {
  const [state, setState] = useState([]);

  useEffect(() => {
    const getScores = axios.get('http://localhost:3001/api/scores');

    getScores
      .then(response => {
        setState([...response.data]);
        console.log(state);
      });
  }, []);


  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <LeaderboardScoreList scores={state} />
    </div>
  );
}

