import React from "react";


export default function LeaderboardScore(props) {
  console.log('props (leaderboardscore.jsx) = ', props)
  return (
    // <ul>
    //   <li>Gamer: {props.name}</li>
    //   <li>Score: {props.score}</li>
    // </ul>

    <tr class = "board-results">
      <td class= "gamer">{props.name}</td>
      <td class = "scores">{props.score}</td>
      <td class = "time">{props.time}</td>
    </tr>


  );
}
