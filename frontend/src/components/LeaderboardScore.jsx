import React from "react";
import "./LeaderboardScore.scss"
import Table from 'react-bootstrap'

export default function LeaderboardScore(props) {
  // console.log('props (leaderboardscore.jsx) = ', props)
  return (
    <ul>
      <li>Gamer: {props.name}</li>
      <li>Score: {props.score}</li>
    </ul>
  );
}
