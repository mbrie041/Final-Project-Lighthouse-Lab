import React from "react";


export default function LeaderboardScore(props) {
  return (
    <tr className="board-results">
      <td></td>
      <td className="gamer">{props.name}</td>
      <td className="scores">{props.score}</td>
      <td className="time">{props.time}</td>
    </tr>
  );
}
