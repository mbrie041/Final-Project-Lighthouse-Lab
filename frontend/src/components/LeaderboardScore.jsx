import React from "react";


export default function LeaderboardScore(props) {
  // console.log('props (leaderboardscore.jsx) = ', props)
  return (
    // <ul>
    //   <li>Gamer: {props.name}</li>
    //   <li>Score: {props.score}</li>
    // </ul>

    <tr>
      <td>{props.name}</td>
      <td>{props.score}</td>
    </tr>


  );
}
