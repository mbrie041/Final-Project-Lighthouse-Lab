import React from "react";


export default function LeaderboardScore(props) {
  return (
    <tr class="board-results">
      <td></td>
      <td class="gamer">{props.name}</td>
      <td class="scores">{props.score}</td>
      <td class="time">{props.time}</td>
    </tr>
  );
}
