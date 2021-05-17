import React from "react";
import LeaderboardScore from "./LeaderboardScore.jsx";

export default function LeaderboardScoreList(props) {

  const { stats } = props;
  console.log('props.stats', stats);
  return stats.map(stat => {
    return <LeaderboardScore key={stat.id} {...stat} />
  });

};

