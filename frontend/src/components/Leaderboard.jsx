import React, { useEffect } from "react";
import axios from "axios";
import LeaderboardScore from "./LeaderboardScore.jsx";

export default function Leaderboard() {

  useEffect(() => {

    const getScores = axios.get('http://localhost:3001/api/scores');

    getScores
      .then((scores) => console.log(res))
    // .then((scores)=>{
    //   setState(prev => ({
    //     ...prev,
    //     scores: scores.data
    //   }))
  })


  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
    </div>
  );
}

