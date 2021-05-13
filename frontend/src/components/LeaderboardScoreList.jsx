import React from "react";
import LeaderboardScore from "./LeaderboardScore.jsx";

export default function LeaderboardScoreList(props) {

  const { scores } = props;
  console.log('props.scores', scores);
  return scores.map(score => {
    return <LeaderboardScore key={score.id} {...score} />
  });

};

