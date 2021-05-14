import React, { useState, useEffect } from "react";
import axios from "axios";
import LeaderboardScoreList from "./LeaderboardScoreList.jsx";
import "./Leaderboard.scss"

export default function Leaderboard() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const getStats = axios.get('http://localhost:3001/api/stats');

    getStats
      .then(response => {
        setStats([...response.data]);
      });
  }, []);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3001');
    socket.addEventListener('open', function (event) {
      console.log("connected to server");
    });

    socket.addEventListener('message', function (event) {

      const statsObj = JSON.parse(event.data);
      console.log("message from server ", statsObj);

      if (statsObj.type === "UPDATE_LEADERBOARD") {
        setStats(prev => [...prev, statsObj]);
      }

    });
    return () => socket.close();
  }, [])

  return (
    <div className="leaderboard">
      <h2 className="leaderboard-title">Leaderboard</h2>
      <LeaderboardScoreList stats={stats} />
    </div>
  );
}

