import React, { useState, useEffect } from "react";
import axios from "axios";
import LeaderboardScoreList from "./LeaderboardScoreList.jsx";


export default function Leaderboard() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const getScores = axios.get('http://localhost:3001/api/scores');

    getScores
      .then(response => {
        setScores([...response.data]);
      });
  }, []);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3001');
    socket.addEventListener('open', function (event) {
      console.log("connected to server");
    });

    socket.addEventListener('message', function (event) {

      const scoreObj = JSON.parse(event.data);
      console.log("message from server ", scoreObj);

      if (scoreObj.type === "UPDATE_LEADERBOARD") {
        setScores(prev => [...prev, scoreObj]);
      }

    });
    return () => socket.close();
  }, [])

  return (
    <>
      <h2 className="leaderboard-title">Leaderboard</h2>
    <table className="leaderboard">
      <thead>
        <tr>
          <th>gamer</th>
          <th>score</th>
          </tr>
      </thead>
      <tbody>
        <LeaderboardScoreList scores={scores} />
      </tbody>
      {/* {scoreObj.name && (<LeaderboardScoreList scores={scores} />)} */}
    </table>
    </>
  );
}

