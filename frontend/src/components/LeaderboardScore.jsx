import React from "react";
import "./LeaderboardScore.scss"

export default function LeaderboardScore(props) {
  // console.log('props (leaderboardscore.jsx) = ', props)
  return (
    <ul>
      <li>ID: {props.id}</li>
      <li>Score: {props.score}</li>
    </ul>
  );
}
