import React from "react";
import LeaderboardScore from "./LeaderboardScore.jsx";

export default function LeaderboardScoreList(props) {
  const { stats } = props;

  const sortByScores = (a, b) => {
    if (a.score < b.score) {
      return 1;
    }
    if (a.score > b.score) {
      return -1;
    }
    return 0;
  }

  const sortedStats = stats.sort(sortByScores);

  return sortedStats.map(stat => {
    return <LeaderboardScore key={stat.id} {...stat} />
  });
};

